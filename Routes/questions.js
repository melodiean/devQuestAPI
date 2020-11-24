const express = require('express')

const router = express.Router()

const {get_questions, get_question, post_question} = require('../Controllers/question.controllers')

// Routes
router.get('/questions', get_questions)

router.get('/questions/:questionId', get_question)

router.post('/questions', post_question)


module.exports = router;