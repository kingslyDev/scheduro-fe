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
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton"; // Impor Skeleton dari Shadcn

const TaskManager = () => {
  const [sort, setSort] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true); // State untuk loading

  const loadTasksFromLocalStorage = () => {
    try {
      const storedWorkspaces =
        JSON.parse(localStorage.getItem("workspaces")) || [];
      const allTasks = storedWorkspaces.flatMap((ws) =>
        (ws.tasks || []).map((task) => ({
          ...task,
          workspace: ws.slug,
        }))
      );
      return allTasks;
    } catch (error) {
      console.error("Error loading tasks from localStorage:", error);
      return [];
    }
  };

  useEffect(() => {
    const storedTasks = loadTasksFromLocalStorage();
    setTasks(storedTasks);
    setFilteredTasks(storedTasks);
    setIsLoading(false); // Selesai memuat data
  }, []);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "workspaces") {
        const updatedTasks = loadTasksFromLocalStorage();
        setTasks(updatedTasks);
        setFilteredTasks(updatedTasks);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    let updatedTasks = [...tasks];
    if (searchQuery) {
      updatedTasks = updatedTasks.filter((task) =>
        task.title?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (sort) {
      updatedTasks.sort((a, b) => {
        let comparison = 0;
        if (sort === "title") {
          comparison = (a.title || "").localeCompare(b.title || "");
        } else if (sort === "deadline") {
          const dateA = a.deadline ? new Date(a.deadline) : new Date(0);
          const dateB = b.deadline ? new Date(b.deadline) : new Date(0);
          comparison = dateA - dateB;
        } else if (sort === "workspace") {
          comparison = (a.workspace || "").localeCompare(b.workspace || "");
        }
        return sortOrder === "asc" ? comparison : -comparison;
      });
    }
    setFilteredTasks(updatedTasks);
  }, [sort, sortOrder, tasks, searchQuery]);

  const handleAddTask = (task) => {
    try {
      const updatedTasks = loadTasksFromLocalStorage();
      setTasks(updatedTasks);
      toast.success("Task added", {
        description: `Task "${task.title}" has been successfully added.`,
      });
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("Error", {
        description: "Failed to add task. Please try again.",
      });
    }
  };

  const handleTaskUpdate = (updatedTask) => {
    try {
      const workspaces = JSON.parse(localStorage.getItem("workspaces")) || [];
      const workspaceIndex = workspaces.findIndex(
        (ws) => ws.slug === updatedTask.workspace
      );
      if (workspaceIndex === -1) throw new Error("Workspace not found");

      const taskIndex = workspaces[workspaceIndex].tasks.findIndex(
        (t) => t.id === updatedTask.id
      );
      if (taskIndex === -1) throw new Error("Task not found");

      workspaces[workspaceIndex].tasks[taskIndex] = updatedTask;
      localStorage.setItem("workspaces", JSON.stringify(workspaces));
      const updatedTasks = loadTasksFromLocalStorage();
      setTasks(updatedTasks);
      setFilteredTasks(updatedTasks);
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Error", {
        description: "Failed to update task. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-6">
      <main className="container mx-auto">
        <div className="bg-[#F8FAFF] rounded-lg border border-gray-200 shadow-sm">
          <div className="bg-white p-4 flex flex-wrap items-center gap-4 md:gap-6 rounded-t-lg">
            {isLoading ? (
              <>
                <Skeleton className="h-10 w-full md:w-60 bg-[#E6EEFF]" />
                <div className="flex items-center gap-2">
                  <Skeleton className="h-10 w-full md:w-40 bg-[#E6EEFF]" />
                  <Skeleton className="h-10 w-10 bg-[#E6EEFF]" />
                </div>
                <Skeleton className="h-10 w-full md:w-32 bg-[#4F74E8] ml-auto" />
              </>
            ) : (
              <>
                <Input
                  placeholder="Search by title..."
                  className="w-full md:w-65 bg-[#E6EEFF] shadow-sm border-0"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="flex items-center gap-2">
                  <Select value={sort} onValueChange={setSort}>
                    <SelectTrigger className="w-full md:w-40 bg-[#E6EEFF] shadow-sm border-0">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="title">Title</SelectItem>
                      <SelectItem value="deadline">Deadline</SelectItem>
                      <SelectItem value="workspace">Workspace</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    className="bg-[#E6EEFF] border-0 shadow-sm p-2"
                    onClick={() =>
                      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                    }
                  >
                    <ArrowUpDown className="w-4 h-4" />
                  </Button>
                </div>
                <AddTaskSidebar
                  trigger={
                    <Button className="bg-[#4F74E8] text-white px-4 py-2 ml-auto hover:bg-[#3E5EB8] w-full md:w-auto">
                      Create Task
                    </Button>
                  }
                  onAddTask={handleAddTask}
                />
              </>
            )}
          </div>
          {isLoading ? (
            <div className="p-4">
              {/* Skeleton untuk header tabel */}
              <div className="grid grid-cols-5 gap-4 mb-4">
                {Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <Skeleton key={index} className="h-6 w-full" />
                  ))}
              </div>
              {/* Skeleton untuk baris tabel */}
              <div className="space-y-4">
                {Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-5 gap-4 items-center"
                    >
                      <Skeleton className="h-8 w-full" />
                      <Skeleton className="h-8 w-full" />
                      <Skeleton className="h-8 w-full" />
                      <Skeleton className="h-8 w-full" />
                      <Skeleton className="h-8 w-full" />
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <TaskTable tasks={filteredTasks} onTaskUpdate={handleTaskUpdate} />
          )}
        </div>
      </main>
    </div>
  );
};

export default TaskManager;
