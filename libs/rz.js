/* constants */

const enableConsoleLog = true;
const unknowSpase = String.fromCharCode(160); // "неразрывный пробел" или &nbsp;

/* Check Types */

const isString = (value) => Boolean(typeof value === "string" || value instanceof String);

const isNumber = (value) => Boolean(typeof value === "number" && Number.isFinite(value));

const canbeNumber = (n) => Boolean(!Number.isNaN(parseFloat(n)) && Number.isFinite(n));

const isBoolean = (value) => Boolean(typeof value === "boolean");

const isDate = (value) => Boolean(value instanceof Date);

const isArray = (value) => Boolean(value && typeof value === "object" && value.constructor === Array);

const isFunction = (value) => Boolean(typeof value === "function");

const isObject = (value) => Boolean(value && typeof value === "object" && value.constructor === Object);

const isUndefinedOrNull = (value) => Boolean(typeof value === "undefined" || value === null);

const isRegExp = (value) => Boolean(value && typeof value === "object" && value.constructor === RegExp);

const isRealValue = (value) => Boolean(value && value !== "null" && value !== "undefined" && value !== "");

const numIsInt = (num) => Boolean(Math.round(num) === num);

/* ============================ */
/*           Web-page           */
/* ============================ */

/* eslint-disable max-len */
const isMobileDevice = (userAgent) => Boolean(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(userAgent)
|| /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn\\-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(userAgent.substr(0, 4)));
/* eslint-enable max-len */

const documentSize = (documnt) => {
  const ans = {width: 0, height: 0, result: false};
  const dcm = documnt || document;
  if (dcm && dcm.documentElement && dcm.documentElement.scrollWidth) { ans.width = dcm.documentElement.scrollWidth; ans.height = dcm.documentElement.scrollHeight; ans.result = true }
  return ans;
};

const windowSize = (windw) => {
  const ans = {width: 0, height: 0, result: false};
  const wnd = windw || window;
  if (wnd && wnd.innerWidth && wnd.innerHeight) { ans.width = wnd.innerWidth; ans.height = wnd.innerHeight; ans.result = true }
  return ans;
};

/* ============================ */
/*            Objects           */
/* ============================ */

// Cloning objects
const objToJSON = (sourceObj) => {
  let a = {};
  try {
    a = JSON.stringify(sourceObj);
  } catch (err) {
    a = null;
  }
  return a;
};

const objFromJSON = (sourceJSON) => {
  let a = {};
  try {
    a = JSON.parse(sourceJSON);
  } catch (err) {
    a = null;
  }
  return a;
};

// can clone Objects and Dates and Strings and Numbers!
const objClone = (sourceObj) => {
  let ans = null;
  if (isDate(sourceObj)) {
    ans = new Date(sourceObj.getTime());
  }
  else if (isArray(sourceObj)) {
    ans = sourceObj.slice(0);
  }
  else if (isObject(sourceObj)) {
    const a = objToJSON(sourceObj);
    ans = objFromJSON(a);
  }
  else if (isNumber(sourceObj) || isString(sourceObj) || isBoolean(sourceObj)) {
    ans = sourceObj;
  }
  return ans;
};

const objKeys = (obj) => {
  const ans = [];
  if (!isObject(obj)) return ans;
  Object.keys(obj).forEach((key) => {
    ans.push(key);
  });
  return ans;
};

const objHasKey = (obj, key) => {
  if (!isObject(obj) || !isString(key)) return false;
  return Boolean(key in obj);
};

const objByString = (o, s) => {
  let s1 = s.replace(/\[(\w+)\]/g, ".$1"); // convert indexes to properties
  s1 = s1.replace(/^\./, ""); // strip a leading dot
  const a = s1.split(".");
  let o1 = objClone(o);
  for (let i = 0, n = a.length; i < n; i++) {
    const k = a[i];
    if (k in o1) {
      o1 = o1[k];
      // if (~s.indexOf("elements")) console.log(o1);
    }
    else { return null }
  }
  return o1;
};

/* ============================ */
/* Numbers */
/* ============================ */

const numRoundTo = (num, n) => {
  let x = 0;
  if (isNumber(n) && numIsInt(n) && n >= -6 && n <= 6) x = n;
  x = 10 ** x;
  return Math.round(num * x) / x;
};

const numRoundToNearest = (num, m) => {
  if (isNumber(m)) return Number(num % m ? num + m - (num % m) : num);
  return false;
};

const numToFloatStr = (num, n, triads) => {
  let s, d = 0, k, m;
  if (isNumber(n) && numIsInt(n) && n >= -6 && n <= 6) d = n;
  s = numRoundTo(num, d).toString().replace(".", ",");

  if (d > 0) {
    k = s.indexOf(",");
    if (k === -1) { s += "," + "0".repeat(d) }
    else {
      const a = s.slice(0, k - 1), b = s.slice(k + 1, s.length - k - 1);
      if (d > 0 && b.length > d) {
        s = a + "," + b.slice(0, d);
      }
      else {
        s += "0".repeat(d - (s.length - k - 1));
      }
      s += "0".repeat(d - (s.length - k - 1));
    }
  }

  k = s.indexOf(","); if (k === -1) { k = s.length }
  m = s.indexOf("-");
  if (m === -1) { m = 0 } else { m = 1 }

  if (triads !== false) {
    for (d = k - 3; d > m; d -= 3) {
      s = s.slice(0, d) + " " + s.slice(d, s.length - d + 1);
    }
  }
  return s;
};

