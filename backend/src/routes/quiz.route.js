import { Router } from "express";
import { createQuiz, getAllQuizes, deleteQuiz, updateQuiz } from "../controllers/quiz.controller.js"

const router = Router();

// "/create"?
router.post("/", createQuiz);
router.get("/", getAllQuizes);
router.put("/:id", updateQuiz);
router.delete("/:id", deleteQuiz);

export default router;