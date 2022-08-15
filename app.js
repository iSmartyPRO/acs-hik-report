const express = require("express")
const morgan = require("morgan") 
const exphbs = require("express-handlebars")
const path = require("path")

const app = express()
const pagesRoutes = require("./routes/pages")

const hbs = exphbs.create({
    defaultLayout: "main",
    extname: "hbs",
})

//process.env.TZ = "Europe/Moscow";
app.engine("hbs", hbs.engine)
app.set("view engine", "hbs")
app.set("views", "views")

app.use(express.urlencoded({extended: true}))
app.use(express.json({limit: '50mb', type: 'application/json'}))
app.use(express.urlencoded({
    parameterLimit: 100000,
    limit: '50mb',
    extended: true
}))
app.use(express.static("public"))
app.use("/public/uikit", express.static(path.join(__dirname, "node_modules","uikit","dist")))
app.use(morgan("combined"))
app.use("/", pagesRoutes)

module.exports = app