const numToPhrase = (num, c) => {
  // let lng = "ru"; if (isString(lngparam)) lng = lngparam;
  const x = numRoundTo(num, 2);
  if (x < 0 || x > 999999999999999) return false;

  let currency = "RUB"; if (isString(c)) currency = c.trimAll().toUpperCase();
  if (currency !== "RUB" && currency !== "USD" && currency !== "EUR") return false;

  const groups = [];
  groups[0] = []; groups[1] = []; groups[2] = []; groups[3] = []; groups[4] = []; groups[9] = [];

  // рубли по умолчанию
  groups[0][-1] = { RUB: "рублей", USD: "долларов США", EUR: "евро" };
  // исключения
  groups[0][1] = { RUB: "рубль", USD: "доллар США", EUR: "евро" };
  groups[0][2] = { RUB: "рубля", USD: "доллара США", EUR: "евро" };
  groups[0][3] = { RUB: "рубля", USD: "доллара США", EUR: "евро" };
  groups[0][4] = { RUB: "рубля", USD: "доллара США", EUR: "евро" };

  // тысячи
  groups[1][-1] = "тысяч"; // по умолчанию
  // исключения
  groups[1][1] = "тысяча";
  groups[1][2] = "тысячи";
  groups[1][3] = "тысячи";
  groups[1][4] = "тысячи";

  // миллионы
  groups[2][-1] = "миллионов"; // по умолчанию
  // исключения
  groups[2][1] = "миллион";
  groups[2][2] = "миллиона";
  groups[2][3] = "миллиона";
  groups[2][4] = "миллиона";

  // миллиарды
  groups[3][-1] = "миллиардов"; // по умолчанию
  // исключения
  groups[3][1] = "миллиард";
  groups[3][2] = "миллиарда";
  groups[3][3] = "миллиарда";
  groups[3][4] = "миллиарда";

  // триллионы
  groups[4][-1] = "триллионов"; // по умолчанию
  // исключения
  groups[4][1] = "триллион";
  groups[4][2] = "триллиона";
  groups[4][3] = "триллиона";
  groups[4][4] = "триллиона";

  // копейки
  groups[9][-1] = { RUB: "копеек", USD: "центов", EUR: "центов" }; // по умолчанию
  // исключения
  groups[9][1] = { RUB: "копейка", USD: "цент", EUR: "цент" };
  groups[9][2] = { RUB: "копейки", USD: "цента", EUR: "цента" };
  groups[9][3] = { RUB: "копейки", USD: "цента", EUR: "цента" };
  groups[9][4] = { RUB: "копейки", USD: "цента", EUR: "цента" };

  // цифры и числа
  // либо просто строка, либо 4 строки в хэше
  const names = [];
  names[1] = {
    0: "один", 1: "одна", 2: "один", 3: "один", 4: "один"
  };
  names[2] = {
    0: "два", 1: "две", 2: "два", 3: "два", 4: "два"
  };
  names[3] = "три";
  names[4] = "четыре";
  names[5] = "пять";
  names[6] = "шесть";
  names[7] = "семь";
  names[8] = "восемь";
  names[9] = "девять";
  names[10] = "десять";
  names[11] = "одиннадцать";
  names[12] = "двенадцать";
  names[13] = "тринадцать";
  names[14] = "четырнадцать";
  names[15] = "пятнадцать";
  names[16] = "шестнадцать";
  names[17] = "семнадцать";
  names[18] = "восемнадцать";
  names[19] = "девятнадцать";
  names[20] = "двадцать";
  names[30] = "тридцать";
  names[40] = "сорок";
  names[50] = "пятьдесят";
  names[60] = "шестьдесят";
  names[70] = "семьдесят";
  names[80] = "восемьдесят";
  names[90] = "девяносто";
  names[100] = "сто";
  names[200] = "двести";
  names[300] = "триста";
  names[400] = "четыреста";
  names[500] = "пятьсот";
  names[600] = "шестьсот";
  names[700] = "семьсот";
  names[800] = "восемьсот";
  names[900] = "девятьсот";

  let r = "", i, j, y = Math.floor(x);

  // если НЕ ноль рублей
  if (y > 0) {
    // выделим тройки с руб., тыс., миллионами, миллиардами и триллионами
    const t = [];
    for (i = 0; i <= 4; i++) {
      t[i] = y % 1000;
      y = Math.floor(y / 1000);
    }
    const d = [];
    // выделим в каждой тройке сотни, десятки и единицы
    for (i = 0; i <= 4; i++) {
      d[i] = [];
      d[i][0] = t[i] % 10; // единицы
      d[i][10] = (t[i] % 100) - d[i][0]; // десятки
      d[i][100] = t[i] - d[i][10] - d[i][0]; // сотни
      d[i][11] = t[i] % 100; // две правых цифры в виде числа
    }

    for (i = 4; i >= 0; i--) {
      if (t[i] > 0) {
        if (names[d[i][100]]) {
          r += " " + (isObject(names[d[i][100]]) ? names[d[i][100]][i] : names[d[i][100]]);
        }

        if (names[d[i][11]]) {
          r += " " + (isObject(names[d[i][11]]) ? names[d[i][11]][i] : names[d[i][11]]);
        }
        else {
          if (names[d[i][10]]) {
            r += " " + (isObject(names[d[i][10]]) ? names[d[i][10]][i] : names[d[i][10]]);
          }

          if (names[d[i][0]]) {
            r += " " + (isObject(names[d[i][0]]) ? names[d[i][0]][i] : names[d[i][0]]);
          }
        }

        if (names[d[i][11]]) {
          // если существует числительное
          // eslint-disable-next-line prefer-destructuring
          j = d[i][11];
        }
        else {
          // eslint-disable-next-line prefer-destructuring
          j = d[i][0];
        }

        if (groups[i][j]) {
          if (i === 0) { r += " " + groups[i][j][currency] }
          else { r += " " + groups[i][j] }
        }
        else if (i === 0) {
          r += " " + groups[i][-1][currency];
        }
        else {
          r += " " + groups[i][-1];
        }
      }
    }

    if (t[0] === 0) { r += " " + groups[0][-1][currency] }
  }
  else {
    r = "Ноль " + groups[0][-1][currency];
  }

  y = numRoundTo((x - Math.floor(x)) * 100, 0);
  if (y < 10) { y = "0" + y }

  // eslint-disable-next-line no-use-before-define
  r = strTrimMiddle(r);
  r = r.slice(0, 1).toUpperCase() + r.slice(1);
  r += " " + y;

  y *= 1; // ???

  if (names[y]) { j = y }
  else { j = y % 10 }

  if (groups[9][j]) { r += " " + groups[9][j][currency] }
  else { r += " " + groups[9][-1][currency] }

  return r;
};

