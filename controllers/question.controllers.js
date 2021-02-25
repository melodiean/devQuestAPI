const Question = require("../models/questions.model");
const mongoose = require("mongoose");
//Get all questions from database
exports.getQuestions = async (req, res, next) => {
  await Question.find({},{__v:0}, (err, doc) => {
    if (err) {
      res.json({ Error: "Error loading data..." }).status(404);
      console.log(err.message);
    } else {
      res.json(doc);
    }
  });
  next();
};

// Post a question
exports.postQuestion = async (req, res) => {
  const newQuestion = new Question({
    question: req.body.question,
    createdBy: req.user.firstname,
  });
  newQuestion
    .save()
    .then((postedQuestion) => {
      res
        .json({
          msg: "Posted!",
          dateCreated: postedQuestion.dateCreated,
          Qn: postedQuestion.question,
          createdBy: req.user.firstname,
        })
        .status(201);
    })
    .catch((err) => {
      res.json({ success: false, msg: err.message + console.log(err) });
    });
  // next();
};

//search for a question in database with a particular keyword

exports.searchQuestion = async (req, res, next) => {
  let searchedQuest = [],
    keyword = req.params.keyword;

  Question.find({}, { question: 1 }, (err, doc) => {
    if (err) {
      res.json({ msg: err }).status(404);
    } else {
      searchedQuest = doc.filter((el) => {
        let reg = new RegExp(keyword, "gi");
        return el.question.match(reg) !== null;
      });
      if (searchedQuest.length == 0) {
        return res.json({
          msg: `Sorry, no '${keyword}' questions found! Try again!`,
        });
      }
      res.json(searchedQuest).status(200);
    }
  });

  // next();
};

// the top 3 most answered questions
exports.mostAnswers = async (req, res) => {
  try {
    let mostAnswered = [];

    await Question.find({}, (err, ans) => {
      if (err) {
        return res.json({ Error: err });
      } else {
        for (let an in ans) {
          mostAnswered.push({
            QnID: ans[an]._id,
            Qn: ans[an].question,
            Ans: ans[an].answer_info.length,
          });
        }
      }

      mostAnswered.sort((a, b) => {
        return b.Ans - a.Ans;
      });
      mostAnswered.length = 3;
      res.json(mostAnswered);
    });
  } catch (err) {
    console.log(err);
  }
  next();
};

// get a particular question
exports.getQuestion = async (req, res, next) => {
  let questionId = req.params.questionId;

  let quest = await Question.findById(
    questionId,
    { question: 1, createdBy: 1, answer_info: 1 },
    (err, doc) => {
      if (err) {
        console.log(err.message);
        res.json({ msg: "Question not found!" });
      }
      return doc;
    }
  );
  res.json({
    Qn: quest.question,
    createdBy: quest.createdBy,
    Ans: quest.answer_info,
  });
  next();
};

// delete a question

exports.deleteQuestion = async (req, res) => {
  let questionId = mongoose.Types.ObjectId(req.params.questionId);
  let user = req.user.firstname;

  await Question.findOne({ _id: questionId }, (err, doc) => {
    if (err) {
      res.json({ msg: "Question not found!" });
    } else {
      if (doc.createdBy == user) {
        doc.remove();
        return res.json({ msg: "Question deleted!" });
      }
      res.json({
        msg: `Sorry, only ${doc.createdBy} can delete this question!`,
      });
    }
  });
};

// get all questions ever asked by user
exports.userQuestions = (req, res) => {
  let user = req.params.userId;
  let userId = req.user._id;

  Question.find({ createdBy: user }, { question: 1 }, (err, doc) => {
    if (err) {
      return res.json({ err: "User not found!" });
    }
    res.json(doc);
  });
  // next();
};
