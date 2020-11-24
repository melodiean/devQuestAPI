const mongoose = require("mongoose");

// Question Schema
const questionSchema = new mongoose.Schema({
    question: {
        type:String
    },
    answer_info:{
        answers:[{
            answer:{
                type:String
            },
            best_answer:{
                type: Boolean,
                required:false
            }
        }]
        }

    }
);

// Question model to be exported
const Question = mongoose.model('Question', questionSchema)

module.exports = Question