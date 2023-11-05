const express = require("express")
const app = express()
const port = 3001
const userRoutes = require("./src/routes/routes")
const mongoose = require("mongoose")
const login = require("./src/routes/login")
var cors = require("cors")
var cookieParser = require("cookie-parser")
var path = require("path")
var logger = require("morgan")
const URL =
  "mongodb+srv://vatef06:AZY4MOSAC2QcV9wM@cluster0.gpx2wri.mongodb.net/"

mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("db connecty"))
app.use(logger("dev"))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use(cookieParser())
// app.use("/api/login", login)
app.use("/api/users", userRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
