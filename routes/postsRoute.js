const { Router } = require("express")
const express = require("express")
const router = express.Router()

const postController = require("../DL/controllers/postsController.js")

const {auth} = require("../middleware/auth.js")

router.get("/search", postController.getPostsBySearch)
router.get("/", postController.getPosts)
router.get("/:id", postController.getPost)

router.post("/", auth, postController.createPost)
router.patch("/:id", auth, postController.updatePost)
router.delete("/:id", auth, postController.deletePost)
router.patch("/:id/likePost", auth, postController.likePost)
// router.post('/:id/commentPost',commentPost)

module.exports = router