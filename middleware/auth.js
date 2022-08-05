const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET
// NAO MEXE MAIS AQUI
const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]

        const isCustomAuth = token.length < 500 // google token has more than 500 charts

        let decodedData

        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, JWT_SECRET)
            req.userId = decodedData?.id

        } else { // for google Token
            decodedData = jwt.decode(token)
            req.userId = decodedData?.sub
        }
        next()

    } catch (error) {
        console.log(error);
    }
}

module.exports = {auth}