const Question = require("../Models/questions.model");

//Get all questions from database
exports.get_questions = async (req, res) => {
  await Question.find({}, (err, quests) => {
    if (err) {
      res.json({ Error: err }).status(404);
      console.log(err);
    } else {
      res.json(quests);
    }
  });
};

// Post a question
exports.post_question = async (req, res) => {
  //   let date = new Date().toString();
  const newQuestion = new Question({
    question: req.body.question,
    // createdBy:
  });
  newQuestion
    .save()
    .then((postedQuestion) => {
      res
        .json({
          msg: "Posted!",
          Qn: postedQuestion.question,
          // createdBy:
        })
        .status(201);
    })
    .catch((err) => {
      res.json({ success: false, msg: err.message + console.log(err) });
    });
};

//search for a question in database with a particular keyword

exports.search_question = async (req, res) => {
  let q = [],
    keyword = req.params.keyword;

  Question.find({}, { question: 1 }, (err, doc) => {
    if (err) {
      res.json(err).status(404);
    } else {
      q = doc.filter((el) => {
        let reg = new RegExp(keyword, "gi");
        return el.question.match(reg) !== null;
      });
      if (q.length == 0) {
        return res.json({
          msg: `Sorry, no '${keyword}' questions found! Try again!`,
        });
      }
      res.json(q).status(200);
    }
  });
};

// post an answer to a question
exports.post_answer = (req, res) => {
  let questionId = req.params.questionId;
  let answer = req.body.answer;

  Question.findById(questionId, (er, doc) => {
    if (er) {
      res.json({ Error: "Question not found!" }).status(404);
      console.log(`Error: ${err}`);
    } else {
      doc.answer_info.push({ answer: answer });
      doc.save();
      res.json(doc);
    }
  });
};

// the top 3 most answered questions
exports.most_answers = async (req, res) => {
  try {
    let mostAnswered = [];

    await Question.find({}, (err, ans) => {
      if (err) {
        return res.json({ Error: err });
      } else {
        for (let i in ans) {
          mostAnswered.push({
            QnID: ans[i]._id,
            Qn: ans[i].question,
            Ans: ans[i].answer_info.length,
          });
        }
      }

      mostAnswered.sort((a, b) => {
        return b.Ans - a.Ans;
      });
      mostAnswered.length = 3;
      res.send(mostAnswered);
    });
  } catch (err) {
    console.log(err);
  }
};