const numRandom = (minVparam, maxVparam) => {
  let minV = 0; if (isNumber(minVparam) && numIsInt(minVparam)) minV = minVparam;
  let maxV = 10; if (isNumber(maxVparam) && numIsInt(maxVparam)) maxV = maxVparam;
  return Math.floor(Math.random() * (maxV - minV + 1)) + minV;
};

// склонение именительных рядом с числительным: число (typeof = string), корень (не пустой), окончание
// пример: declOfNum(a[1], 'копе', ['йка','йки','ек'])
// еще пример: declOfNum(a[1], 'книг', ['а','и',''])
const declOfNum = (n, t, o) => {
  const k = [2, 0, 1, 1, 1, 2, 2, 2, 2, 2];
  return (t === "" ? "" : " " + t + (n[n.length - 2] === "1" ? o[2] : o[k[n[n.length - 1]]]));
};

// Работает пока только с целыми числами
// Пример: numToPhrase2(1) + declOfNum(num.toString(), 'книг', ['а','и','']);
// Выведет: Тридцать три книги
// d = 1 нужно для правильного склонения: не «два книги», а «две книги»
const numToPhrase2 = (num, d) => {
  // sub-function
  /* eslint-disable max-len */
  function t(kk, dd) { // преобразовать трёхзначные числа
    const e = [
      ["", " один", " два", " три", " четыре", " пять", " шесть", " семь", " восемь", " девять"],
      [" десять", " одиннадцать", " двенадцать", " тринадцать", " четырнадцать", " пятнадцать", " шестнадцать", " семнадцать", " восемнадцать", " девятнадцать"],
      ["", "", " двадцать", " тридцать", " сорок", " пятьдесят", " шестьдесят", " семьдесят", " восемьдесят", " девяносто"],
      ["", " сто", " двести", " триста", " четыреста", " пятьсот", " шестьсот", " семьсот", " восемьсот", " девятьсот"],
      ["", " одна", " две"]
    ];
    return e[3][kk[0]] + (kk[1] === 1 ? e[1][kk[2]] : e[2][kk[1]] + (dd ? e[4][kk[2]] : e[0][kk[2]]));
  }
  /* eslint-enable max-len */

  let k = numRoundTo(num, 0).toString();
  let i = "";
  const e = [
    ["", "тысяч", "миллион", "миллиард", "триллион", "квадриллион", "квинтиллион", "секстиллион", "септиллион", "октиллион", "нониллион", "дециллион"],
    ["а", "и", ""],
    ["", "а", "ов"]
  ];

  if (k === "" || k === "0") return "Ноль"; // 0
  k = k.split(/(?=(?:\d{3})+$)/); // разбить число в массив с трёхзначными числами
  if (k[0].length === 1) k[0] = "00" + k[0];
  if (k[0].length === 2) k[0] = "0" + k[0];
  for (let j = (k.length - 1); j >= 0; j--) { // соединить трёхзначные числа в одно число, добавив названия разрядов с окончаниями
    if (k[j] !== "000") {
      i = (((d && j === (k.length - 1)) || j === (k.length - 2)) && (k[j][2] === "1" || k[j][2] === "2") ? t(k[j], 1) : t(k[j]))
        + declOfNum(k[j], e[0][k.length - 1 - j], (j === (k.length - 2) ? e[1] : e[2])) + i;
    }
  }

  // Можно было просто так: return i
  // А вот так выведет с заглавной буквы и без лишнего пробела спереди:
  return i[1].toUpperCase() + i.substring(2);
};

/* ============================ */
/* Strings */
/* ============================ */

const strSubString = (fullString, leftString, rightString, startPozSearch) => {
  const s = startPozSearch || 0;
  const a = leftString || "";
  const b = rightString || "";
  if (!fullString || s > fullString.length) return "";

  let tmpPozLeft, tmpPozRight;

  if ((a.length === 0) && (b.length > 0)) {
    tmpPozLeft = s;
    tmpPozRight = fullString.indexOf(b, s);
  } else if ((a.length > 0) && (b.length === 0)) {
    tmpPozLeft = fullString.indexOf(a, s);
    tmpPozRight = fullString.length;
  } else {
    tmpPozLeft = fullString.indexOf(a, s);
    tmpPozRight = fullString.indexOf(b, tmpPozLeft + a.length);
    if (!~tmpPozRight) tmpPozRight = tmpPozLeft + a.length; // fullString.length;
  }

  if (tmpPozLeft === -1 || tmpPozRight === -1) return "";
  return fullString.slice(tmpPozLeft + leftString.length, tmpPozRight);
};

