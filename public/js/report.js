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

document.addEventListener('DOMContentLoaded', async (event) => {
    if (!csvfileid) return;
    rowData = await processCSVfile(csvfileid);
    rowData.forEach((rr, r) => {
        rr.date = rz.dateFromString((rz.strSubString(rr.date, "", ".")).replace("T", " "), "YYYY-MM-DD hh:mm:ss");
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

        // rr.datestr = rz.dateToString(rr.date, "YYYY-MM-DD");
        /*
        if (rr.timeFirst) rr.timeFirst = rz.dateFromString((rz.strSubString(rr.timeFirst, "", ".")).replace("T", " "), "YYYY-MM-DD hh:mm:ss");
        if (rr.timeLast) rr.timeLast = rz.dateFromString((rz.strSubString(rr.timeLast, "", ".")).replace("T", " "), "YYYY-MM-DD hh:mm:ss");
        */
    });

    //console.log(rowData)
    if (!rowData) return;
    // Преобразования rowData

    const eGridDiv = document.getElementById("resultgrid");
    const {height} = getGridSize();
    document.getElementById("resultgrid").setAttribute("style",`height:${height}px`)

    const plainlist = true;

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
        }, /*
        {
            field: "direction",
            headerName: "Направление",
            menuTabs: ["filterMenuTab"],
            cellRenderer: cellRenderHTML,
            filter: "agSetColumnFilter",
            filterParams: { values: getFilterValues, refreshValuesOnOpen: false },
            tooltipField: "direction"
        },
        {
            field: "date",
            headerName: "Полная Дата",
            menuTabs: ["filterMenuTab"],
            //valueFormatter: cellDateFormatter,
            cellRenderer: cellRenderHTML,
            filter: "agDateColumnFilter",
            tooltipField: "date"
        }, */
        {
            field: "datestr",
            headerName: "Дата_текст",
            menuTabs: ["filterMenuTab"],
            filter: "agTextColumnFilter",
            tooltipField: "datestr",
            width: "130px"
        },
        {
            field: "companyName",
            headerName: "Компания",
            menuTabs: ["filterMenuTab"],
            cellRenderer: cellRenderHTML,
            filter: "agTextColumnFilter",
            tooltipField: "companyName"
        },
        {
            field: "companyType",
            headerName: "Тип компании",
            menuTabs: ["filterMenuTab"],
            cellRenderer: cellRenderHTML,
            filter: "agSetColumnFilter",
            filterParams: { values: getFilterValues, refreshValuesOnOpen: false },
            tooltipField: "companyType"
        },
        {
            field: "name",
            headerName: "ФИО",
            menuTabs: ["filterMenuTab"],
            filter: "agTextColumnFilter",
            tooltipField: "name"
        },
        {
            field: "tabelNumber",
            headerName: "Табельный номер",
            menuTabs: ["filterMenuTab"],
            filter: "agTextColumnFilter",
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
        }
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
        groupDisplayType: "groupRows", rowGroupPanelShow: "always", flex: 1,
        // Выделение
        enableRangeSelection: false,
        // rowSelection: "single",
        suppressRowClickSelection: false,
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
    const autosizeFields = ["zone", "companyType", "companyName", "name", "timeIn", "timeOut"];
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
        const hrs = String(parseInt(Number(params.value)));
        const min = String(Math.round((Number(params.value) - hrs) * 60));
        const clocktime = (hrs.length === 1 ? "0" : "") + hrs + ':' + (min.length === 1 ? "0" : "") + min;
        return clocktime;
    }
    else if (~["date", "timeFirst", "timeLast"].indexOf(params.column.colId)) {
        return rz.dateToString(params.value, (params.column.colId === "date___" ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss"));
    }
    else if (params.column.colId === "direction") {
        return (params.value === "Вход" ? "<span uk-icon='sign-in' uk-tooltip='Вход' style='color:green;'></span>" : "<span uk-icon='sign-out' uk-tooltip='Выход' style='color:red;'></span>");
    }
    else if (params.column.colId === "zone") {
        return (params.value === "Зелёная зона" ? "<span uk-icon='home' style='color:green;'></span>&nbsp;&nbsp;Зелёная" : "<span uk-icon='bolt' style='color:red;'></span>&nbsp;&nbsp;Красная");
    }

    return params.value;
}

function getRowHeight(params) {
    let heigh = 50;
    if (params.data.actions && params.data.actions.length) heigh = params.data.actions.length * 35;
    return heigh;
}

function cellDateFormatter(params) {
    if (!params || !params.value || !rz.isDate(params.value)) return "";
    // return params.value;
    return rz.dateToString(params.value, (params.column.colId === "date" ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss"));
}

function createImgTag(imgfilename, title) {
    var ttl = (title ? "title='" + title + "'" : "");
    var imgtag = ("<img border='0' " + ttl + " src='/sys/img/" + imgfilename + "'/>");
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
        else if (fld === "companyType") {
            ans = rz.arrGetUnique(rowData.map((rr) => (rr.companyType)));
        }
        else if (fld === "employeeType") {
            ans = rz.arrGetUnique(rowData.map((rr) => (rr.employeeType)));
        }
        else if (fld === "direction") {
            ans = rz.arrGetUnique(rowData.map((rr) => (rr.direction)));
        }

        params.success(ans); resolve(ans);
    })
}

const getCellClassRules = {
    "bg-palegreen": function (params) {
        const zone = params.data.zone;
        return ~zone.indexOf("Зеленая зона"); // true | false
    },
    "bg-cornsilk": function (params) {
        const zone = params.data.zone;
        return ~zone.indexOf("Красная зона"); // true | false
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