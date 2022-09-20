var bar = document.getElementById("js-progressbar");
const reportInfo = document.getElementById("reportInfo")
const reportUrl = document.getElementById("reportUrl")

let csvfileid = document.getElementById("csvfileid")
if (csvfileid) csvfileid = csvfileid.getAttribute("fileid");

const {rz} = window;
let gridOptions = {};
let rowData;

UIkit.upload(".js-upload", {

        url: "",
        multiple: false,
        mime: "text/csv",
        //method: "post",

        beforeSend: function (environment) {
            console.log("beforeSend", arguments);

            // Объект все еще может быть изменен здесь.
            // var {data, method, headers, xhr, responseType} = environment;

        },
        beforeAll: function () {
            console.log("beforeAll", arguments);
        },
        load: function () {
            console.log("load", arguments);
        },
        error: function () {
            console.log("error", arguments);
        },
        complete: function () {
            console.log("complete", arguments);
        },

        loadStart: function (e) {
            console.log("loadStart", arguments);

            bar.removeAttribute("hidden");
            bar.max = e.total;
            bar.value = e.loaded;
        },

        progress: function (e) {
            console.log("progress", arguments);

            bar.max = e.total;
            bar.value = e.loaded;
        },

        loadEnd: function (e) {
            console.log("loadEnd", arguments);

            bar.max = e.total;
            bar.value = e.loaded;
        },

        completeAll: function () {
            setTimeout(function () {
                bar.setAttribute("hidden", "hidden");
            }, 1000);
            report = JSON.parse((arguments[0].response));
            //console.log({report})
            reportInfo.removeAttribute("hidden")
            reportUrl.innerHTML = `<a href="${report.data.url}">${report.data.url}</a>`

        }
    });

async function processCSVfile(fileid) {
    const resp = await fetch(`/api/${fileid}`, {method: "GET", headers: {"Content-Type": "application/json;charset=utf-8", Accept: "application/json"}});
    const jsn = await resp.json();
    if (jsn.result) return jsn.data;
    return false;
}

function getGridSize() {
    const ah = document.getElementsByClassName("uk-navbar-container");
    let {height, width} = rz.documentSize();
    if (height) height -= 20; // exclude horizontal-scroll-bar
    if (width) width -= 2; // exclude vertical-scroll-bar
    if (ah[0]) { height -= (ah[0].offsetHeight) }
    if (!height || height < 250) height = 250;
    return {height, width};
}

