const express = require('express');
const cors = require('cors');
const login = require('./routers/login');
const signup = require('./routers/signup');
const editUser = require('./routers/editUser');
const deleteUser = require('./routers/deleteUser');


const app = express();

app.use(cors());

app.use(express.json())

app.use(express.urlencoded({
    extended:true
}))

app.get("/",(req,res)=>{
    res.send("Hello world");
})

app.use('/login',login);

app.use('/signup',signup);

app.use('/edit',editUser);

app.use('/delete',deleteUser);

app.listen(4000,()=>{
    console.log("Port is running at 4000");
})