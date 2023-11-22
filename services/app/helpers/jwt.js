const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET

const signInToken = (data) => {
    return jwt.sign(data, jwtSecret)
}
const verifiedToken = (token) => {
    return jwt.verify(token, jwtSecret)
}


module.exports = {signInToken, verifiedToken}