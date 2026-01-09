import { Trash2Icon, PenSquareIcon } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router';

const QuizCard = ({ quiz }) => {
  return (
    <Link 
      to={`/quiz/${quiz._id}`}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#000456]">
      <div className="card-body">
        <h3 className="card-title text-base-content">{quiz.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{quiz.content}</p>
        <div className="card-actions justify-between items-center mt-4"> 
          <span className="text-sm text-base-content/60">
            {new Date(quiz.createdAt).toLocaleDateString()}
          </span>
          <div className="flex items-center gap-1">
            <button 
              className="btn btn-ghost btn-xs"
              onClick={(e) => {
                e.preventDefault(); 
              }}
            >
              <PenSquareIcon className="size-4"/>
            </button>
            <button 
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => {
                e.preventDefault(); // Prevent navigation when clicking delete
                // Add your delete logic here
              }}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default QuizCard;