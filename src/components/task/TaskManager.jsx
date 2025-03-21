"use client";
import { useState, useEffect } from "react";
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
import { ArrowUpDown } from "lucide-react";

const TaskManager = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sort, setSort] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

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
    let sortedTasks = [...tasks];
    if (sort) {
      sortedTasks.sort((a, b) => {
        let comparison = 0;
        if (sort === "title") comparison = a.title.localeCompare(b.title);
        if (sort === "start date") comparison = new Date(a.startDate) - new Date(b.startDate);
        if (sort === "due date") comparison = new Date(a.dueDate) - new Date(b.dueDate);
        return sortOrder === "asc" ? comparison : -comparison;
      });
    }
    setFilteredTasks(sortedTasks);
  }, [sort, sortOrder, tasks]);

  return (
    <div className="min-h-screen bg-white p-4 md:p-6">
      <main className="container mx-auto">
        <div className="bg-[#F8FAFF] rounded-lg border border-gray-200 shadow-sm">
          {/* Header */}
          <div className="bg-white p-4 flex flex-wrap items-center gap-4 md:gap-6 rounded-t-lg">
            {/* Search Input */}
            <Input
              placeholder="Search.."
              className="bg-[#E6EEFF] border-0 h-10 w-full md:w-60 pl-3 shadow-sm"
            />

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="w-full md:w-40 bg-[#E6EEFF] shadow-sm border-0">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="title">Title</SelectItem>
                  <SelectItem value="start date">Start Date</SelectItem>
                  <SelectItem value="due date">Due Date</SelectItem>
                </SelectContent>
              </Select>
              
              {/* Sort Order Button */}
              <Button
                variant="outline"
                className="bg-[#E6EEFF] border-0 shadow-sm p-2"
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              >
                <ArrowUpDown className="w-4 h-4" />
              </Button>
            </div>

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
            onSave={(task) =>
              setTasks([...tasks, { id: tasks.length + 1, ...task }])
            }
          />

          {/* Task Table */}
          <TaskTable tasks={filteredTasks} />
        </div>
      </main>
    </div>
  );
};

export default TaskManager;
