const express = require('express')

const router = express.Router()

const {get_questions, post_question, search_question, most_answers} = require('../Controllers/question.controllers')

// Routes
router.get('/questions', get_questions)

router.post('/questions', post_question)

// router.post('/questions/questionId/answers', post_answer)

router.get('/questions/search/:keyword', search_question)

router.get('/questions/popular_questions',most_answers)

module.exports = router;