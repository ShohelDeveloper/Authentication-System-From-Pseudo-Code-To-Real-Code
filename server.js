const express = require('express');
const { default: mongoose } = require('mongoose');
const User = require('./models/User')


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



app.post('/register',async (req,res)=>{

    const data = req.body
//    if user is not defined name or emai or password
    if(!data.name || !data.email || !data.password){
        return res.status(404).json({message:'Invalid Data'})
    }

// if user try to create a new but his email is same previous
    let user = await User.findOne({email:data.email})
   console.log(user);
    if(user){
        return res.status(400).json({message:'User Already Exists'});
    }

    // user create account
    const result = await User.create(data)
    return res.status(201).json({message:"User Created Successfully", data})


 })


 app.get('/register',async(req,res)=> {
   const result = await User.find({})
    res.json(result)
});