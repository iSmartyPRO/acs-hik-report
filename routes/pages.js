const express = require("express")
const router = express.Router()
const controller = require("../controllers/pages")
const multer  = require("multer")
const path = require("path")
const upload = multer({ dest: path.join(__dirname, "..", "uploads/" )})

console.log({ dest: path.join(__dirname, "..", "uploads/" )})
router.get("/", controller.home)
router.get("/report", controller.report)
router.post("/report", upload.array("files[]"), controller.reportUpload)
router.get("/report/:id", controller.reportParse)
router.get("/api/:id", controller.reportAPIParse)
router.get("/help", controller.help)

module.exports = router