const Question = require('../Models/questions.model')

// post an answer to a question
exports.post_answer =  (req,res)=>{
let answer = req.body.answer;
let questionId = req.params.questionId;

 Question.findById(questionId,(er,doc)=>{
    if(er){
        res.send({"Error":er})
        console.log(er);
    }else{
        doc.answers.push({answer:answer})
        doc.save()
        res.send(doc)
    }
})
// res.end()
}
