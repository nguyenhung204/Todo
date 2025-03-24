import { useEffect, useMemo, useRef, useState } from "react";
import TaskCard from "../components/taskcard/Taskcard"
import SideBar from "../components/sidebar/Sidebar";

function ListTask() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filters, setFilters] = useState({
    priority: "All",
    completed: "All",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    fetch(`https://671891927fc4c5ff8f49fcac.mockapi.io/test`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
        setFilteredTasks(data);
        console.log("Tasks fetched:", data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  };

  const handleTaskStatusChange = (taskId, newStatus) => {
    // Find the task to update
    const taskToUpdate = tasks.find(task => task.id == taskId); // Use loose equality to match regardless of type
    
    if (!taskToUpdate) {
      console.error(`Task with ID ${taskId} not found`);
      return;
    }
    
    const updatedTask = { ...taskToUpdate, completed: newStatus };

    const apiTaskId = Number(taskId);
    
    fetch(`https://671891927fc4c5ff8f49fcac.mockapi.io/test/${apiTaskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("Task updated:", data);
        
        // Update local state
        const updatedTasks = tasks.map(task => 
          task.id == taskId ? {...task, completed: newStatus} : task
        );
        
        setTasks(updatedTasks);
        setFilteredTasks(prev => 
          prev.map(task => task.id == taskId ? {...task, completed: newStatus} : task)
        );
      })
      .catch(error => {
        console.error("Error updating task:", error);
        
        const updatedTasks = tasks.map(task => 
          task.id == taskId ? {...task, completed: newStatus} : task
        );
        setTasks(updatedTasks);
        setFilteredTasks(prev => 
          prev.map(task => task.id == taskId ? {...task, completed: newStatus} : task)
        );
      });
  };
  const handleFilterChange = (e) => {
    setFilters(e);

    let result = [...tasks];

    if (e.priority !== "All") {
      console.log(e.priority);
      result = result.filter((task) => task.priority === e.priority);
    }
    if (e.completed !== "All") {
      const isCompleted = e.completed === "true";
      result = result.filter((task) => task.completed === isCompleted);
    }
    if (e.startDate && e.endDate) {
      result = result.filter((task) => {
        return new Date(task.due_date) >= new Date(e.startDate) && 
               new Date(task.due_date) <= new Date(e.endDate);
      });
    }
    setFilteredTasks(result);
  };

  return (
    <div className="flex">
      <SideBar onFilterChange={handleFilterChange} />
      <div className="flex-1 p-4">               
                {Array.isArray(filteredTasks) && filteredTasks.length > 0 ? (
                    filteredTasks.map((task) => (
                        <TaskCard 
                          key={task.id} 
                          tasks={task} 
                          onStatusChange={handleTaskStatusChange}
                          />
                    ))
                ) : (
                    <p>
                        {Array.isArray(tasks) && tasks.length > 0 
                            ? "No tasks match your filters" 
                            : "Loading tasks..."}
                    </p>
                )}
            </div>
    </div>
  )

}
export default ListTask