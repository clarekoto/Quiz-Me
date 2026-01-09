import { Quiz } from "../models/quiz.model.js";

const createQuiz = async(req, res) => {
    try {
        const { title, questions, createdBy } = req.body;
        // const userId = req.user._id;

        if (!createdBy) {
            return res.status(400).json({
                message: "createdBy is required"
            });
        }

        // validate quiz
        if (!title || !questions || questions.length === 0) {
            return res.status(400).json({
                    message: "Title and at least one question are required"
                });
        }

        // validate questions
        const invalidQuestion = questions.find(q => !q.question || !q.answer);
        if (invalidQuestion) {
            return res.status(400).json({
                message: "Each question requires both question and answer"
            });
        }

        // save quiz
        const quiz = await Quiz.create({
            title,
            createdBy: createdBy,//userId,
            questions
        });

        res.status(201).json({
            message: "Quiz created successfully",
            quiz: {
                id: quiz._id,
                title: quiz.title,
                createdBy: quiz.createdBy,
                questions: quiz.questions,
                createdAt: quiz.createdAt,
            }
        });

    } catch (error) {
        console.error("Error creating a quiz!!")
        res.status(500).json({ message: "Internal server error", error: error.message})
    }
};


const getAllQuizes = async(req, res) => {
    try {
        const quiz = await Quiz.find().sort({updatedAt: -1}); // Show newest first
        res.status(200).json(quiz)
    } catch (error) {
        console.error("Error in getAllQuizzes")
        res.status(500).json({message : "Internal server error", error: error.message})
    }
}

const updateQuiz = async(req, res) => {
    try {
        const {title, questions} = req.body
        const updated = await Quiz.findByIdAndUpdate(req.params.id,{title, questions}, {
            new: true,
        });
        if (!updated) {
            return res.status(404).json({message: "Note not found"})
        }
        res.status(200).json(updated)
    } catch (error) {
        console.error("Error in updateQuiz")
        res.status(500).json({message : "Internal server error", error: error.message})
    }   
}

const deleteQuiz = async(req, res) => {
    try {
        
        const deleted = await Quiz.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({message: "Note not found"})
        }
        res.status(200).json(deleted)
    } catch (error) {
        console.error("Error in deleteQuiz")
        res.status(500).json({message : "Internal server error", error: error.message})
    }
}

const getQuizById = async(req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id)
        if(!quiz){
            return res.status(404).json({message: "Quiz not found"})
        }
        res.json(quiz)
    } catch (error) {
        console.error("Error fetching quiz")
        res.status(500).json({message : "Internal server error", error: error.message})
    }
}

export {
    createQuiz,
    getAllQuizes,
    deleteQuiz,
    updateQuiz,
    getQuizById,
}