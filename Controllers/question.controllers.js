const Question = require('../Models/questions.model');

//Get all questions from database
exports.get_questions = async (req,res)=>{

await Question.find({},(err,quests)=>{
    if(err){
        res.json({"Error":err}).status(404)
        console.log(err);
    }else{
        res.json(quests);
    }
});
}

// Post a question
exports.post_question = async (req,res)=>{
    let date = new Date().toString();
        const newQuestion = new Question({
        question: req.body.question,
        dateCreated: date
        // createdBy: 
        });
    newQuestion.save()
    .then((postedQuestion)=>{
        res.json({"msg":"Posted!",
            "Qn":postedQuestion.question,
            dateCreated: date,
            // createdBy:
        }).status(201);
    })
    .catch((err)=>{
        res.json({success:false,msg: err.message + console.log(err)})
    })
}

//search for a question in database with a particular keyword

exports.search_question = async (req,res)=>{
    let q = [], keyword = req.params.keyword;

    Question.find({},{question:1},(err,doc)=>{
        if(err) {
            res.json(err).status(404)
        }
        else{                
        q = doc.filter(el=>{
            let reg = new RegExp(keyword,'gi')
            return el.question.match(reg)!==null
        })
        if(q.length==0){
            return res.json({msg:`Sorry, no '${keyword}' questions found! Try again!`})
        }
        res.json(q).status(200)
    }  
     
    })  
}

// most answered question
exports.most_answers = async (req,res)=>{

    try{
        let mostAnswered = [];
        mostAnswered.length = 3;

          await Question.find({}, (err,ans)=>{

       mostAnswered = ans.sort((a,b)=>{
           return b.answer_info.answers.length - a.answer_info.answers.length}).question

       })

       res.send(mostAnswered)
   }
   catch(err){
       console.log(err);
   }

   } 