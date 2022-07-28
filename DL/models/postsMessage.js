const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String, //will be translated using base64
    likeCount: {
        type: Number,
        default: 0
    },
    createAt: {
        type: Date,
        default: new Date()
    }
})

const PostMessage = mongoose.model("PostMessage", postSchema);

module.exports = PostMessage