import mongoose, { Schema } from "mongoose";

const questionSchema = new Schema(
    {
        question: {
            type: String,
            required: true,
            maxLength: 350,
            minLength: 1,
        },

        answer: {
            type: String,
            required: true,
            maxLength: 350,
            minLength: 1,
        }
    }
);

const quizSchema = new Schema(
    {
        title: {
            type: String,
            required : true,
            maxLength: 100,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },

        questions: [questionSchema]
    },

    {
        timestamps: true
    }
);

export const Quiz = mongoose.model("Quiz", quizSchema);
export const Question = mongoose.model("Question", questionSchema);