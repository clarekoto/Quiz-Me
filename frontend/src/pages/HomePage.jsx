import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import axios from "axios"
import toast from "react-hot-toast";

import QuizCard from '../components/QuizCard';
const HomePage = () => {
    const [quiz, setQuiz] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const res = await axios.get("http://localhost:4000/api/v1/quizzes");
                console.log(res.data);
                setQuiz(res.data);
                setLoading(false);
            } catch (error) {
                console.log("Error fetching quizzes");
            } finally {
                setLoading(false);
            }
        }

        fetchQuizzes()

    }, [])
  return (
    <div className="min-h-screen">
    <Navbar />
    <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <div className="text-center text-primary py-10">Loading notes...</div>}
        {quiz.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {quiz.map(quiz =>(
                    <QuizCard key={quiz._id} quiz={quiz}/>
                ))}
                </div>
        )}
    </div>
    </div>
    
  )
}

export default HomePage