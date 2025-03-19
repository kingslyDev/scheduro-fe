"use client";
import { useState, useEffect } from "react";
import AddTaskSidebar from "./AddTaskSidebar";
import DetailTaskSidebar from "./DetailTaskSidebar";

const statusColors = {
  todo: "bg-[#354273] text-white",
  ongoing: "bg-[#5171C7] text-white",
  done: "bg-[#879ADA] text-white",
};

const TaskTable = () => {
  const [tasks, setTasks] = useState([]);
  const [isAddSidebarOpen, setIsAddSidebarOpen] = useState(false);
  const [isDetailSidebarOpen, setIsDetailSidebarOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = (task) => {
    setTasks((prevTasks) => {
      const newTasks = [...prevTasks, { id: prevTasks.length + 1, ...task }];
      localStorage.setItem("tasks", JSON.stringify(newTasks));
      return newTasks;
    });
  };

  const openTaskDetails = (task) => {
    setSelectedTask(task);
    setIsDetailSidebarOpen(true);
  };

  return (
    <div className="overflow-x-scroll p-4">
      <table className="w-full min-w-[600px] table-auto border border-gray-200 rounded-lg">
        <thead>
          <tr className="bg-[#E6EEFF]">
            <th className="text-left py-3 px-4 font-medium text-gray-700">
              Title
            </th>
            <th className="text-center py-3 px-4 font-medium text-gray-700">
              Status
            </th>
            <th className="text-left py-3 px-4 font-medium text-gray-700">
              Start Date
            </th>
            <th className="text-left py-3 px-4 font-medium text-gray-700">
              Due Date
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="border-t border-gray-100">
              <td
                className="py-4 px-4 cursor-pointer text-black-600"
                onClick={() => openTaskDetails(task)}
              >
                {task.title}
              </td>
              <td className="py-4 px-4 text-center">
                <div className="flex justify-center">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      statusColors[task.status] || "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                  </span>
                </div>
              </td>
              <td className="py-4 px-4">{task.startDate}</td>
              <td className="py-4 px-4">{task.dueDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddTaskSidebar
        open={isAddSidebarOpen}
        onClose={() => setIsAddSidebarOpen(false)}
        onSave={addTask}
      />
      <DetailTaskSidebar
        open={isDetailSidebarOpen}
        onClose={() => setIsDetailSidebarOpen(false)}
        task={selectedTask}
      />
    </div>
  );
};

export default TaskTable;
