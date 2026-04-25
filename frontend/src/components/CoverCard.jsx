import { Trash2Icon, PenSquareIcon } from 'lucide-react';
import React from 'react';
import { Link, useNavigate } from 'react-router';

const CoverCard = ({ quiz }) => {
  const navigate = useNavigate();
  return (
    <Link 
      to={`/quiz/${quiz._id}`}
      className="card bg-base-200 hover:bg-base-300 hover:shadow-xl transition-all duration-200 border-t-4 border-secondary">
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
                navigate(`/edit/${quiz._id}`);
              }}
            >
              <PenSquareIcon className="size-4"/>
            </button>
            <button 
              className="btn btn-ghost btn-xs text-error"
              onClick={async (e) => {
                e.preventDefault();
                await fetch(`http://localhost:4000/api/v1/quizzes/${quiz._id}`, { method: "DELETE" });
                window.location.reload();
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

export default CoverCard;