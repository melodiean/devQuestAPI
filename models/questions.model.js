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
        type:Date,
        default: Date.now()
    },
    createdBy:{// indicates user who posted the question
        type:String, 
        required: false
    },  
    answer_info:[{
        answer: String,
        createdBy: String, // user that posted the answer
        comments: [{
            type: String,
            comment: String,
            createdBy:  // indicates user who posted the comment
            {
                type: String,
                required: false
            },
            required: false
        }],
        vote:{
            upvote:{
                type: Boolean,
                default: false,
                required: false
            },
            downvote:{
                type: Boolean,
                default: false,
                required: false
            }
        },
        // here an answer can be marked as the preferred one
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