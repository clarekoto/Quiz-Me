import React, { useState } from 'react';
import { ArrowLeftIcon } from 'lucide-react';
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
        console.log(questions);
    };
    
  return <div className="min-h-screen bg-base-200">
    <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
            <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5"/>
            Back Home
            </Link>
            <h2 className="card-title text-2xl mb-4">Create New Quiz</h2>
            <div className="card bg-base-100">
                <div className="card-body">
                    
                    <form onSubmit={handleSubmit}>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Title</span>
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
                                <span className="label-text">Description</span>
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
                                { loading ? "Creating..." : "Create Note"}
                            </button>
                        </div>
                    </form>

                      {/* <form onSubmit={handleSubmit}>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Question</span>
                            </label>
                            <input type="text"
                                placeholder="What is your Question?"
                                className="input input-bordered"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                />
                        </div>

                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Answer</span>
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
                                { loading ? "Creating..." : "Create Note"}
                            </button>
                        </div> */}
                    {/* </form> */}
                </div>

            </div>
        </div>
    </div>
  </div>
  
}

export default CreatePage