import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Edit, Trash, Calendar, AlertCircle } from "lucide-react";

function DetailTasks() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTask = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`https://671891927fc4c5ff8f49fcac.mockapi.io/test/${id}`);
                if (!response.ok) {
                    throw new Error('Task not found');
                }
                const data = await response.json();
                setTask(data);
                setEditedTask(data);
            } catch (err) {
                setError(err.message);
                console.error("Error fetching task:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTask();
    }, [id]);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedTask(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`https://671891927fc4c5ff8f49fcac.mockapi.io/test/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editedTask)
            });

            if (!response.ok) {
                throw new Error('Failed to update task');
            }

            const updatedTask = await response.json();
            setTask(updatedTask);
            setIsEditing(false);
        } catch (err) {
            console.error("Error updating task:", err);
            // Still update UI even if API fails
            setTask(editedTask);
            setIsEditing(false);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                const response = await fetch(`https://671891927fc4c5ff8f49fcac.mockapi.io/test/${id}`, {
                    method: 'DELETE'
                });

                if (!response.ok) {
                    throw new Error('Failed to delete task');
                }

                navigate('/');
            } catch (err) {
                console.error("Error deleting task:", err);
                alert('Failed to delete task. Please try again.');
            }
        }
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Loading task details...</div>;
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <AlertCircle className="text-red-500 mb-4 w-16 h-16" />
                <h2 className="text-2xl font-bold mb-2">Error</h2>
                <p className="text-gray-600 mb-4">{error}</p>
                <button 
                    onClick={() => navigate('/')}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Back to Tasks
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex items-center mb-6">
                <button 
                    onClick={() => navigate('/')}
                    className="flex items-center text-gray-600 hover:text-gray-900"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Tasks
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">{task?.title}</h1>
                    <div className="flex space-x-2">
                        <button 
                            onClick={handleEditToggle}
                            className="p-2 rounded-full hover:bg-gray-100"
                            title="Edit task"
                        >
                            <Edit className="w-5 h-5 text-blue-500" />
                        </button>
                        <button 
                            onClick={handleDelete}
                            className="p-2 rounded-full hover:bg-gray-100"
                            title="Delete task"
                        >
                            <Trash className="w-5 h-5 text-red-500" />
                        </button>
                    </div>
                </div>

                {isEditing ? (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={editedTask.title}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                name="description"
                                value={editedTask.description}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md h-32"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                            <input
                                type="date"
                                name="due_date"
                                value={editedTask.due_date}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                            <select
                                name="priority"
                                value={editedTask.priority}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md"
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                        <div>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="completed"
                                    checked={editedTask.completed}
                                    onChange={(e) => setEditedTask(prev => ({
                                        ...prev,
                                        completed: e.target.checked
                                    }))}
                                    className="mr-2"
                                />
                                <span className="text-sm font-medium text-gray-700">Mark as completed</span>
                            </label>
                        </div>
                        <div className="flex justify-end space-x-2 mt-6">
                            <button
                                onClick={() => {
                                    setIsEditing(false);
                                    setEditedTask(task);
                                }}
                                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-blue-500 text-black rounded-md hover:bg-blue-600"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-lg font-semibold mb-2">Description</h2>
                            <p className="text-gray-700">{task?.description || "No description provided"}</p>
                        </div>
                        
                        <div className="flex items-center text-gray-700">
                            <Calendar className="w-5 h-5 mr-2" />
                            <span>Due: {task?.due_date || "No due date"}</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-4">
                            <div>
                                <span className="text-sm font-medium text-gray-500">Priority</span>
                                <span
                                    className={`px-3 py-1 ml-2 text-xs font-semibold rounded-full ${
                                        task?.priority === "High"
                                            ? "bg-red-200 text-red-800"
                                            : task?.priority === "Medium"
                                            ? "bg-yellow-200 text-yellow-800"
                                            : "bg-green-200 text-green-800"
                                    }`}
                                >
                                    {task?.priority}
                                </span>
                            </div>
                            
                            <div>
                                <span className="text-sm font-medium text-gray-500">Status</span>
                                <span
                                    className={`px-3 py-1 ml-2 text-xs font-semibold rounded-full ${
                                        task?.completed
                                            ? "bg-green-200 text-green-800"
                                            : "bg-gray-200 text-gray-800"
                                    }`}
                                >
                                    {task?.completed ? "Completed" : "Pending"}
                                </span>
                            </div>
                        </div>
                        
                        {task?.created_at && (
                            <div className="text-sm text-gray-500">
                                Created on: {new Date(task.created_at).toLocaleDateString()}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default DetailTasks;