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

       await Question.findById(req.params.questionId,(err,quest)=>{
        if(err){
            res.json({Error:err.message});
        }
        res.json(quest);
       });
        res.end();
}

// Post a question
exports.post_question = (req,res)=>{
    const newQuestion = new Question({
        question: req.body.question
        });
    newQuestion.save()
    .then((postQuestion)=>{
        res.json({
            postQuestion,
            msg:"Question posted"

        });
    })
    .catch((err)=>{
        res.json({msg: "Error posting question" + console.log(err)})
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