const Question = require('../Models/questions.model');

//Get all questions from database
exports.get_questions = async (req,res)=>{

await Question.find({},(err,quests)=>{
    if(err){
        res.json({"Error":err})
        console.log(err);
    }else{
        res.json(quests);
    }
});

}

// Post a question
exports.post_question = (req,res)=>{
    let date = new Date().toString();
    const newQuestions = new Question({
        question: req.body.question,
        dateCreated: date
        // createdBy:
        });
    newQuestions.save()
    .then((postedQuestion)=>{
        res.json({"msg":"Posted!",
            "Qn":postedQuestion.question,
            dateCreated: date,
            // createdBy:
        });
    })
    .catch((err)=>{
        res.json({success:false,msg: "Something went wrong" + console.log(err)})
    })
}
