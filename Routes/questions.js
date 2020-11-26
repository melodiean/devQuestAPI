const express = require('express')

const router = express.Router()

const {get_questions, post_question} = require('../Controllers/question.controllers')

// Routes
router.get('/questions', get_questions)

router.post('/questions', post_question)

// router.get('/questions/all', get_all_questions)

module.exports = router;