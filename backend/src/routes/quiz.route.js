import { Router } from "express";
import { createQuiz } from "../controllers/quiz.controller.js"

const router = Router();

router.post("/create", createQuiz);

export default router;