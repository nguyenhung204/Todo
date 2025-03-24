import { useEffect, useState } from "react";

function TaskForm() {
    const [task, setTask] = useState({
        title: "",
        description: "",
        due_date: "",
        priority: "Medium",
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setTask({ ...task, [name]: value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
            fetch(`https://671891927fc4c5ff8f49fcac.mockapi.io/test`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(task),
            })
              .then((response) => response.json())
              .then((data) => {
                console.log("Task created:", data);
              })
              .catch((error) => {
                console.error("Error creating task:", error);
              });
        console.log("Task Created: ", task);
        setTask({
          title: "",
          description: "",
          due_date: "",
          priority: "Medium",
        });
      };
    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
            <label className="block mb-2 text-sm font-medium text-gray-700">
                Title <span className="text-red-500">*</span>
                <input
                    type="text"
                    name="title"
                    value={task.title}
                    onChange={handleChange}
                    required
                    className="w-full mt-1 p-2 border rounded-md"
                />
            </label>

            <label className="block mb-2 text-sm font-medium text-gray-700">
                Description
                <textarea
                    name="description"
                    value={task.description}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border rounded-md"
                ></textarea>
            </label>

            <label className="block mb-2 text-sm font-medium text-gray-700">
                Due Date
                <input
                    type="date"
                    name="due_date"
                    value={task.due_date}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border rounded-md"
                />
            </label>

            <label className="block mb-4 text-sm font-medium text-gray-700">
                Priority
                <select
                    name="priority"
                    value={task.priority}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border rounded-md"
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </label>

            <button
                type="submit"
                className="w-full bg-blue-500 text-black p-2 rounded-md hover:bg-blue-600"
            >
                Create Task
            </button>
        </form>


    )
}
export default TaskForm