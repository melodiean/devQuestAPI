const express = require("express");

const router = express.Router();

const { auth } = require("../controllers/auth");

const {
  get_questions,
  post_question,
  search_question,
  most_answers,
  user_questions,
  get_question,
  delete_question,
} = require("../controllers/question.controllers");
const {
  post_answer,
  comment_answer,
  // vote_answer,
  mark_answer,
  update_answer,
} = require("../controllers/answer.controller");

// Routes
router.get("/questions", get_questions);

router.post("/questions", auth, post_question);

router.get("/questions/search/:keyword", search_question);

router.get("/questions/popular_questions", most_answers);

router.get("/questions/profile/:userId", auth, user_questions);

router.get("/questions/:questionId", get_question);

router.delete("/questions/:questionId", auth, delete_question);

router.post("/questions/:questionId/answers", auth, post_answer);

router.put(
  "/questions/:questionId/answers/:answerId/comments",
  auth,
  comment_answer
);

// router.put('/questions/:questionId/answers/:answerId/:vote', vote_answer)

router.put("/questions/:questionId/answers/:answerId/mark", auth, mark_answer);

router.put(
  "/questions/:questionId/answers/:answerId/update",
  auth,
  update_answer
);

module.exports = router;