const strTrimRight = (str) => str.replace(/(\s+|\n+)$/g, "");

const strTrimLeft = (str) => str.replace(/^(\s+|\n+)/g, "");

const strReplaceAll = (str, search, replacement) => str.split(search).join(replacement);

// removes all spaces at the beginning and at the end of the string
const strTrim = (str) => {
  const s = strReplaceAll(str, unknowSpase, " ");
  return strTrimLeft(strTrimRight(s));
};

// removes all spaces at the beginning and at the end of the line
// in addition, it replaces several consecutive gaps within the line by one space
const strTrimMiddle = (str) => {
  const s = strReplaceAll(str, unknowSpase, " ");
  return strTrim(s).replace(/\s\s+/g, " ");
};

const strTrimAll = (str) => {
  const s = strReplaceAll(str, unknowSpase, "");
  return s.replace(/(\s|\n)/g, "");
};

const strGetShortFIO = (fullFIO) => {
  let outS = String(fullFIO || "");
  if (outS === "") return "";
  const mPr = strTrimMiddle(outS).split(" ");
  if (mPr.length > 1) {
    outS = mPr[0] + " " + mPr[1].slice(0, 1) + ".";
    if (mPr[2]) outS += mPr[2].slice(0, 1) + ".";
  }
  return outS;
};

const strMakeID = (length) => {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const strTransliterateRUtoEN = (word) => {
  const a = {
    Ё: "YO",
    Й: "I",
    Ц: "TS",
    У: "U",
    К: "K",
    Е: "E",
    Н: "N",
    Г: "G",
    Ш: "SH",
    Щ: "SCH",
    З: "Z",
    Х: "H",
    Ъ: "'",
    ё: "yo",
    й: "i",
    ц: "ts",
    у: "u",
    к: "k",
    е: "e",
    н: "n",
    г: "g",
    ш: "sh",
    щ: "sch",
    з: "z",
    х: "h",
    ъ: "'",
    Ф: "F",
    Ы: "I",
    В: "V",
    А: "a",
    П: "P",
    Р: "R",
    О: "O",
    Л: "L",
    Д: "D",
    Ж: "ZH",
    Э: "E",
    ф: "f",
    ы: "i",
    в: "v",
    а: "a",
    п: "p",
    р: "r",
    о: "o",
    л: "l",
    д: "d",
    ж: "zh",
    э: "e",
    Я: "Ya",
    Ч: "CH",
    С: "S",
    М: "M",
    И: "I",
    Т: "T",
    Ь: "'",
    Б: "B",
    Ю: "YU",
    я: "ya",
    ч: "ch",
    с: "s",
    м: "m",
    и: "i",
    т: "t",
    ь: "'",
    б: "b",
    ю: "yu"
  };
  return word.split("").map((char) => a[char] || char).join("");
};

const strFileExtension = (filename) => {
  // Alternate function: path.parse(filename).ext
  const prts = (filename || "").split(".");
  const ext = (prts[prts.length - 1] || prts).trim().toLowerCase();
  return (prts.length >= 2 ? ext : "");
};

const strClearFileName = (filename) => {
  // Alternate function: path.parse(filename).name (or .base - with extention)
  const i = filename.lastIndexOf(".");
  let a = ((i < 0) ? "" : filename.slice(0, i));
  a = strReplaceAll(a, "\\", "/");
  const j = a.lastIndexOf("/");
  const b = ((j < 0) ? a : a.slice(j + 1, a.length - j - 1));
  return b;
};

// Может ли строка стать числом
const strCanBeNum = (value) => {
  if (value !== null && value !== "" && typeof value !== "undefined") {
    let val = value; if (isString(value)) val = strReplaceAll(value, unknowSpase).replace(/,/g, ".").replace(/\s/g, "");
    const intValue = parseInt(val, 10);
    return !(Number.isNaN(intValue) || Number.isFinite(intValue));
  }
  return 0;
};

const hasUnicode = (str) => {
  for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 127) return true;
  }
  return false;
};

/* ============================ */
/* Arrays */
/* ============================ */

const arrContains = (arr, elem, trimParam, caseNoSensitiveParam) => {
  if (!isArray(arr) || !arr.length || isUndefinedOrNull(elem)) return false;
  let ans = false;
  let v = elem;
  if (isString(v)) {
    if (trimParam === true) { v = v.trim() }
    if (caseNoSensitiveParam === true) { v = v.toLowerCase() }
  }

  for (let i = 0; i < arr.length; i++) {
    let a = arr[i];
    if (isString(a)) {
      if (trimParam === true) { a = a.trim() }
      if (caseNoSensitiveParam === true) { a = a.toLowerCase() }
    }
    if (a === v) { ans = true; break }
  }
  return ans;
};

