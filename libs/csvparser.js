const fs = require('fs')
const path = require('path')
const iconvlite = require('iconv-lite')
const csv = require('csvtojson')
const rz = require("./rz")
const util = require("util")

const csvlib = {}

csvlib.readAndParsingFiles = (filename) => new Promise((resolve, reject) => {
  if (!filename || typeof filename !== "string") return reject(new Error({ result: false, err: "Empty arg filename!" }))
  fs.readFile(path.join(__dirname, "..", "uploads", filename), (err, data) => {
    if (err) { console.log(err); return reject({ result: false, err }) }
    //let content = iconvlite.decode(data, 'ISO-8859-5')
    let content = "\nFull Name" + rz.strSubString(data, "\nFull Name", "")
    csv({ delimiter: ",", ignoreEmpty: true })
      .fromString(content)
      .then(obj => {
        const data = obj.map(item => {
          const group = rz.strSubString(item["Person Group"], "All Persons > Dream Towers > ", "");
          const groupArr = group.split(" > ");
          let companyName = "", employeeType = "";

          // define company
          groupArr.slice(-1)[0] == "ИТР" || groupArr.slice(-1)[0] == "Рабочие" ? companyName = groupArr.slice(-2)[0] : companyName = groupArr.slice(-1)[0];
          // define employeeType
          groupArr.slice(-1)[0] == "ИТР" || groupArr.slice(-1)[0] == "Рабочие" ? employeeType = groupArr.slice(-1)[0] : employeeType = "Общий";

          const fullDate = rz.dateFromString(item["Time"], "YYYY-MM-DD hh:mm:ss", 3);
          const date = rz.objClone(fullDate); date.setHours(3,0,0,0);
          //console.log({fullDate, date})
          const time = item["Time"].split(" ")[1];

          return (
            {
              name: item["Full Name"],
              tabelNumber: item["ID"],
              group,
              companyName,
              companyType: groupArr[0],
              employeeType,
              fullDate,
              date,
              time,
              zone: item["Access Point"].startsWith("Зеленая зона") ? "Зелёная зона" : "Красная зона",
              direction: item["Access Point"].includes("вход") ? "Вход" : "Выход",
              accessPoint: item["Access Point"]
            }
          )
        }
        )
        resolve({ result: true, data })
      })
      .catch(err => {
        reject(err)
      })
  })
})

