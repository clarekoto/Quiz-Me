import express from "express";
import cors from "cors";

const app = express();

// middleware
app.use(express.json());
app.use(cors());

import userRouter from "./routes/user.route.js";
import quizRouter from "./routes/quiz.route.js";


app.use("/api/v1/users", userRouter);
app.use("/api/v1/quizzes", quizRouter);

export default app;