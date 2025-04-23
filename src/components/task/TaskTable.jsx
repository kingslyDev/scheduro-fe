"use client";

import { useState } from "react";
import AddTaskSidebar from "./AddTaskSidebar";
import DetailTaskSidebar from "./DetailTaskSidebar";
import { STATUS, PRIORITY, getPriorityBadgeStyles } from "@/lib/utils";

// Warna untuk status
const statusColors = {
  [STATUS.TODO]: "bg-blue-500 text-white",
  [STATUS.INPROGRESS]: "bg-blue-600 text-white",
  [STATUS.DONE]: "bg-blue-900 text-white",
};

const TaskTable = ({ tasks, onTaskUpdate }) => {
  const [isAddSidebarOpen, setIsAddSidebarOpen] = useState(false);
  const [isDetailSidebarOpen, setIsDetailSidebarOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // Buka detail tugas
  const openTaskDetails = (task) => {
    setSelectedTask(task);
    setIsDetailSidebarOpen(true);
  };

  // Tangani pembaruan tugas dari DetailTaskSidebar
  const handleTaskUpdate = (updatedTask) => {
    if (onTaskUpdate) {
      onTaskUpdate(updatedTask);
    }
    setIsDetailSidebarOpen(false);
  };

  return (
    <div className="overflow-x-auto p-4 bg-white rounded-lg">
      <table className="w-full min-w-[800px] table-auto border border-gray-200 rounded-lg shadow-sm bg-white">
        <thead>
          <tr className="bg-[#E6EEFF] text-gray-700">
            <th className="text-left py-4 px-6 font-medium text-sm tracking-wider">
              Title
            </th>
            <th className="text-left py-4 px-6 font-medium text-sm tracking-wider">
              Description
            </th>
            <th className="text-center py-4 px-6 font-medium text-sm tracking-wider">
              Status
            </th>
            <th className="text-left py-4 px-6 font-medium text-sm tracking-wider">
              Deadline
            </th>
            <th className="text-left py-4 px-6 font-medium text-sm tracking-wider">
              Workspace
            </th>
            <th className="text-left py-4 px-7 font-medium text-sm tracking-wider">
              Priority
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <tr
                key={task.id}
                className={`border-t border-gray-100 hover:bg-gray-50 transition-colors duration-150 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td
                  className="py-4 px-6 text-gray-800 cursor-pointer hover:text-blue-400 transition-colors duration-150"
                  onClick={() => openTaskDetails(task)}
                >
                  {task.title}
                </td>
                <td
                  className="py-4 px-6 text-gray-600 max-w-[250px] truncate"
                  title={task.description || "No Description"} // Tooltip untuk teks panjang
                >
                  {task.description || "No Description"}
                </td>
                <td className="py-4 px-6 text-center">
                  <div className="flex justify-center">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        statusColors[task.status] || "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {task.status}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-6 text-gray-600">
                  {task.deadline
                    ? new Date(task.deadline).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : "No Deadline"}
                </td>
                <td className="py-4 px-6 text-gray-600">
                  {task.workspaceSlug || task.workspace}
                </td>
                <td className="py-4 px-6">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityBadgeStyles(
                      task.priority
                    ).join(" ")}`}
                  >
                    {task.priority}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={6}
                className="py-6 px-6 text-center text-gray-500 text-base"
              >
                No tasks available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <AddTaskSidebar
        open={isAddSidebarOpen}
        onClose={() => setIsAddSidebarOpen(false)}
        onSave={(task) => {
          console.log("Task saved from TaskTable AddTaskSidebar:", task);
        }}
      />
      <DetailTaskSidebar
        open={isDetailSidebarOpen}
        onClose={() => setIsDetailSidebarOpen(false)}
        task={selectedTask}
        onSave={handleTaskUpdate}
      />
    </div>
  );
};

export default TaskTable;
