const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {
    findUserByProperty,
    createNewUser
} = require('./user')
const error = require('../util/error')

const registerService = async ({
    name,
    email,
    password,
    roles,
    accountStatus
}) => {
    let user = await findUserByProperty('email', email)
    console.log(user);
    if (user) throw error('User Already Exist', 400);

    // Hash
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    return createNewUser({
        name,
        email,
        password: hash,
        roles,
        accountStatus
    })

    //  // user create account
    //  const result = await User.create(user)
}



const loginrService = async ({
    email,
    password
}) => {
    const user = await findUserByProperty('email', email)
    if (!user) throw error('Invalid Credential', 400)

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) throw error('Invalid Credential', 400)

    const payload = {
        _id: user._id,
        name: user.name,
        email: user.email
    }

    //    Generate & Return JWT
    return jwt.sign(user._doc, 'secret-key', {
        expiresIn: '2h'
    })

}

module.exports = {
    registerService,
    loginrService
}