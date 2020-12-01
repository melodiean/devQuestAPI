const express = require('express')

const router = express.Router()

const { auth } = require('../controllers/auth')

const {get_questions, post_question,search_question, most_answers, delete_question} = require('../controllers/question.controllers')
const { post_answer, comment_answer } = require('../controllers/answer.controller')

// Routes
router.get('/questions', get_questions)

router.post('/questions', auth, post_question)

router.post('/questions/:questionId/answers', auth, post_answer)

// router.post('/questions/:questionId/answers/:answerId/comments', auth, comment_answer)

router.get('/questions/search/:keyword', search_question)

router.get('/questions/popular_questions',most_answers)

router.delete('/questions/:id', delete_question)

module.exports = router;