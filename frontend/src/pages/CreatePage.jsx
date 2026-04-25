import React, { useState, useEffect } from 'react';
import { ArrowLeftIcon, PlusIcon, TrashIcon } from 'lucide-react';
import { Link, useNavigate, useParams } from "react-router";

const CreatePage = () => {
    const { id } = useParams();
    const isEditing = !!id;

    const[title, setTitle] = useState("");
    const[content,setContent] = useState("");
    const [questions, setQuestions] = useState([
        { id: Date.now(), question: "", answer: ""}
    ]);
    const [loading, setLoading] = useState(false);
    const[error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (!isEditing) return;
        const fetchQuiz = async () => {
            try {
                const res = await fetch(`http://localhost:4000/api/v1/quizzes/${id}`);
                const data = await res.json();
                setTitle(data.title);
                setContent(data.description || "");
                setQuestions(data.questions.map(q => ({ ...q, id: q._id })));
            } catch {
                setError("Failed to load quiz");
            }
        };
        fetchQuiz();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent refresh
        console.log(title);
        console.log(questions);
        setLoading(true);
        setError("");

        if (!title.trim()) {
            setError("Title is required");
            setLoading(false);
            return;
        }

        if (questions.length === 0) {
            setError("At least one question is required");
            setLoading(false);
            return;
        }

        const invalidQuestion = questions.find(q => !q.question.trim() || !q.answer.trim());
        if (invalidQuestion) {
            setError("All questions must have both a question and an answer");
            setLoading(false);
            return;
        }

        try {
            const url = isEditing
                ? `http://localhost:4000/api/v1/quizzes/${id}`
                : "http://localhost:4000/api/v1/quizzes";

            const response = await fetch(url, {
                method: isEditing ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    description: content,
                    questions: questions.map(q => ({
                        question: q.question,
                        answer: q.answer
                    })),
                    createdBy: "temp-user-id"
                })
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || `Failed to ${isEditing ? "update" : "create"} quiz`);
            }
            navigate("/");
    } catch (error) {
        console.error("Error creating quiz:", error);
        setError(error.message);
    } finally {
        setLoading(false);
    }
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
            <h2 className="card-title text-3xl mb-2">{isEditing ? "Edit Quiz" : "Create New Quiz"}</h2>
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
                    </form>
                </div>
            
            </div>

            <div className="divider text-2xl">QUESTIONS</div>

            {questions.map((q, index) => (
                <div key={q.id} className="card bg-base-100 mb-4">
                    <div className="card-body">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Question</h3>
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
                                value={q.question} 
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
                                value={q.answer} 
                                onChange={(e) => updateQuestion(q.id, 'answer', e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            ))}

            <button 
                type="button"
                onClick={addQuestion}
                className="btn btn-outline w-full mb-6"
            >
                <PlusIcon className="size-5"/>
                Add Question
            </button>

            <div className="flex justify-end ">
                <button 
                    type="button"
                    onClick={handleSubmit} 
                    className="btn text-xl btn-primary" 
                    disabled={loading}
                >
                    {loading ? (isEditing ? "Saving..." : "Creating...") : (isEditing ? "Save Changes" : "Create Quiz")}
                </button>
            </div>
        </div>
    </div>
  </div>
  
}

export default CreatePage