document.addEventListener("DOMContentLoaded", async (event) => {
    if (!csvfileid) return;
    rowData = await processCSVfile(csvfileid);
    // Define working time:
    const dayShift = ["07:00:00", "19:00:00"];
    const nightShift = ["19:00:01", "23:59:59", "00:00:00", "06:59:59"];
    const dayMs = dayShift.map((vv) => (rz.timeParseFromStr(vv)));
    const nightMs = nightShift.map((vv) => (rz.timeParseFromStr(vv)));

    // Redefine some fields and add some new ones:
    rowData.forEach((rr, r) => {
        // Step-1: Add simple fields / Format dates
        rr.date = rz.dateFromString((rz.strSubString(rr.date, "", ".")).replace("T", " "), "YYYY-MM-DD hh:mm:ss");
        if (rr.name.startsWith(".")) rr.name = rr.name.slice(-rr.name.length + 2);
        rr.actions = []; rr.newShift = false; rr.actionsTable = ""; rr.timeFirst = ""; rr.timeLast = ""; rr.timeTotal = 0;
        
        /*
        rr.actionsTable = "<table style='line-height: 20px;'><tbody>";
        // if (r === 0) console.log(rr);
        rr.actions.forEach((aa) => {
            rr.actionsTable += "<tr>"
                + "<td class='subtablecell'>" + (aa.zone === "Зелёная зона" ? "<span uk-icon='icon: home; ratio:2' uk-tooltip='Зелёная зона' style='color:green;'></span>" : "<span uk-icon='icon: bolt; ratio:2' uk-tooltip='Красная зона' style='color:red;'></span>") + "</td>"
                + "<td class='subtablecell'>" + (aa.direction === "Вход" ? "<span uk-icon='icon: sign-in; ratio:2' uk-tooltip='Вход' style='color:Deepskyblue;'></span>" : "<span uk-icon='icon: sign-out; ratio:2' uk-tooltip='Выход' style='color:Violet;'></span>") + "</td>"
                + "<td class='uk-margin-left-small'>" + rz.dateToString(rz.dateFromString((rz.strSubString(aa.fullDate, "", ".")).replace("T", " "), "YYYY-MM-DD hh:mm:ss"), "YYYY-MM-DD hh:mm:ss") + "</td>"
            + "</tr>"
        });
        rr.actionsTable += "</tbody></table>";

        if (rr.timeFirst) rr.timeFirst = rz.dateFromString((rz.strSubString(rr.timeFirst, "", ".")).replace("T", " "), "YYYY-MM-DD hh:mm:ss");
        if (rr.timeLast) rr.timeLast = rz.dateFromString((rz.strSubString(rr.timeLast, "", ".")).replace("T", " "), "YYYY-MM-DD hh:mm:ss");
        */
    });

    //console.log(rowData)
    if (!rowData) return;
    // Преобразования rowData

    const eGridDiv = document.getElementById("resultgrid");
    const {height} = getGridSize();
    document.getElementById("resultgrid").setAttribute("style", `height:${height}px`);

    // zone, direction, date, name, companyName, companyType, employeeType, tabelNumber, datestr, datetimestr, timestr
    const columnDefs = [
        {
            field: "zone",
            headerName: "Зона",
            menuTabs: ["filterMenuTab", "columnsMenuTab", "generalMenuTab"],
            cellRenderer: cellRenderHTML,
            filter: "agSetColumnFilter",
            filterParams: { values: getFilterValues, refreshValuesOnOpen: false },
            tooltipField: "zone",
            width: "130px"
        },
        {
            field: "direction",
            headerName: "Направл",
            menuTabs: ["filterMenuTab"],
            cellRenderer: cellRenderHTML,
            filter: "agSetColumnFilter",
            filterParams: { values: getFilterValues, refreshValuesOnOpen: false },
            width: "130px"
        },
        {
            field: "date",
            headerName: "Полная_Дата",
            menuTabs: ["filterMenuTab"],
            cellRenderer: cellRenderHTML,
            filter: "agDateColumnFilter",
            tooltipField: "date",
            width: "170px"
        },
        {
            field: "name",
            headerName: "ФИО",
            menuTabs: ["filterMenuTab"],
            /* filter: "agTextColumnFilter", */
            filter: "agSetColumnFilter",
            cellRenderer: cellRenderHTML,
            filterParams: { values: getFilterValues, refreshValuesOnOpen: false },
            tooltipField: "name"
        },
        {
            field: "companyName",
            headerName: "Компания",
            menuTabs: ["filterMenuTab"],
            /* filter: "agTextColumnFilter", */
            filter: "agSetColumnFilter",
            filterParams: { values: getFilterValues, refreshValuesOnOpen: false },
            tooltipField: "companyName"
        },
        {
            field: "companyType",
            headerName: "Тип компании",
            menuTabs: ["filterMenuTab"],
            filter: "agSetColumnFilter",
            filterParams: { values: getFilterValues, refreshValuesOnOpen: false },
            tooltipField: "companyType"
        },
        {
            field: "tabelNumber",
            headerName: "Табельный номер",
            menuTabs: ["filterMenuTab"],
            /* filter: "agTextColumnFilter", */
            filter: "agSetColumnFilter",
            filterParams: { values: getFilterValues, refreshValuesOnOpen: false },
            tooltipField: "tabelNumber",
            width: "130px"
        },
        {
            field: "employeeType",
            headerName: "Тип сотрудника",
            menuTabs: ["filterMenuTab"],
            filter: "agSetColumnFilter",
            filterParams: { values: getFilterValues, refreshValuesOnOpen: false },
            tooltipField: "employeeType",
            width: "130px"
        },
        {
            field: "newShift",
            headerName: "Маркер начала смены",
            menuTabs: ["filterMenuTab"],
            filter: "agSetColumnFilter",
            filterParams: { values: getFilterValues, refreshValuesOnOpen: false },
            width: "130px",
            hide:false
        }/* ,
        {
            field: "datestr",
            headerName: "Дата_текст",
            menuTabs: ["filterMenuTab"],
            filter: "agTextColumnFilter",
            tooltipField: "datestr",
            width: "130px"
        },
        {
            field: "timeIn",
            headerName: "Входы",
            menuTabs: ["filterMenuTab"],
            cellRenderer: cellRenderHTML,
            filter: "agTextColumnFilter",
            tooltipField: "timeIn"
        },
        {
            field: "timeOut",
            headerName: "Выходы",
            menuTabs: ["filterMenuTab"],
            cellRenderer: cellRenderHTML,
            filter: "agTextColumnFilter",
            tooltipField: "timeOut"
        },
        {
            field: "timeTotal",
            headerName: "Общее время",
            menuTabs: ["filterMenuTab"],
            cellRenderer: cellRenderHTML,
            filter: "agNumberColumnFilter",
            tooltipField: "timeTotal",
            width: "140px"
        },
        {
            field: "actionsTable",
            headerName: "Действия",
            cellRenderer: cellRenderHTML,
            filter: "agNumberColumnFilter",
            width: "210px"
        } */
    ];

    gridOptions = {
        // Параметры строк:
        rowModelType: "clientSide", // Это самый важный параметр, определяющий все поведение AG-GRID
        rowData,
        // rowHeight: "50",
        getRowHeight,
        suppressMaxRenderedRowRestriction: true,
        // Параметры столбцов:
        columnDefs,
        defaultColDef: {
            resizable: true, sortable: true, minWidth: 60, enableRowGroup: true,
            enableCellChangeFlash: true, cellClassRules: getCellClassRules
            // tooltipComponent: createTooltipComponent
            // cellClass: "align-left", aggFunc: aggFunc_count
        },
        // Группировка
        suppressAggFuncInHeader: true, // Подавить итоги в столбцах
        suppressDragLeaveHidesColumns: true,
        suppressMakeColumnVisibleAfterUnGroup: true,
        suppressRowGroupHidesColumns: true,
        groupDisplayType: "groupRows", rowGroupPanelShow: "always", flex: 1,
        // Выделение
        enableRangeSelection: false,
        // rowSelection: "single",
        suppressRowClickSelection: false,
        // status-bar: quick totals (filterred recordset)
        statusBar: {
            statusPanels: [
                { statusPanel: "agTotalAndFilteredRowCountComponent", align: "left" }
            ]
        },
        // PopUp-Menu
        allowContextMenuWithControlKey: false, getContextMenuItems,
        floatingFilter: false, // Отдельная строка с фильтром
        // Прочие параметры
        animateRows: true,
        onGridReady, onFirstDataRendered
        // debug: true
    };

    // ************************************
    new agGrid.Grid(eGridDiv, gridOptions);
    // ************************************

});

