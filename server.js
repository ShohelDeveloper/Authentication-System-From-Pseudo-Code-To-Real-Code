const express = require('express');
const { default: mongoose } = require('mongoose');
const User = require('./models/User')
const bcrypt = require('bcryptjs')

const app = express()
app.use(express.json())



const database = mongoose.connect("mongodb+srv://ShohelRana:VD3aTF2Vkyiz6nfE@cluster0.82mknop.mongodb.net/?retryWrites=true&w=majority",{dbName:"register", useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log('Database Connected')
    app.listen(5000, () => {
        console.log('I am Listening On Port 4000')
    })
})
.catch((e)=>{
      console.log(e)
})


app.post('/register',async (req,res,next)=>{

    const {name,email,password} = req.body
    //    if user is not defined name or emai or password
        if(!name || !email || !password){
            return res.status(404).json({message:'Invalid Data'})
        }
try{
    // if user try to create a new but his email is same previous
    let user = await User.findOne({email:email})
   console.log(user);
    if(user){
        return res.status(400).json({message:'User Already Exists'});
    }
 
   user = new User({name,email,password})

// Hash
   const salt = await bcrypt.genSalt(10)
   const hash = await bcrypt.hash(password, salt)
   user.password = hash

    // user create account
    const result = await User.create(user)
    return res.status(201).json({message:"User Created Successfully",user})
}catch(e){
        next(e)
}
})
// globally error handel
app.use((err,req,res,next)=> {
    console.log(err)
    res.status(500).json({message:"Server Error Occurred"})
})
 app.get('/register',async(req,res)=> {
   const result = await User.find({})
    res.json(result)
})

