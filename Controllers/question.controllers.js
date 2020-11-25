const Question = require('../Models/questions.model');

//Get all questions from database
exports.get_questions = async (req,res)=>{

await Question.find({},{question:1},(err,quests)=>{
    if(err){
        console.log(err);
    }else{
        res.json(quests);
    }
});

}

// Get a particular question from the database
exports.get_question = async (req,res)=>{
    try{
        await Question.findById(req.params.questionId,(err,quest)=>{
         if(err){
             res.json({Error:err.message});
         }
         res.json({"Question":quest.question,
     "Answers": quest.answer_info.answers});
        });
         res.end();
        }
        catch(err){
            res.send("Question not found!")
             console.log(err)
         }
}

// Post a question
exports.post_question = (req,res)=>{
    const newQuestions = new Question({
        question: req.body.question
        });
    newQuestions.save()
    .then((postedQuestion)=>{
        res.json({"QnID":postedQuestion._id,
            "Qn":postedQuestion.question,
        });
    })
    .catch((err)=>{
        res.json({success:false,msg: "Something went wrong" + console.log(err)})
    })
}

// most answered question
exports.most_answers = async (req,res)=>{

    try{
        let aa;
   
          await Question.find({}, (err,ans)=>{
   
       aa = ans.sort((a,b)=>{
           return b.answer_info.answers.length - a.answer_info.answers.length})[0].question
   
       })
   
       res.send(aa)
   }
   catch(err){
       console.log(err);
   }
            
   }