const express = require('express')
const app = express()

const mongoose = require('mongoose')
const dotenv = require('dotenv') 

dotenv.config()

const port = process.env.apiPort

const apiDb = process.env.db;

mongoose.connect(apiDb, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false, 
    useCreateIndex: true
})

var db = mongoose.connection

db.on('error', console.error.bind(console,'Connection Failed: '));

db.once('open',(err)=>{
    if(err){
        console.log(err);
    }
    console.log('Database Connected!'); 
});

app.get('/',(req,res)=>{
    if(err) {
        console.log(err);
    }
    else{
    res.json({message:'From Edu Api!'});
    }

});

app.listen(port,()=>{
    try{
        console.log(`Api is running at http://localhost:${port}/`); 
    }
    catch(err){
        console.log(
        `Error: ${err.message}`
        );
    }
})