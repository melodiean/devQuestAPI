const mongoose = require("mongoose");

// Question Schema
const questionSchema =
 new mongoose.Schema({
    question: {
        type:String,
        required: true
    },
    dateCreated:
    {
        type:Date
    },
    createdBy:{
        type:String
    },  
    answers:[{
        answer: String,
        best_answer: {
            type: Boolean,
            default:false,
            required: false
        }
    }]
}
);

// Question model to be exported
const Question = mongoose.model('Question', questionSchema)

module.exports = Question