// Сравнение строк. Поместил тут, т.к. arrContains() определен только что.
// params = "toUpperCase, toLowerCase, caseNoSensitive, trim, trimMiddle, trimAll, transliterate, substring"
// или так: strCompare(str1, str2, ".caseNoSensitive.touppercase.tolowercase.trim.trimAll.transliterate.substring")
const strCompare = (str1, str2, params) => {
  if (!isString(str1) || !isString(str2)) return false;
  if (!params || !isString(params)) return Boolean(str1 === str2);
  const prms = strTrimAll(params).toLowerCase().replace(/(,|\.)/g, ";").split(";");
  let s1 = str1, s2 = str2;
  prms.forEach((p) => {
    if (p === "touppercase" || p === "tolowercase" || p === "casenosensitive") { s1 = s1.toLowerCase(); s2 = s2.toLowerCase() }
    else if (p === "trim") { s1 = strTrim(s1); s2 = strTrim(s2) }
    else if (p === "trimmiddle") { s1 = strTrimMiddle(s1); s2 = strTrimMiddle(s2) }
    else if (p === "trimall") { s1 = strTrimAll(s1); s2 = strTrimAll(s2) }
    else if (p === "transliterate") { s1 = strTransliterateRUtoEN(s1); s2 = strTransliterateRUtoEN(s2) }
  });

  if (arrContains(prms, "substring")) return Boolean(~s1.indexOf(s2));
  return Boolean(s1 === s2);
};

// Check 2 arrays are similar or not
const arrCompare = (arr1, arr2, exactmatch) => {
  if (!isArray(arr1)) return false;
  let ar2 = objClone(arr2); if (!isArray(arr2)) ar2 = [arr2];
  let ans = true;
  for (let i = 0; i < ar2.length; i++) {
    let fnd = false;
    for (let j = 0; j < arr1.length; j++) {
      if (arr1[i] === ar2[j]) { fnd = true; break }
    }
    if (!fnd) { ans = false; break }
  }
  if (exactmatch === true) {
    for (let i = 0; i < arr1.length; i++) {
      let fnd = false;
      for (let j = 0; j < ar2.length; j++) {
        if (ar2[i] === arr1[j]) { fnd = true; break }
      }
      if (!fnd) { ans = false; break }
    }
  }
  return ans;
};

// Find object in array. optional comparedFields = ["Title", "job"...]
const arrFindObj = (arr, obj, comparedFields) => {
  if (!isArray(arr) || !isObject(obj)) return false;
  let ans = -1, str2 = ""; const obj2 = {};
  if (comparedFields && isArray(comparedFields)) {
    for (let j = 0; j < comparedFields.length; j++) {
      if (objHasKey(obj, comparedFields[j])) obj2[comparedFields[j]] = obj[comparedFields[j]];
    }
    str2 = JSON.stringify(obj2);
  }
  else {
    str2 = JSON.stringify(obj);
  }

  for (let i = 0; i < arr.length; i++) {
    const oo = arr[i], obj1 = {}; let str1 = "";
    if (comparedFields && isArray(comparedFields)) {
      for (let j = 0; j < comparedFields.length; j++) {
        if (objHasKey(oo, comparedFields[j])) obj1[comparedFields[j]] = oo[comparedFields[j]];
      }
      str1 = JSON.stringify(obj1);
    }
    else {
      const flds = objKeys(obj);
      for (let j = 0; j < flds.length; j++) {
        if (objHasKey(oo, flds[j])) obj1[flds[j]] = oo[flds[j]];
      }
      str1 = JSON.stringify(obj1);
    }

    if (str1 === str2) { ans = i; break }
  }
  return ans; // (-1 || 0...arr.length)
};

const arrPush = (mainMtrx, addedMtrx) => {
  // mainMtrx и addedMtrx могут быть матрицей, а могут и не быть ей (просто строка или число)
  let result = [];
  if (isArray(mainMtrx)) { result = mainMtrx }
  else { result.push(mainMtrx) }

  if (isArray(addedMtrx)) {
    for (let j = 0; j < addedMtrx.length; j++) {
      result.push(addedMtrx[j]);
    }
  }
  else {
    result.push(addedMtrx);
  }
  return result;
};

const arrRemove = (mainMtrx, deletedMtrx, delNullValuesParam, trimParam, caseNoSensitiveParam) => {
  const result = [];
  let smplMtrx = [], delMtrx = [];
  if (isArray(mainMtrx)) { smplMtrx = mainMtrx }
  else { smplMtrx.push(mainMtrx) }

  if (isArray(deletedMtrx)) { delMtrx = deletedMtrx }
  else { delMtrx.push(deletedMtrx) }

  for (let i = 0; i < smplMtrx.length; i++) {
    let tval = smplMtrx[i];
    if (isString(tval)) {
      if (trimParam) tval = tval.trim();
      if (caseNoSensitiveParam) tval.toLowerCase();
    }
    if (!delNullValuesParam || (isString(tval) && tval !== "")) {
      let found = false;
      for (let j = 0; j < delMtrx.length; j++) {
        let dval = delMtrx[j];
        if (isString(dval)) {
          if (trimParam) dval = dval.trim();
          if (caseNoSensitiveParam) dval.toLowerCase();
        }
        if (dval === tval) { found = true; break }
      }
      if (!found) result.push(smplMtrx[i]);
    }
  }
  return result;
};

const arrGetUnique = (mainMtrx, delNullValuesParam, trimParam, caseNoSensitiveParam) => {
  const result = [];
  for (let i = 0; i < mainMtrx.length; i++) {
    let tval = mainMtrx[i];
    if (isString(tval)) {
      if (trimParam) tval = tval.trim();
      if (caseNoSensitiveParam) tval.toLowerCase();
    }
    if (!delNullValuesParam || tval !== "") {
      let found = false;
      for (let j = 0; j < result.length; j++) {
        let dval = result[j];
        if (isString(dval)) {
          if (trimParam) dval = dval.trim();
          if (caseNoSensitiveParam) dval.toLowerCase();
        }
        if (dval === tval) { found = true; break }
      }
      if (!found) result.push(mainMtrx[i]);
    }
  }
  return result;
};

