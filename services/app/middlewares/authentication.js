const { verifiedToken } = require("../helpers/jwt")
const { User } = require('../models')


const authentication = async (req, res, next) => {
    try {
        const { access_token } = req.headers
        if (!access_token) throw { name : 'InvalidToken'}

        const decodedToken = verifiedToken(access_token)

        const user = await User.findByPk(decodedToken.id)
        if (!user) throw { name : 'InvalidToken'}

        req.user = user
        log
        next()
    } catch (err) {
        next(err)
    }
}


module.exports = {authentication}