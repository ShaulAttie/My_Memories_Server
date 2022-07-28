require('dotenv').config()

const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())

PORT = process.env.PORT || 5000


const mainRouter = require("./routes/index")
app.use("/api", mainRouter )

require("./DL/db").connect()

app.listen(PORT, ()=> console.log(`Server is running at Port ${PORT}`))