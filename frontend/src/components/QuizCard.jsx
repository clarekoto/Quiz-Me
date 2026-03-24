import React, {useState} from 'react';

const QuizCard = ({ question }) => {
    const [flipped, setFlipped] = useState(false); 
    let content;
    if (flipped) {
        content = question.answer
    } else {
        content = question.question
    }
    return (
        <div className="card bg-base-300 w-full max-w-3xl min-w-xl h-[50vh] mx-auto border-2 border-secondary"
        onClick={() => setFlipped(!flipped)}>
            <div className="card-body items-center text-center min-h-48 justify-center">
                <p className="text-sm uppercase tracking-wide text-base-content/50 mb-2">
                {flipped ? "Answer" : "Question" }
                </p>
                <p className="text-s">
                    {content}
                </p>
                <p className="text-sm text-base-content/40 mt-4">Click to flip</p>
            </div>
        </div>
    )
}

export default QuizCard