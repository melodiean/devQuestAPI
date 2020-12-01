const Question = require("../models/questions.model");

//Get all questions from database
exports.get_questions = async (req, res) => {
  await Question.find({}, (err, quests) => {
    if (err) {
      res.json({ Error: err }).status(404);
      console.log(err);
    } else {
      res.json(quests)
    }
  });
};

// Post a question
exports.post_question = async (req, res) => {
  //   let date = new Date().toString();
  const newQuestion = new Question({
    question: req.body.question,
    createdBy: req.user.firstname
  });
  newQuestion
    .save()
    .then((postedQuestion) => {
      res
        .json({
          msg: "Posted!",
          dateCreated: postedQuestion.dateCreated,
          Qn: postedQuestion.question,
          createdBy: req.user.firstname
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

exports.delete_question = async (req, res) => {
  Question.findByIdAndRemove({_id:req.params.id}, function (err) {
    if(err){
      res.json({Error: err})
    }
    res.json({message: "Your question has been removed"})
    console.log('removed the question')
  });
}