/* ============================ */
/* String to Numbers */
/* ============================ */

const strToNum = (str, roundparam, absparam) => {
  if (!str || !isString(str)) return 0;
  const rg = /^-?(\d+(\.\d*)?|\.\d+)$/;
  // \-? - может в начале стоит минус, а может и нет
  // \d+(\.\d+)? - [цифра или несколько] точка и несколько цифр после нее (а может и нет точки и цифр после нее)
  // \.\d+ - число вроде .575 (начинается с точки)
  const sNum = strReplaceAll(str.replace(/\s+/g, "").replace(/,/, "."), unknowSpase, "");
  const allNums = sNum.match(rg); // Сердце функции
  if (!allNums.length) return 0;
  try {
    let ans = Number(allNums[0]);
    if (absparam) ans = Math.abs(ans);
    if (roundparam) ans = numRoundTo(ans, roundparam);
    return ans;
  }
  catch (e) {
    return 0;
  }
};

// Возвращает массив из всех чисел в строке. Числа могут быть целыми, отрицательными, дробными...
const strGetAllNumbers = (str, roundparam, absparam) => {
  if (!isString(str)) return null;
  const sNum = strReplaceAll(str.replace(/,/, "."), unknowSpase);
  const rg = /-?\d+(\.\d+)?/gi;
  // \-? - может в начале стоит минус, а может и нет
  // \d+(\.\d+)? - [цифра или несколько] точка и несколько цифр после нее (а может и нет точки и цифр после нее)
  // \.\d+ - число вроде .575 (начинается с точки) - этот вариант я убрал

  const allNums = sNum.match(rg);

  if (isArray(allNums)) {
    for (let i = 0; i < allNums.length; i++) {
      allNums[i] = strToNum(allNums[i]);
      if (absparam) allNums[i] = Math.abs(allNums[i]);
      if (roundparam) allNums[i] = numRoundTo(allNums[i], roundparam);
    }
    return allNums;
  }
  return null;
};

// Возвращает i-число из строки (может быть отрицательным или дробным)
const strSearchNum = (CellString, indexNum, roundparam, absparam) => {
  if (!isRealValue(CellString)) return 0;
  let retVal = 0;
  const allNumbers = strGetAllNumbers(CellString, roundparam, absparam);
  if (isArray(allNumbers)) {
    if (indexNum === 0) { retVal = allNumbers[allNumbers.length - 1] }
    else if (numIsInt(indexNum) && isNumber(allNumbers[indexNum - 1])) { retVal = allNumbers[indexNum - 1] }
  }
  return retVal;
};

/* ============================ */
/* Dates */
/* ============================ */

const dateGetWeekDay = (date, lngparam) => {
  let lng = "ru"; if (isString(lngparam)) lng = lngparam;
  let days;
  if (lng === "ru") {
    days = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];
  } else {
    days = ["su", "mo", "tu", "we", "th", "fr", "sa"];
  }
  return days[date.getDay()];
};

const dateToString = (scDate, formatparam, hoursOffset) => {
  // Выводит в формате "YYYY-MM-DD"
  if (!isDate(scDate)) return "";
  let frmt = "YYYY-MM-DD"; if (isString(formatparam) && formatparam !== "") frmt = formatparam;
  const ssDate = objClone(scDate);
  if (hoursOffset) ssDate.setTime(ssDate.getTime() + hoursOffset * 60000 * 60);

  const realMonth = +ssDate.getMonth() + 1;
  const realDate = +ssDate.getDate();
  const ye = ssDate.getFullYear();
  const mnth = (realMonth < 10 ? "0" : "") + realMonth;
  const da = (realDate < 10 ? "0" : "") + realDate;
  let h = "0" + ssDate.getHours(); h = h.slice(-2);
  let m = "0" + ssDate.getMinutes(); m = m.slice(-2);
  let s = "0" + ssDate.getSeconds(); s = s.slice(-2);

  let strDate = "";
  switch (frmt) {
    case "DD.MM.YYYY":
      strDate = da + "." + mnth + "." + ye;
      break; // DD.MM.YYYY
    case "DD.MM.YYYY hh:mm":
      strDate = da + "." + mnth + "." + ye + " " + h + ":" + m;
      break; // DD.MM.YYYY hh:mm
    case "DD.MM.YYYY hh:mm:ss":
      strDate = da + "." + mnth + "." + ye + " " + h + ":" + m + ":" + s;
      break; // DD.MM.YYYY hh:mm
    case "YYYY-MM-DD hh:mm:ss":
      strDate = ye + "-" + mnth + "-" + da + " " + h + ":" + m + ":" + s;
      break; // YYYY-MM-DD hh:mm:ss
    case "dd DD.MM.YYYY":
      strDate = dateGetWeekDay(ssDate) + " " + da + "." + mnth + "." + ye;
      break; // пн DD.MM.YYYY
    default:
      strDate = ye + "-" + mnth + "-" + da;
      break; // YYYY-MM-DD
  }
  return strDate;
};

