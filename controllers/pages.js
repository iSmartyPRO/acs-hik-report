const config = require("../config")
const fs = require("fs")
const path = require("path")
const iconvlite = require('iconv-lite');
const csvparser = require("../libs/csvparser")


module.exports.home = (req, res) => {
    res.render("home")
}
module.exports.report = (req, res) => {
    res.render("report")
}
module.exports.reportUpload = (req, res) => {
    const {filename} = req.files[0]
    res.status(200).json({result:true, data: {filename, url: `${config.URL}/report/${filename}`}})
}
module.exports.reportParse = async (req, res) => {
    const {id} = req.params;
    res.render("report-parse", {id});
}
module.exports.reportAPIParse = async (req, res) => {
    const {id} = req.params;
    let filterData = {result: false, data: null};
    try {
        const reportArr = await csvparser.readAndParsingFiles(id);
        filterData = await csvparser.filterData(reportArr.data);
        console.log({fnc: "reportAPIParse(" + id + ").done"});
    }
    catch (err) {
        console.error({fnc: "reportAPIParse(" + id + ").fail", err});
    }
   
    res.status(200).json(filterData);
}
module.exports.help = (req, res) => {
    res.render("help")
}