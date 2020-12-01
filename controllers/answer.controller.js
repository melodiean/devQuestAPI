const Question = require('../models/questions.model')

// post an answer to a question
exports.post_answer = (req, res) => {
    let questionId = req.params.questionId;
    let answer = req.body.answer;
  
    Question.findById(questionId, (er, doc) => {
      if (er) {
        res.json({ Error: "Question not found!" }).status(404);
        console.log(`Error: ${err}`);
      } else {
        doc.answer_info.push({ answer: answer ,createdBy: req.user.firstname});
        doc.save();
        res.json(doc);
      }
    });
  };
  
  // comment on an answer
  // exports.comment_answer = async (req,res)=>{
  //   let answerId = req.params.answerId;
  //   let questionId = req.params.questionId
  //   let comment = req.body.comment;
  //   createdBy = req.user.firstname;
  
  //   await Question.find({_id:questionId}, (er, doc) => {
  //     if (er) {
  //       res.json({ Error: "Answer not found!" }).status(404);
  //       console.log(`Error: ${er}`);
  //     } else {
  //       // doc.answer_info.comments.push({comment:comment})
  //       // doc.save()
  //      res.json(doc)
  //     }
      
  //   })
  // }