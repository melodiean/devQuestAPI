const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");

const userRouter = require("./routes/users");
const questionsRouter = require("./routes/questions");

dotenv.config();

const db = process.env.apiDb;
//  ||
// process.env.lDb

// app use
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cookieParser());
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
const PORT = process.env.PORT || process.env.apiPort;
app.listen(PORT, () => {
  console.log(`API is live at http://localhost:${PORT}`);
});