// Вспомогательные функции

const onGridReady = function (params) {
    // Авто-высота Grid
    setTimeout(function () {
        // gridOptions.api.setDomLayout("autoHeight");
        // Здесь можно установить фильтры по-умолчанию
    }, 500);
}

const onFirstDataRendered = function (params) {
    if (typeof params == "undefined") params = gridOptions;
    const autosizeFields = ["name", "companyName", "companyType"]; // "timeIn", "timeOut"
    setTimeout(function () {
        // auto-size-column-width
        // params.columnApi.autoSizeColumns(autosizeFields);
    }, 500);
}

class createTooltipComponent {
    init(params) {
        const eGui = (this.eGui = document.createElement("div"));
        const color = params.color || "white";
        const data = params.api.getDisplayedRowAtIndex(params.rowIndex).data;
        const column = params.column.colId;

        eGui.classList.add("custom-tooltip");
        // @ts-ignore
        eGui.style["background-color"] = color;
        // Title,proposaldate,ndtmethod,object,subobj,contragent,line,notify,dwg,doublecontrol,loyalty,cnumber,dateofprotocol,inspector,tmpltype,groupsofdtd,workfolder,Created,Modified
        eGui.innerHTML = `<p><span class="uk-text-bold">${data[column]}</span></p>`
    }

    getGui() {
        return this.eGui;
    }
}

function cellRenderHTML(params) {
    if (!params || !params.value) return "";

    if (~["timeIn", "timeOut"].indexOf(params.column.colId)) {
        return params.value.join("; ");
    }
    else if (params.column.colId === "timeTotal") {
        return rz.timeMillisecondsToTimeStr(params.value, "hh:mm");
    }
    else if (params.column.colId === "date") {
        const dstr = rz.dateToString(params.value, "dd YYYY-MM-DD hh:mm");
        return "<span style='color:" + (~dstr.indexOf("вс") ? "Firebrick" : "Black") + ";'>" + dstr + "</span>";
    }
    else if (params.column.colId === "direction") {
        return (params.value === "Вход" ? "<span uk-icon='sign-in' uk-tooltip='Вход' style='color:" + (params.data.zone === "Зелёная зона" ? "green" : "hotpink") + ";'></span>" : "<span uk-icon='sign-out' uk-tooltip='Выход' style='color:" + (params.data.zone === "Зелёная зона" ? "Deepskyblue" : "Firebrick") + ";'></span>");
    }
    else if (params.column.colId === "zone") {
        return (params.value === "Зелёная зона" ? "<span uk-icon='home' style='color:green;'></span>&nbsp;&nbsp;Зелёная" : "<span uk-icon='bolt' style='color:red;'></span>&nbsp;&nbsp;Красная");
    }
    else if (params.column.colId === "name") {
        // console.log({isNight: params.data.isNightEmploye, name: params.value});
        return (params.data.isNightEmploye ? "<span uk-icon='user' uk-tooltip='Ночная смена' style='color:Darkmagenta;'></span>&nbsp;&nbsp;" : "<span uk-icon='user' uk-tooltip='Дневная смена' style='color:Darkorange;'></span>&nbsp;&nbsp;") + params.value;
    }

    return params.value;
}

