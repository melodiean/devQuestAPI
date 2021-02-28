const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("cookie-session");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const userRouter = require("./routes/users");
const questionsRouter = require("./routes/questions");


const db = process.env.apiDb;

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cookieParser());
// app.use(session{
//   name:'session',
//   secret:'mkklkhighfhryh',
//   expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
// })
app.use(cors());

// database connection
mongoose.Promise = global.Promise;
mongoose.connect(
  db,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  function(err){
    if (err) console.log(err);
    console.log("devQuest connected!");
  }
);

app.get("/", (req, res) => {
  res.json("Welcome to devQuest!");
});

app.use("/api/v1", userRouter);
app.use("/api/v1", questionsRouter);

// listening port
const PORT = process.env.apiPort || process.env.PORT;
app.listen(PORT, () => {
  console.log(`API is live at http://localhost:${PORT}`);
});