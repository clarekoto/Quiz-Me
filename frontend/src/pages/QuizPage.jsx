import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router'
import axios from 'axios'
import CoverCard from '../components/CoverCard'

const QuizPage = () => {
  const {id} = useParams(); // useParamss() fetches the ID from the URL, this is identified using ":"
  const[quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchQuiz = async() => {
      try {
        const res = await axios.get(`http://localhost:4000/api/v1/quizzes/${id}`)
        setQuiz(res.data)
      }catch (err) {
        setError("Failed to load quiz");
      } finally {
        setLoading(false)
      }
      
    }
    fetchQuiz();
  }, [id])

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-error">{error}</div>;
  

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">{quiz.title}</h1>
      <CoverCard question = {quiz.questions[currentIndex]} />
      <div className="flex justify-center gap-4 mt-8">
        <button
          className="btn btn-outline"
          onClick={() => setCurrentIndex(i => i - 1)}
          disabled={currentIndex === 0}
        >
          Previous
        </button>
        <button
          className="btn btn-primary"
          onClick={() => setCurrentIndex(i => i + 1)}
          disabled={currentIndex === quiz.questions.length - 1}
        >
          Next
        </button>
        </div>
      </div>
    </div>
    
  )
}

export default QuizPage