const dateFromString = (datastr, formatparam, hoursOffset) => {
  if (!isString(datastr)) return null;
  let frmt = "YYYY-MM-DD"; if (isString(formatparam) && formatparam !== "") frmt = formatparam;
  let da, mnth, ye, dStr, hh = 0, mm = 0, ss = 0;
  switch (frmt) {
    case "DD.MM.YYYY":
      dStr = datastr.split(".");
      da = +dStr[0];
      mnth = +dStr[1] - 1;
      ye = +dStr[2];
      break; // DD.MM.YYYY
    case "DD.MM.YYYY hh:mm":
    case "DD.MM.YYYY hh:mm:ss": {
      const dts1 = strSubString(datastr, "", " ");
      if (dts1 === "") {
        dStr = datastr.split(".");
        da = +dStr[0];
        mnth = +dStr[1] - 1;
        ye = +dStr[2];
        break; // DD.MM.YYYY
      }
      else {
        const dts2 = strSubString(datastr, " ", "");
        dStr = dts1.split(".");
        da = +dStr[0];
        mnth = +dStr[1] - 1;
        ye = +dStr[2]; // DD.MM.YYYY
        const dTime = dts2.split(":");
        hh = +dTime[0]; // hh:mm:ss
        if (dTime.length > 1) mm = +dTime[1];
        if (dTime.length > 2) ss = +dTime[2];
      }
      break;
    }
    case "YYYY-MM-DD hh:mm:ss": {
      const dts1 = strSubString(datastr, "", " ");
      if (dts1 === "") {
        dStr = datastr.split("-");
        da = +dStr[2];
        mnth = +dStr[1] - 1;
        ye = +dStr[0];
        break; // YYYY-MM-DD
      }
      else {
        const dts2 = strSubString(datastr, " ", "");
        dStr = dts1.split("-");
        da = +dStr[2];
        mnth = +dStr[1] - 1;
        ye = +dStr[0]; // YYYY-MM-DD
        const dTime = dts2.split(":");
        hh = +dTime[0]; // hh:mm:ss
        if (dTime.length > 1) mm = +dTime[1];
        if (dTime.length > 2) ss = +dTime[2];
      }
      break;
    }
    default:
      dStr = datastr.split("-");
      da = +dStr[2];
      mnth = +dStr[1] - 1;
      ye = +dStr[0];
      break; // YYYY-MM-DD
  }

  let data = 0;
  try {
    data = new Date(ye, mnth, da, hh, mm, ss);
    if (hoursOffset) data.setTime(data.getTime() + hoursOffset * 60000 * 60);
  } catch (ex) {
    // log(ex.message);
  }
  return data;
};

const dateDaysBetween = (d1, d2) => {
  try {
    const timeDiff = d1.getTime() - d2.getTime();
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) - 1;
    return diffDays;
  }
  catch (ex) {
    // log(ex.message);
    return null;
  }
};

const validateTimestamp = (timestamp) => {
  if (!/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/.test(timestamp)) return false;
  const split = timestamp.split(/[^\d]+/);
  // const year = parseFloat(split[0]);
  const month = parseFloat(split[1]);
  const day = parseFloat(split[2]);
  const hour = parseFloat(split[3]);
  const minute = parseFloat(split[4]);
  const second = parseFloat(split[5]);
  return hour < 25 && minute < 61 && second < 61 && month < 13 && day < 32;
};

const ExcelDateToJSDate = (serial) => {
  const utc_days = Math.floor(serial - 25569);
  const utc_value = utc_days * 86400;
  const date_info = new Date(utc_value * 1000);
  const fractional_day = serial - Math.floor(serial) + 0.0000001;
  let total_seconds = Math.floor(86400 * fractional_day);
  const seconds = total_seconds % 60;
  total_seconds -= seconds;
  const hours = Math.floor(total_seconds / (60 * 60));
  const minutes = Math.floor(total_seconds / 60) % 60;
  return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);
};

const JSDateToExcelDate = (serial) => {
  const td = objClone(serial);
  if (!isDate(td)) return 0;
  td.setTime(td.getTime() + (6 * 60000 * 60)); // td.addHours(6);
  return (Number(td) / 86400000) + 25569;
};

/* ============================ */
/*     Encoding - Decoding      */
/* ============================ */

const Base64encode = (s) => {
  const buff = Buffer.from(s);
  return buff.toString("base64");
};

const Base64decode = (s, charCode) => {
  const buff = Buffer.from(s, "base64");
  return buff.toString(charCode || "utf8");
  // ascii , utf8 , ucs2 , base64 , binary
};

/* Universal functions */

const pathParentModule = () => {
  let ans = "???";
  if (module && module.parent) { // Server-code
    const mpath = strReplaceAll(module.parent.filename, "\\", "/").split("/");
    ans = mpath[mpath.length - 1];
    if (mpath.length > 1) ans = mpath[mpath.length - 2] + "/" + mpath[mpath.length - 1];
  }
  else { // Client-code
    const errstack = String((new Error()).stack).replace("Error\n", "").split("\n"), stk = [];
    errstack.forEach((ee) => { stk.push(ee.trim().replace(/^at\s/g, "")) });
    // Analise Err.stack
    for (let i = 0; i < stk.length; i++) {
      if ((/\[as log\]/g).test(stk[i])) {
        ans = stk[i + 1] || stk[i];
        break;
      }
    }
    const regex1 = /\/js\/([a-z]+\.(js|jsx|ejs))/ig;
    if (regex1.test(ans)) ans = ans.match(regex1)[0];
  }
  return ans;
};

