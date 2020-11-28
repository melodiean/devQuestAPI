const express = require('express')

const App = express()

// const indexRouter = require('./Routes/index')

const mongoose = require('mongoose')
const dotenv = require('dotenv') 

const questionsRouter = require('./Routes/questions')

var port = 8000;

dotenv.config();
App.use(express.json()); 
App.use(express.urlencoded({ extended: true })); 

// const apiDb = process.env.dataBase;

App.use('/', questionsRouter)

mongoose.connect('mongodb://localhost/group4', {
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

App.get('/',function(req,res){
    res.json({message:'From the App!'});
});

// App.use('/', indexRouter)

App.listen(port,function(){
    console.log(`App is running at http://localhost:${port}/`); 
})