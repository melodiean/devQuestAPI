const Question = require("../models/questions.model");

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
  let answerId = req.params.answerId;
  let questionId = req.params.questionId;
  let comment = req.body.comment;
  let user = req.user.firstname;
  let newComment = { comment: comment, createdBy: user };

  let userAnswer = await Question.findOne({
    _id: questionId,
    "answer_info._id": answerId,
  });

  userAnswer.answer_info[0].comments.push(newComment);

  userAnswer.save();

  res.json(userAnswer);
  next();
};

// mark answer as preferred
exports.markAnswer = async (req, res, next) => {
  let { questionId, answerId } = req.params;
  // let nUser = req.user.firstname;

  let userAnswer = await Question.findOneAndUpdate(
    { _id: questionId, "answer_info._id": answerId },
    { "answer_info.$.best_answer": true },
    (err, doc) => {
      if (err) {
        console.log(err);
        return res.json("Server Error!");
      }
return doc
    }
  );
  if (Boolean(userAnswer) == false) {
    return res.json("Unauthorized!");
  }
  res.json("Answer marked as Preferred!");
  // next();
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
        res.json(er.message).status(404);
      }
      return doc;
    }
  );

  if (Boolean(updatedAnswer) == false) {
    return res.json("Unauthorized!");
  }
  res.json("Answer Updated!");
  // next();
};