const mongoose = require("mongoose")
const MONGO_PASS = process.env.MONGO_PASS
const MONGO_URL = `mongodb+srv://ShaulAttie:${MONGO_PASS}@cluster0.jfcbcdn.mongodb.net/memories?retryWrites=true&w=majority`

const connect = async () => {
    try {
        await mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
            if (error) throw error
            console.log('Connection Success, State', mongoose.connection.readyState);
        })
    } catch (error) {
        console.log(`Error Mongoose`, error.message);
    }
}

module.exports = {connect}