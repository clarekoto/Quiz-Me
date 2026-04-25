
import { useState } from 'react';

const QuizCard = ({ question }) => {
    const [flipped, setFlipped] = useState(false);
    return (
        <div
            className="w-full max-w-3xl min-w-xl h-[50vh] mx-auto cursor-pointer"
            style={{ perspective: '1000px' }}
            onClick={() => setFlipped(!flipped)}
        >
            <div
                style={{
                    transition: 'transform 0.6s',
                    transformStyle: 'preserve-3d',
                    transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                }}
            >
                {/* Front — Question */}
                <div
                    className="card bg-base-300 border-2 border-secondary absolute w-full h-full"
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    <div className="card-body items-center text-center justify-center">
                        <p className="text-xl uppercase tracking-wide text-base-content/50 mb-2">Question</p>
                        <p className="text-xl">{question.question}</p>
                        <p className="text-sm text-base-content/40 mt-4">Click to flip</p>
                    </div>
                </div>

                {/* Back — Answer */}
                <div
                    className="card bg-base-300 border-2 border-secondary absolute w-full h-full"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                    <div className="card-body items-center text-center justify-center">
                        <p className="text-xl uppercase tracking-wide text-base-content/50 mb-2">Answer</p>
                        <p className="text-xl">{question.answer}</p>
                        <p className="text-sm text-base-content/40 mt-4">Click to flip</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuizCard