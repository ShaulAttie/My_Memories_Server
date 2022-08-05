const mongoose = require("mongoose")
const PostMessage = require("../models/postsMessage")

const getPosts = async (req, res) => {
    // console.log(req);
    // console.log("limit",req.query.limit);
    // console.log("skip",req.query.skip);
    // console.log(req.query.limit*(req.query.skip-1));
    try {
        const total = await PostMessage.countDocuments({})
        // console.log(total);
        // mandar pro golan
        const posts = await PostMessage.find().sort({ createAt: -1 }).limit(req.query.limit).skip(req.query.limit * (req.query.skip - 1))

        res.status(200).json({ data: posts })
        // res.status(200).json({data: postMessages , currentPage: req.query.skip, numberOfPages: Math.ceil(total / req.query.limit)})

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query
    try {
        const title = new RegExp(searchQuery, "i")

        const posts = await PostMessage.find({ $or: [{ title }, { tags: { $in: tags.split(',') } }] })

        res.status(200).json({ data: posts })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const getPost = async (req, res) => {
    // console.log("req.params ", req.params);
    const { id } = req.params
    console.log("_ID00 ", id);
    try {
        const post = await PostMessage.findById(id)
        console.log("post00", post);
        res.status(200).json(post)

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const createPost = async (req, res) => {
    const post = req.body

    const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })
    try {
        await newPost.save()
        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

const updatePost = async (req, res) => {
    const { id } = req.params
    const { title, message, creator, selectedFile, tags } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No Post with That ID")

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id }

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true })

    res.status(200).json(updatedPost)

}

const likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
        post.likes.push(req.userId);
    } else {
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.status(200).json(updatedPost);
}

const deletePost = async (req, res) => {
    const { id: _id } = req.params

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No Post with That ID")

    try {
        await PostMessage.findByIdAndRemove(_id)
        res.status(200).json({ message: "Post deleted successfully" })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// const commentPost = async (req, res) => {
//     const { id } = req.params;
//     const { value } = req.body;

//     const post = await PostMessage.findById(id);

//     post.comments.push(value);

//     const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

//     res.json(updatedPost);
// };

module.exports = { getPost, getPostsBySearch, getPosts, createPost, updatePost, likePost, deletePost } 