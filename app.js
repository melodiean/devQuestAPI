const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRouter = require('./routes/users')
// const {auth} = require('./controllers/auth')
const db = require("./config/config").get(process.env.NODE_ENV);

const app = express();
const dotenv = require('dotenv') 

dotenv.config()

// app use
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cookieParser());

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
    console.log("database is connected");
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
  if(err) {
      console.log(err);
  }
  else{
  res.json({message:'From Edu Api!'});
  }

});

app.use('/', userRouter)

// listening port
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`app is live at ${PORT}`);
//   try{
//     console.log(`Api is running at http://localhost:${port}/`); 
// }
// catch(err){
//     console.log(
//     `Error: ${err.message}`
//     );
// }
});
