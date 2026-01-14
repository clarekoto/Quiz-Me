import React, { useState } from 'react';
import { ArrowLeftIcon, PlusIcon, TrashIcon } from 'lucide-react';
import { Link, useNavigate } from "react-router";

const CreatePage = () => {
    const[title, setTitle] = useState("");
    const[content,setContent] = useState("");
    const [questions, setQuestions] = useState([
        { id: Date.now(), question: "", answer: ""}
    ]);
    const [loading, setLoading] = useState(false);
    const[error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault(); // prevent refresh
        console.log(title);
        console.log(content);
        console.log(questions);
    };

    const addQuestion = () => {
        setQuestions([...questions, { id: Date.now(), question: "", answer: "" }]);
    };

    const removeQuestion = (id) => {
        if (questions.length > 1) {
            setQuestions(questions.filter((q) => q.id !== id));
        }
    };

    const updateQuestion = (id, field, value) => {
        setQuestions(
            questions.map((q) =>
                q.id === id ? { ...q, [field]: value } : q
            )
        );
    };
    
  return <div className="min-h-screen bg-base-200">
    <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
            <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5"/>
            Back Home
            </Link>
            <h2 className="card-title text-3xl mb-2">Create New Quiz</h2>
            <div className="card bg-base-100 mb-6">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text text-xl">Title</span>
                            </label>
                            <input type="text"
                                placeholder="Quiz Title"
                                className="input input-bordered"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                />
                        </div>

                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text text-xl">Description</span>
                            </label>
                            <textarea
                            placeholder="Write your description here..."
                            className="textarea textarea-bordered h-32"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            />
                        </div>

                        {/* <div className="card-action justify-end">
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                { loading ? "Creating..." : "Create Quiz"}
                            </button>
                        </div> */}
                    </form>
                </div>
            
            </div>

            <div className="divider text-2xl">QUESTIONS</div>

            {questions.map((q, index) => (
                <div key={q.id} className="card bg-base-100 mb-4">
                    <div className="card-body">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Question {index + 1}</h3>
                            {questions.length > 1 && (
                                <button 
                                    type="button"
                                    onClick={() => removeQuestion(q.id)}
                                    className="btn btn-ghost btn-sm text-error"
                                >
                                    <TrashIcon className="size-4"/>
                                    Remove
                                </button>
                            )}
                        </div>

                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text text-xl">Question</span>
                            </label>
                            <input type="text"
                                placeholder="Question"
                                className="input input-bordered"
                                value={q.question}  // ✅ CORRECT
                                onChange={(e) => updateQuestion(q.id, 'question', e.target.value)}
                            />
                        </div>

                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text text-xl">Answer</span>
                            </label>
                            <textarea
                                placeholder="Write your answer here..."
                                className="textarea textarea-bordered h-32"
                                value={q.answer}  // ✅ CORRECT
                                onChange={(e) => updateQuestion(q.id, 'answer', e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            ))}

            {/* ADD THIS - Add Question Button */}
            <button 
                type="button"
                onClick={addQuestion}
                className="btn btn-outline btn-primary w-full mb-6"
            >
                <PlusIcon className="size-5"/>
                Add Question
            </button>

            {/* ADD THIS - Submit Button */}
            <div className="flex justify-end">
                <button 
                    type="button"
                    onClick={handleSubmit} 
                    className="btn btn-primary" 
                    disabled={loading}
                >
                    {loading ? "Creating..." : "Create Quiz"}
                </button>
            </div>
            {/* <div className="card bg-base-100 mb-6">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text text-xl">Question</span>
                            </label>
                            <input type="text"
                                placeholder="Question"
                                className="input input-bordered"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                />
                        </div>

                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text text-xl">Answer</span>
                        </label>
                        <textarea
                        placeholder="Write your answer here..."
                        className="textarea textarea-bordered h-32"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        />
                    </div>

                    <div className="card-action justify-end">
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            { loading ? "Creating..." : "Create Quiz"}
                        </button>
                    </div>
                </form>
                
                </div>
            </div> */}
        </div>
    </div>
  </div>
  
}

export default CreatePage