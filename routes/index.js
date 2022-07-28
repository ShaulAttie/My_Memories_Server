const express = require("express")
const router = express.Router()

const postsRouter = require("./postsRoute")

router.use("/posts", postsRouter)

module.exports = router