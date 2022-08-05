const express = require("express")
const router = express.Router()

const postsRouter = require("./postsRoute")
const usersRouter = require("./usersRoute")

router.use("/posts", postsRouter)
router.use("/users", usersRouter)

module.exports = router