let lastGetColumnState = 0, actionsVisible = false;
function getRowHeight(params) {
    let heigh = 50;
    // if column "actions" is visible -> calculate height of each row!
    const now = (new Date()).getTime();
    if (now > (lastGetColumnState + (3 * 60 * 1000))) { // Make it faster! Allow 1 request in 3 seconds. Or get it from memory.
        const colState = gridOptions.columnApi.getColumnState();
        if (colState && colState.length) {
            for (let i = 0; i < colState.length; i++) {
                if (colState[i].colId === "actions" && !colState[i].hide) { actionsVisible = true; break }
            };
        }
        lastGetColumnState = now;
        // console.log({lastGetColumnState, actionsVisible});
    }
    if (actionsVisible && params.data && params.data.actions && params.data.actions.length) heigh = params.data.actions.length * 35;
    return heigh;
}

/* unnecessary function!
function cellDateFormatter(params) {
    if (!params || !params.value || !rz.isDate(params.value)) return "";
    // return params.value;
    return rz.dateToString(params.value, (params.column.colId === "date" ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss"));
}
*/

function createImgTag(imgfilename, title) {
    var ttl = (title ? " title='" + title + "'" : "");
    var imgtag = ("<img border='0'" + ttl + " src='/sys/img/" + imgfilename + "'/>");
    return imgtag;
}

// Фильтры
function resetAllFilters() {
    if (gridOptions && gridOptions.api) {
        gridOptions.api.setFilterModel(null);
    }
}

function getFilterValues(params) {
    return new Promise(function (resolve, reject) {
        if (!params || !params.colDef || !params.colDef.field || !rowData) { params.fail(); reject(new Error("Empty filter")) }
        const fld = params.colDef.field;
        let ans = [];

        if (fld === "zone") {
            ans = rz.arrGetUnique(rowData.map((rr) => (rr.zone)));
        }
        else if (fld === "companyName") {
            ans = rz.arrGetUnique(rowData.map((rr) => (rr.companyName)));
        }
        else if (fld === "companyType") {
            ans = rz.arrGetUnique(rowData.map((rr) => (rr.companyType)));
        }
        else if (fld === "employeeType") {
            ans = rz.arrGetUnique(rowData.map((rr) => (rr.employeeType)));
        }
        else if (fld === "direction") {
            ans = rz.arrGetUnique(rowData.map((rr) => (rr.direction)));
        }
        else if (fld === "name") {
            ans = rz.arrGetUnique(rowData.map((rr) => (rr.name)));
        }
        else if (fld === "tabelNumber") {
            ans = rz.arrGetUnique(rowData.map((rr) => (rr.tabelNumber)));
        }
        else if (fld === "newShift") {
            ans = [true, false];
        }

        params.success(ans); resolve(ans);
    })
}

const getCellClassRules = {
    "bg-palegreen": function (params) { // we should define this css-rule!
        return ~params.data.zone.indexOf("Зеленая зона"); // true | false
    },
    "bg-cornsilk": function (params) { // we should define this css-rule!
        return ~params.data.zone.indexOf("Красная зона"); // true | false
    }
};

const getContextMenuItems = function (params) {
    const selectedRows = gridOptions.api.getSelectedRows();
    const nodeClicked = params.node.data;
    const setFilters = gridOptions.api.getFilterModel(), filterKeys = rz.objKeys(setFilters);
    // console.log({action:"getContextMenuItems", nodeClicked, selectedRows, filterKeys });

    const result = ["copy", "export"];

    result.push({
        name: "Скачать заполненную форму Excel", icon: "<span class='uk-icon' uk-icon='icon: file-edit' style='height:16px; width:16px;'></span>",
        action: function () { downloadExcelTemplate() }
    });

    return result;
}

function downloadExcelTemplate() {
    console.log("downloadExcelTemplate()");



}