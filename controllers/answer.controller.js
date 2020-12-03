const Question = require("../models/questions.model");

// post an answer to a question
exports.post_answer = (req, res, next) => {
  let questionId = req.params.questionId;
  let answer = req.body.answer;

  Question.findById(questionId, (er, doc) => {
    if (er) {
      console.log(`Error: ${err}`);
      return res.json({ Error: "Question not found!" }).status(404);
    } else {
      doc.answer_info.push({ answer: answer, createdBy: req.user.firstname });
      doc.save();
      res.json(doc);
    }
  });
  // next();
};

// comment on an answer
exports.comment_answer = async (req, res, next) => {
  let answerId = req.params.answerId;
  let questionId = req.params.questionId;
  let comment = req.body.comment;
  let Us = req.user.firstname;
  let newComment = { comment: comment, createdBy: Us };

  let d = await Question.findOne({
    _id: questionId,
    "answer_info._id": answerId,
  });

  d.answer_info[0].comments.push(newComment);

  d.save();

  res.json(d);
  next();
};

// mark answer as preferred
exports.mark_answer = async (req, res, next) => {
  let { questionId, answerId } = req.params;
  let nUser = req.user.firstname;

  await Question.findOneAndUpdate(
    { _id: questionId, "answer_info._id": answerId },
    { "answer_info.$.best_answer": true },
    (err, doc) => {
      if (err) {
        console.log(err);
        return res.json("Server Error!");
      }
      res.json(doc);
    }
  );
  // next();
};

// update an answer
exports.update_answer = (req, res, next) => {
  let answer = req.body.answer;
  let { answerId } = req.params;
  let nUser = req.user.firstname;

  Question.findOneAndUpdate(
    { "answer_info._id": answerId, "answer_info.createdBy": nUser },
    { "answer_info.$.answer": answer },
    (er, doc) => {
      if (er) {
        return res.json("Not Found").status(404);
      }
      res.send("Answer Updated!");
    }
  );
  // next();
};
