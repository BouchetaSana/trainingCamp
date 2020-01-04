const config=require("config")
const express =require("express")
const app = express();
const bodyParser=require('body-parser')
const users=require("./api/routers/users")
const mongoose  = require('mongoose')
app.use(bodyParser())

mongoose.connect("mongodb://localhost:27017/TC",{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch((err)=>console.log('erreur'))

const db=mongoose.connection;
db.on("error",(err)=>console.log("error in connection of BD"+err))
db.once("open",()=>console.log("connected to BD"))


app.use('/users',users)

app.listen(3000,console.log("server in port 3000"))