csvlib.filterData = (data) => {
  // get all unique date
  //console.log(data)

  // Сортировка по дате ->
  data.sort((a, b) => {
    const aa = a.tabelNumber + "_" + rz.dateToString(a.fullDate, "YYYY-MM-DD hh:mm:ss", 3);
    const bb = b.tabelNumber + "_" + rz.dateToString(b.fullDate, "YYYY-MM-DD hh:mm:ss", 3);
    return (aa < bb ? -1 : (aa > bb ? 1 : 0));
  });

  // Step-1: People groupping
  const people = [];
  let currentTabNumber = "";
  data.forEach((aa) => {
    if (currentTabNumber !== aa.tabelNumber) { // A new man:
      const newRow = {
        tabelNumber: aa.tabelNumber,
        name: caseAlignment(aa.name),
        companyType: aa.companyType,
        companyName: aa.companyName,
        employeeType: aa.employeeType,
        entrances: [{
          fullDate: aa.fullDate,
          direction: aa.direction,
          zone: aa.zone,
          workingShift: ""
        }]
      };

      people.push(newRow);
      currentTabNumber = aa.tabelNumber;
    }
    else { // Exist man
      const curRow = people[people.length - 1];
      curRow.entrances.push({
        fullDate: aa.fullDate,
        direction: aa.direction,
        zone: aa.zone,
        workingShift: ""
      });
    }
  });

  people.forEach((aa) => {
    // Step-2: Delete unnecessary top array recordsets. Array must be started from "Вход"
    if (aa.entrances && aa.entrances.length) {
      let doing = true;
      while (doing && aa.entrances.length) {
        const ee = aa.entrances[0];
        // ee.zone === "Красная зона"
        if (ee.direction === "Выход") { // find the first entrance to the green zone (fix-1: to any zone)
          aa.entrances.shift();
        }
        else {
          doing = false;
        }
      }
    }

    // Step-3: filterring duplicates of similar recordset: вход_красная зона, вход_красная зона (delete it)
    if (aa.entrances && aa.entrances.length) {
      let currentAction = aa.entrances[0].direction + "_" + aa.entrances[0].zone;
      let currentTime = aa.entrances[0].fullDate.getTime();
      let i = 1;
      while (i < aa.entrances.length) {
        const timeDiff = Math.abs(aa.entrances[i].fullDate.getTime() - currentTime) / 1000 / 60 / 60; // time diff of minutes
        const bb = aa.entrances[i].direction + "_" + aa.entrances[i].zone;
        if (currentAction === bb && timeDiff < 1) { // similar entrance and time diff < 1 minute
          // Debug:
          // if (aa.name === "Aitboy Baltabaev") console.log({msg: "Duplicate entry was deleted!", timeDiff, bb, currentAction, name: aa.name, date: rz.dateToString(aa.entrances[i].fullDate, "YYYY-MM-DD hh:mm:ss")});
          aa.entrances.splice(i, 1); // delete the duplicate entrance (presumably the equipment error)
        }
        else {
          currentAction = aa.entrances[i].direction + "_" + aa.entrances[i].zone;
          currentTime = aa.entrances[i].fullDate.getTime();
          i++;
        }
      }
    }

    // Step-4: Detect employe type: Day shift / Night shift !!!
    aa.dayEntryCount = 0;
    aa.nightEntryCount = 0;
    aa.isNightEmploye = false;
    if (aa.entrances && aa.entrances.length) {
      const dayShift = ["07:00:00", "19:00:00"];
      const nightShift = ["19:00:01", "23:59:59", "00:00:00", "06:59:59"];
      const dayMs = dayShift.map((vv) => (rz.timeParseFromStr(vv)));
      const nightMs = nightShift.map((vv) => (rz.timeParseFromStr(vv)));
      aa.entrances.forEach((ee) => {
        if (ee.direction === "Вход") { // ee.zone === "Зелёная зона"
          const curTime = rz.timeParseFromStr(rz.dateToString(ee.fullDate, "hh:mm:ss"));
          if (curTime >= dayMs[0] && curTime <= dayMs[1]) { aa.dayEntryCount++ }
          else if ((curTime >= nightMs[0] && curTime <= nightMs[1]) || (curTime >= nightMs[2] && curTime <= nightMs[3])) { aa.nightEntryCount++ }
        }
      });
      aa.isNightEmploye = Boolean(aa.nightEntryCount > aa.dayEntryCount);


      // Step-5: Detect start point of work day:
      // workingShift = "start" | "end"
      let startShift = -1; endShift = -1;
      for (let i = 0; i < aa.entrances.length; i++) {
        const ss = aa.entrances[i];
        if (ss.direction === "Вход") { // ss.zone === "Зелёная зона"
          // Не доработано!




        }
      };

    }

  });

  // Step-3: Groupping by dates
  /*
  people.forEach((aa) => {
    aa.dates = [];
    aa.entrances.forEach((ee, e) => {
      if (e === 0 || (ee.direction === "Вход")) { // ee.zone === "Зелёная зона" || first value
        const curDate = {
          fullDate: ee.fullDate,
          actions: [{
            fullDate: ee.fullDate,
            direction: ee.direction,
            zone: ee.zone
          }],
          sumTimeGreen: 0,
          sumTimeRed: 0
        };
        aa.dates.push(curDate); // a new Date!
      }
      else { // Выход из текущей зоны
        const curDate = aa.dates[aa.dates.length - 1];
        curDate.actions.push({
          fullDate: ee.fullDate,
          direction: ee.direction,
          zone: ee.zone
        });
        if (ee.direction === "Выход") {
          let timeSum = 0;
          for (let i = curDate.actions.length - 2; i >= 0; i--) {
            if (curDate.actions[i].zone === ee.zone && curDate.actions[i].direction === "Вход") {
              timeSum = (ee.fullDate - curDate.actions[i].fullDate) / 1000 / 60 / 60;
              // console.log({i: curDate.actions[i], curZone: ee.zone, timeSum, ee_fullDate: ee.fullDate, curDate: curDate.actions[i].fullDate});
              break;
            }
          }
          if (timeSum) {
            if (ee.zone === "Зелёная зона") { curDate.sumTimeGreen += timeSum }
            else if (ee.zone === "Красная зона") { curDate.sumTimeRed += timeSum }
          }
        }
      }
    });
  });
  */

  // Step-7: Make the Flat Array
  const ans = [];
  people.forEach((aa) => {
    aa.entrances.forEach((ee) => {
        const datetimestr = rz.dateToString(ee.fullDate, "YYYY-MM-DD hh:mm:ss");
        const protoRow = {
          zone: ee.zone,
          date: ee.fullDate,
          direction: ee.direction,
          datestr: rz.strSubString(datetimestr, "", " "),
          timestr: rz.strSubString(datetimestr, " ", ""),
          datetimestr,
          companyType: aa.companyType,
          companyName: aa.companyName,
          employeeType: aa.employeeType,
          tabelNumber: aa.tabelNumber,
          name: aa.name,
          isNightEmploye: aa.isNightEmploye,
          workingShift: ee.workingShift
        };
        // name, tabelNumber, zone, date, datetimestr, datestr, timestr, direction, companyType, companyName, employeeType
        ans.push(protoRow);
    });
  });


  /*
  data.forEach((aa) => {
    let index = -1;
    for (let i = 0; i < ans.length; i++) {
      const bb = ans[i];
      // console.log({aa: aa.date, bb: rz.dateToString(bb.date, "YYYY-MM-DD"), isTrue: aa.date === rz.dateToString(bb.date, "YYYY-MM-DD")})
      if (rz.dateToString(bb.date, "YYYY-MM-DD", 3) === rz.dateToString(aa.date, "YYYY-MM-DD", 3) && aa.zone === bb.zone && aa.tabelNumber === bb.tabelNumber) {
        index = i; break;
      }
    }
    if (~index) { // Найден в ans
      const bb = ans[index];
      const timeFirst = (aa.direction === "Вход" ? aa.fullDate : 0);
      const timelast = (aa.direction === "Выход" ? aa.fullDate : 0);
      if (timeFirst && !bb.timeFirst) bb.timeFirst = timeFirst;
      if (timelast) bb.timeLast = timelast;

      if (aa.direction === "Вход") { bb.timeIn.push(aa.time); bb.fullTimeIn.push(aa.fullDate) }
      else if (aa.direction === "Выход") { bb.timeOut.push(aa.time); bb.fullTimeOut.push(aa.fullDate)  }

    }
    else { // Новая запись
      const newRow = {
        zone: aa.zone,
        date: aa.date,
        companyType: aa.companyType,
        companyName: aa.companyName,
        employeeType: aa.employeeType,
        tabelNumber: aa.tabelNumber,
        name: aa.name,
        timeFirst: 0,
        timeIn: (aa.direction === "Вход" ? [aa.time] : []),
        timeLast: 0,
        timeOut: (aa.direction === "Выход" ? [aa.time] : []),
        timeTotal: 0,
        fullTimeIn: (aa.direction === "Вход" ? [aa.fullDate] : []),
        fullTimeOut: (aa.direction === "Выход" ? [aa.fullDate] : [])
      };

      if (aa.direction === "Вход") {
        //console.log({aa: aa.fullDate, rz: aa.fullDate})
        newRow.timeFirst = aa.fullDate;
        //console.log({rzdate: newRow.timeFirst, csvdate: aa.fullDate});
      }
      else if (aa.direction === "Выход") {
        newRow.timeLast = aa.fullDate;
      }

      ans.push(newRow);
    }
  });

  ans.forEach((bb) => {
    if (bb.fullTimeIn && bb.fullTimeIn.length && bb.fullTimeOut && bb.fullTimeOut.length) {
      bb.isNightRange = Boolean(bb.fullTimeIn[bb.fullTimeIn.length-1] > bb.fullTimeOut[bb.fullTimeOut.length-1]);
    }

    if (bb.timeFirst && bb.timeLast) {
      bb.timeTotal = rz.numRoundTo(((bb.timeLast - bb.timeFirst) / 1000 / 60 / 60), 2);
      if (bb.timeTotal < 0) bb.timeTotal += 24    ;
    }
  });
  */

  // console.log(util.inspect(people, false, null, true));


  // Сортировка по дате ->
  ans.sort((a, b) => {
    const aa = a.datetimestr;
    const bb = b.datetimestr;
    return (aa < bb ? -1 : (aa > bb ? 1 : 0));
  });

  // console.log(util.inspect(ans, false, null, true));

  return {result: true, data: ans};
}

// Приводит "ФАМИЛИЮ Имя отчество" к "Фамилия Имя Отчетво" - исправляет регистр!
function caseAlignment(name) {
  let words = name.replace(/\./," ").replace(/\s+/," ").split(" ");
  const upd = words.map((ww) => {
    const aa = ww.toLowerCase();
    return aa.slice(0,1).toUpperCase() + aa.slice(-aa.length+1);
  });
  return upd.join(" ");
}

module.exports = csvlib