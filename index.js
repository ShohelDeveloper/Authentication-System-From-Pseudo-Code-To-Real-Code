const mongoose = require('mongoose');


mongoose.connect("mongodb+srv://ShohelRana:VD3aTF2Vkyiz6nfE@cluster0.82mknop.mongodb.net/?retryWrites=true&w=majority",{dbName:'NewDatabaseCreate', useNewUrlParser: true, useUnifiedTopology: true},{serverSelectionTimeoutMS:1000}) //dbname means a new databse create
.then(()=>{
    console.log('Database Connected')
    createUser({name:'kolilur', email:'kolilur@gmail.com'})
    createUser({name:'shohel', email:'shohel@gmail.com'})

    mongoose.connection.close()
})
.catch((e)=>{
    console.log(e)
})

const UserSchema = new mongoose.Schema({
    name:String,
    email:String
})

const User = mongoose.model('userCollection',UserSchema) //UserCollection is Collection name in Databse

async function createUser(data) {
    const user = new User({...data})
    await user.save()
    return user
}