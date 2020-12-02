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
  exports.comment_answer = async (req,res)=>{
    let answerId = req.params.answerId;
    let questionId = req.params.questionId
    let comment = req.body.comment;
    let Us = req.user.firstname;
  const commented = await Question.findOne({"answer_info._id":answerId}
    // ,{answer_info:1}
  ,{"answer_info.$":1}
  
    // ,{$push:{"answer_info.0.comments.$comment":comment,createdBy:Us}},{ new:true}
  )
    // commented.answer_info[0].comments.push({comment:comment,createdBy:Us})
    // commented.save()
  res.json(commented)
  }
  // (err,doq)=>{
  // if(err){
  //   res.json(`Error: Could not add comment: ${err.message}`)
  //   console.log(err)
  // }
  // Question.update(doq,{answer_info:{comments:{$push:{comment:comment,createdBy:Us}}}})
  // res.json(doq)

    // Question.findOneAndUpdate({_id:questionId
    //   // ,"answer_info._id":answerId
    // },
    // // {'answer_info.$':1},
    // (er, doc) => {
    //   if (er) {
    //     res.json({ Error: "Not found!" }).status(404);
    //     console.log(`Error: ${er}`);
    //   } else {
    //     doc.answer_info[0].comments.comment = comment
    //     doc.answer_info[0].comments.createdBy = req.user.firstname
    //   // })
        
    //     // Question.update()
    //     res.json(doc)
    //   }
    // })