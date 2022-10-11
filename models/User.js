const {
    model,
    Schema
} = require('mongoose')

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        require: true,
        validate: {
            validator: function (v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v)
                // return false
            }
        }
    },
    password: String,
    roles: {
        type: [String],
        default: ['STUDENT'],
        required: true,
    },
    accountStatus: {
        type: String,
        enum: ['PENDING', 'ACTIVE', 'REJECTED'],
        default: 'PENDING',
        required: true
    },
})

const User = model('User', userSchema)

module.exports = User