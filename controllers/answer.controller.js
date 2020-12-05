const Question = require("../models/questions.model");
const mongoose = require("mongoose");

// post an answer to a question
exports.postAnswer = (req, res, next) => {
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
exports.commentAnswer = async (req, res, next) => {
  let questionId = mongoose.Types.ObjectId(req.params.questionId);
  let answerId = mongoose.Types.ObjectId(req.params.answerId);

  let comment = req.body.comment;
  let user = req.user.firstname;
  let newComment = { comment: comment, createdBy: user };

  let userAnswer = await Question.findOne(
    {
      _id: questionId,
      "answer_info._id": answerId,
    },
    (er, doc) => {
      if (er) res.json({ msg: "Invalid ID" });
    }
  );

  userAnswer.answer_info[0].comments.push(newComment);

  userAnswer.save();

  res.json(userAnswer);
  next();
};

// mark answer as preferred
exports.markAnswer = async (req, res, next) => {
  let questionId =
    // mongoose.Types.ObjectId(
    req.params.questionId;
  // );

  let nUser = req.user.firstname;

  let userAnswer = await Question.findOneAndUpdate(
    { _id: questionId, createdBy: nUser },
    { "answer_info.0.best_answer": true },
    (err, doc) => {
      if (err) {
        console.log(err);
        return err.message;
      }
      return doc;
    }
  );
  if (Boolean(userAnswer) == false) {
    return res.json({ msg: "Unauthorized!" });
  } else {
    res.json({ msg: "Marked!", doc: userAnswer });
    // res.json({msg:"Answer marked as Preferred!"});
  }
  // res.json(userAnswer)
  next();
};

// update an answer
exports.updateAnswer = async (req, res, next) => {
  let answer = req.body.answer;
  let { answerId } = req.params;
  let user = req.user.firstname;

  let updatedAnswer = await Question.findOneAndUpdate(
    { "answer_info._id": answerId, "answer_info.createdBy": user },
    { "answer_info.$.answer": answer },
    (er, doc) => {
      if (er) {
        res.json({ msg: er.message }).status(404);
      }
      return doc;
    }
  );

  if (Boolean(updatedAnswer) == false) {
    return res.json({ msg: "Unauthorized!" });
  }
  res.json({ msg: "Answer Updated!" });
  // next();
};
