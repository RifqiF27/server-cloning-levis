const bcrypt = require('bcryptjs')

const hasPass = (password) => {
    return bcrypt.hashSync(password)
}

const comparePass = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword)
}

module.exports = {hasPass, comparePass}