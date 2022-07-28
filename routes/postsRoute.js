const express = require("express")
const router = express.Router()

const postController = require("../DL/controllers/postsController.js")

router.get("/", postController.getPosts)
router.post("/", postController.createPost)

module.exports = router