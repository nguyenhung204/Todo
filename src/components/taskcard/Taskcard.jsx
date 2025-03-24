import { CheckCircle, Calendar } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function TaskCard ({tasks, onStatusChange}) {
  const navigate = useNavigate();
    const [completed, setCompleted] = useState(tasks.completed);
    const toggleComplete = (e) => {
      e.stopPropagation();
      const newStatus = !completed;
      setCompleted(newStatus);

      if (onStatusChange) {
        onStatusChange(tasks.id, newStatus);
      }
    };

    const handleCardClick = () => {
      navigate(`/task/${tasks.id}`);
    };
    return (
        <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-md mb-4"
        onClick={handleCardClick}>
      <div>
        <h3 className="text-lg font-semibold">{tasks.title}</h3>

        <p className="text-gray-500 text-sm">{tasks.description}</p>

        <div className="flex items-center text-gray-500 text-sm mt-2">
          <Calendar className="w-4 h-4 mr-1" />
          {tasks.due_date}
        </div>
        
      </div>

      <div className="flex items-center space-x-4">
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full ${
            tasks.priority === "High"
              ? "bg-red-200 text-red-800"
              : tasks.priority === "Medium"
              ? "bg-yellow-200 text-yellow-800"
              : "bg-green-200 text-green-800"
          }`}
        >
          {tasks.priority}
        </span>
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={completed}
            onChange={toggleComplete}
            className="hidden"
          />
          <div
            className={`w-5 h-5 border-2 rounded-md flex items-center justify-center ${
              completed ? "bg-blue-500 border-blue-500" : "border-gray-300"
            }`}
          >
            {completed && <CheckCircle className="w-4 h-4 text-white" />}
          </div>
          <span className="ml-2 text-gray-700">
            {completed ? "Completed" : "Mark Complete"}
          </span>
        </label>
      </div>
    </div>
    )
}
export default TaskCard;