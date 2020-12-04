const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const dotenv = require('dotenv') 

const userRouter = require('./routes/users')
const questionsRouter = require('./routes/questions')

dotenv.config()

const db = 
// process.env.apiDb
//  || 
process.env.lDb

// app use
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cookieParser());

// const apiDb = process.env.dataBase;

// database connection
mongoose.Promise = global.Promise;
mongoose.connect(db,
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

app.get('/',(req,res)=>{
  res.json('Welcome to G4C4 Edu Api!');

});

app.use('/api/v1', userRouter)
app.use('/api/v1', questionsRouter)


// listening port
const PORT = process.env.PORT || process.env.apiPort;
app.listen(PORT, () => {
  console.log(`App is live at http://localhost:${PORT}`);
});
