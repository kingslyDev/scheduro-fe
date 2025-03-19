"use client";
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import AddTaskSidebar from "@/components/task/AddTaskSidebar";
import TaskTable from "@/components/task/TaskTable";

const TaskManager = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sort, setSort] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  useEffect(() => {
    if (sort) {
      const sortedTasks = [...tasks].sort((a, b) => {
        if (sort === "10") return a.title.localeCompare(b.title);
        if (sort === "20") return new Date(a.startDate) - new Date(b.startDate);
        if (sort === "50") return new Date(a.dueDate) - new Date(b.dueDate);
        return 0;
      });
      setTasks(sortedTasks);
    }
  }, [sort]);

  return (
    <div className="min-h-screen bg-white p-4 md:p-6">
      <main className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4 md:mb-6">Tasks</h1>
        <div className="bg-[#F8FAFF] rounded-lg border border-gray-200 shadow-sm">
          {/* Header */}
          <div className="bg-white p-4 flex flex-wrap items-center gap-4 md:gap-6 rounded-t-lg">
            {/* Search Input */}
            <Input
              placeholder="Search.."
              className="bg-[#E6EEFF] border-0 h-10 w-full md:w-60 pl-3 shadow-sm"
            />

            {/* Sort Dropdown */}
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-full md:w-30 bg-[#E6EEFF] shadow-sm border-0">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="title">Title</SelectItem>
                <SelectItem value="status">Status</SelectItem>
                <SelectItem value="start date">Start Date</SelectItem>
                <SelectItem value="due date">Due Date</SelectItem>
              </SelectContent>
            </Select>

            {/* Create Task Button */}
            <Button
              onClick={() => setIsSidebarOpen(true)}
              className="bg-[#4F74E8] text-white px-4 py-2 ml-auto hover:bg-[#3E5EB8] w-full md:w-auto"
            >
              Create Task
            </Button>
          </div>

          {/* Sidebar */}
          <AddTaskSidebar
            open={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            onSave={(task) => setTasks([...tasks, { id: tasks.length + 1, ...task }])}
          />

          {/* Task Table */}
          <TaskTable tasks={tasks} />
        </div>
      </main>
    </div>
  );
};

export default TaskManager;
