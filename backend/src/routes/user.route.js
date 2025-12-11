import { Router } from 'express';
import { registerUser, loginUser, logoutUser } from "../controllers/user.controller.js";
import { createQuiz } from "../controllers/quiz.controller.js";

const router = Router();

// use post instead of route ?
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
// router.route("/create").post(createQuiz);

export default router;