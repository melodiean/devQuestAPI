const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRouter = require('./routes/users')

const questionsRouter = require('./routes/questions')
// const {auth} = require('./controllers/auth')
const db = require("./config/config").get(process.env.NODE_ENV);
// const indexRouter = require('./Routes/index')

const app = express();
const dotenv = require('dotenv') 

dotenv.config()

// app use
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cookieParser());

// const apiDb = process.env.dataBase;

// database connection
mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb://localhost/group4",
  {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false, 
    useCreateIndex: true
},
  function (err) {
    if (err) console.log(err);
    console.log("Database connected");
  }
);

// var db = mongoose.connection

// db.on('error', console.error.bind(console,'Connection Failed: '));

// db.once('open',(err)=>{
//     if(err){
//         console.log(err);
//     }
//     console.log('Database Connected!'); 
// });



// app.get("/", function (req, res) {
//   res.status(200).send(`Welcome to login , sign-up api`);
// });

app.get('/',(req,res)=>{
  res.send('Welcome to G4C4 Edu Api!');

});

app.use('/', userRouter)
app.use('/', questionsRouter)


// listening port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App is live at http:/localhost/${PORT}`);
});
