const express = require('express')

const router = express.Router()

const {get_questions, post_question, post_answer, search_question} = require('../Controllers/question.controllers')

// Routes
router.get('/questions', get_questions)

router.post('/questions', post_question)

router.post('/questions/questionId/answers', post_answer)

// router.get('/questions/search/:keyword', search_question)

module.exports = router;