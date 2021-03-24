const express = require("express");

const router = express.Router();

const { auth } = require("../controllers/auth");

const {
  getQuestions,
  postQuestion,
  searchQuestion,
  mostAnswers,
  userQuestions,
  getQuestion,
  deleteQuestion,
} = require("../controllers/question.controllers");
const {
  postAnswer,
  commentAnswer,
  // voteAnswer,
  markAnswer,
  updateAnswer,
} = require("../controllers/answer.controller");

// Routes
router.get("/questions", getQuestions);

router.post("/questions", auth, postQuestion);

router.get("/questions/search/:keyword", searchQuestion);

router.get("/questions/popular", mostAnswers);

router.get("/questions/profile/:userId", userQuestions);

router.get("/questions/:questionId", getQuestion);

router.delete("/questions/:questionId", auth, deleteQuestion);

router.post("/questions/:questionId/answers", auth, postAnswer);

router.put(
  "/questions/:questionId/answers/:answerId/comments",
  auth,
  commentAnswer
);

// router.put('/questions/:questionId/answers/:answerId/:vote', vote_answer)

router.put("/questions/:questionId/answers/:answerId/mark", auth, markAnswer);

router.put(
  "/questions/:questionId/answers/:answerId/update",
  auth,
  updateAnswer
);

module.exports = router;