const log = (prms) => new Promise((resolve, reject) => {
  // prms = {msgtype, message, module, caller, userip, toconsole=true, tobase=false};
  // prms can be a simple String
  let p = objClone(prms);

  if (isString(p)) { p = { message: prms, msgtype: "info", toconsole: true, tobase: false } }
  else if (!isObject(p)) { reject(new Error("(prms) is not a String and is not an Object")); return }

  if (p.msg && !p.message) p.message = p.msg;
  if (!p.message || p.message === "") { reject(new Error("arg message is null")); return }
  if (isString(p.message) && !p.message.startsWith("ClientSide. ")) p.message = "ClientSide. " + p.message;

  if (!p.caller) {
    try { p.caller = log.caller; p.caller = String(p.caller) }
    catch (err1) { p.caller = "???" }
  }
  if (p.caller.length > 100) p.caller = p.caller.slice(0, 100) + "....";

  // msgtype: error, warning, info
  p.msgtype = p.msgtype || "info";
  p.module = p.module || pathParentModule();
  p.datetime = p.datetime || new Date();
  // p.userip = p.userip || "???";

  if (p.tobase === true && window.$) {
    window.$.ajax({
      type: "POST",
      data: JSON.stringify(p),
      contentType: "application/json",
      url: "/api/toserverlog"
    }).done((ans1) => {
      if (ans1.userip) p.userip = ans1.userip;
      if (enableConsoleLog && (p.toconsole === true || typeof p.toconsole === "undefined")) {
        if (p.msgtype === "error") { console.error(p.message) }
        else { console.log(p) }
      }
      resolve(true);
    }).fail((err1) => {
      console.log(err1); reject(new Error("$.ajax error"));
    });
  }
  else {
    if (enableConsoleLog && (p.toconsole === true || typeof p.toconsole === "undefined")) {
      if (p.msgtype === "error") { console.error(p) }
      else { console.log(p) }
    }
    resolve(true);
  }
});

// fetch helpers
const fetchGetHeaders = (response, header) => {
  const ans = {result: false, headers: [], values: [], header, value: undefined };
  if (response && response.headers) {
    // eslint-disable-next-line no-restricted-syntax
    for (const pair of response.headers.entries()) {
      if (pair.length) {
        ans.headers.push(pair[0]); ans.values.push(pair[1]);
        if (header && header !== "") {
          if (pair[0].toLowerCase() === header.toLowerCase()) { ans.header = pair[0]; ans.value = pair[1]; ans.result = true }
        }
        else {
          ans.result = true;
        }
      }
    }
  }
  return ans;
};

const delay = (ms) => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

const compareIP = (ip, mask) => {
  let ans = false; if (!ip || !isString(ip) || !mask) return ans;
  if (isString(mask)) { return Boolean(ip === mask) }
  if (isRegExp(mask)) { mask.lastIndex = 0; return (mask.test(ip)) }
  if (isArray(mask)) {
    for (let i = 0; i < mask.length; i++) {
      if (isString(mask[i]) && ip === mask) { ans = true; break }
      if (isRegExp(mask[i])) { mask[i].lastIndex = 0; if (mask[i].test(ip)) { ans = true; break } }
    }
  }
  return ans;
};

/* ============================ */
/*   and finnally - Exports!    */
/* ============================ */

module.exports = {
  log, // console.log() + save to 'db.systemlog'
  isString, // detect type of var
  isNumber,
  canbeNumber, // checking can String be convertible to Number
  isBoolean,
  isDate,
  isArray,
  isFunction,
  isObject,
  isUndefinedOrNull,
  isRegExp,
  isRealValue,
  isMobileDevice, // true - if user open page on mobile device
  documentSize, // usefull content width & height
  windowSize, // full page width & height
  objByString, // Get Object one key value. Args: Object, Path: "dict.ru.homepage.title[0]"
  objClone, // Clone Objects, Arrays, Dates and simple var (Numbers, Strings...)
  objKeys,
  objHasKey,
  objToJSON,
  objFromJSON,
  strSubString,
  strToNum,
  strTrimRight,
  strTrimLeft,
  strTrim,
  strTrimMiddle,
  strTrimAll,
  strReplaceAll,
  strGetShortFIO,
  strMakeID,
  strTransliterateRUtoEN,
  strFileExtension,
  strClearFileName,
  strCanBeNum,
  strGetAllNumbers,
  strSearchNum,
  strCompare, // strCompare(str1, str2, ".caseNoSensitive.touppercase.tolowercase.trim.trimAll.transliterate.substring")
  hasUnicode,
  arrContains, // RetVal: Boolean. Args: (arr, elem, trimParam, caseNoSensitiveParam). Finding Numbers or String in Arrays
  arrPush, // push []
  arrRemove, // remove []
  arrGetUnique,
  arrCompare, // Compare 2 Arrays. RetVal: Boolean
  arrFindObj, // Find i-Object in Array using Some fields. arrFindObj (arr, obj, comparedFields: ["name", "internalip"...])
  numIsInt,
  numRoundTo,
  numRoundToNearest,
  numToFloatStr,
  numToPhrase,
  numToPhrase2,
  declOfNum,
  numRandom,
  dateToString,
  dateFromString,
  dateDaysBetween,
  ExcelDateToJSDate,
  JSDateToExcelDate,
  validateTimestamp,
  Base64encode,
  Base64decode,
  fetchGetHeaders,
  delay,
  compareIP // compareIP (ip, mask) => true / false. "mask" can be String || Regexp || Array(String || Regexp)
};
