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
        });
    })

    .catch((err)=>{
        res.json({success:false,msg: err.message + console.log(err)})
    })
}

//search for a question in database

// exports.search_question = async (req,res,next)=>{
//     let q = []
//    q = await Question.find({},{question:1,_id:0},(err,doc)=>{
//         if(err) {
//             res.json(err)
//         }
//         else{
//              res.send(doc) 
//         }
//     })
    
//    q.filter(el => {
//         let keyword = req.params.keyword

//         let reg = new RegExp(keyword,'gi')
//         if(el.question.match(reg)!==null){
//             res.send(el)
//         }
//         res.json({"msg":`Sorry no '${keyword}' questions found! Try again`})
//     });

//     // res.end()

// }