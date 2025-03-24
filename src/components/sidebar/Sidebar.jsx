import { useState } from "react";

const SideBar = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    priority: "All",
    completed: "All",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
    onFilterChange({ ...filters, [name]: value });
  };

  const clearFilters = () => {
    const defaultFilters = { priority: "All", completed: "All", startDate: "", endDate: "" };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-72">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>

      <label className="block text-sm font-medium text-gray-700">Priority</label>
      <select
        name="priority"
        value={filters.priority}
        onChange={handleChange}
        className="w-full mt-1 p-2 border rounded-md"
      >
        <option value="All">All Priorities</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <label className="block mt-4 text-sm font-medium text-gray-700">Completed</label>
      <select
        name="completed"
        value={filters.completed}
        onChange={handleChange}
        className="w-full mt-1 p-2 border rounded-md"
      >
        <option value="All">All</option>
        <option value="true">Completed</option>
        <option value="false">Pending</option>
      </select>

      <label className="block mt-4 text-sm font-medium text-gray-700">Date Range</label>
      <input
        type="date"
        name="startDate"
        value={filters.startDate}
        onChange={handleChange}
        className="w-full mt-1 p-2 border rounded-md"
      />
      <input
        type="date"
        name="endDate"
        value={filters.endDate}
        onChange={handleChange}
        className="w-full mt-2 p-2 border rounded-md"
      />

      <button
        onClick={clearFilters}
        className="w-full mt-4 bg-gray-200 text-gray-700 p-2 rounded-md hover:bg-gray-300"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default SideBar;
