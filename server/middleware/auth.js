const { setCurrentUser } = require('./userSession')
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {

    const token = req.headers.authorization.split(" ")
    if (token.length > 0) {
        try {
            const decoded = jwt.verify(token[1], 'api_key')
            console.log("decoded  : ", decoded)
            setCurrentUser(decoded)
            next()
        }
        catch {
            res.status(401).json({ statusCode: 401, message: 'Unauthorized Access' })
        }
    }
    else {
        res.status(401).json({ statusCode: 401, message: 'Unauthorized Access' })
    }
}

module.exports = authMiddleware