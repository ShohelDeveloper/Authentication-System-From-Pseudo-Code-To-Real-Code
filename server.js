const express = require('express');
const {
    default: mongoose
} = require('mongoose');
const authenticate = require('./middleware/authenticate')
const routes = require('./routes')
const User = require('./models/User')

const app = express()
app.use(express.json())
app.use(routes)


const database = mongoose.connect("mongodb+srv://ShohelRana:VD3aTF2Vkyiz6nfE@cluster0.82mknop.mongodb.net/?retryWrites=true&w=majority", {
        dbName: "register",
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Database Connected')
        app.listen(5000, () => {
            console.log('I am Listening On Port 4000')
        })
    })
    .catch((e) => {
        console.log(e)
    })


app.get('/private', authenticate, async (req, res) => {
    console.log('I am a user', req.user)
    return res.status(200).json({
        message: 'I am a Private Route'
    })
})

app.get('/public', (req, res) => {
    return res.status(200).json({
        message: 'I am a Public Route'
    })
})


// globally error handel
app.use((err, req, res, next) => {
    console.log(err)
    const message = err.message ? err.message : 'Server Error Occurred'
    const status = err.status ? err.status : 500
    res.status(status).json({
        message
    })
})
app.get('/register', async (req, res) => {
    const result = await User.find({})
    res.json(result)
})