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

const TaskManager = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sort, setSort] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  // Fungsi untuk memuat tasks dari localStorage
  const loadTasksFromLocalStorage = () => {
    try {
      // Periksa apakah ada data lama dengan struktur workspaces
      const storedWorkspaces =
        JSON.parse(localStorage.getItem("workspaces")) || [];
      let storedTasks = JSON.parse(localStorage.getItem("cards")) || [];

      // Jika ada data di workspaces, migrasi ke tasks
      if (storedWorkspaces.length > 0 && storedTasks.length === 0) {
        storedTasks = storedWorkspaces.flatMap((ws) =>
          (ws.cards || []).map((task) => ({
            ...task,
            workspace: ws.slug,
          }))
        );
        localStorage.setItem("cards", JSON.stringify(storedTasks));
        localStorage.removeItem("workspaces"); // Hapus data lama setelah migrasi
      }

      return storedTasks;
    } catch (error) {
      console.error("Error loading tasks from localStorage:", error);
      toast.error("Error", {
        description: "Failed to load tasks. Please try again.",
      });
      return [];
    }
  };

  // Muat tasks saat komponen dimount
  useEffect(() => {
    const storedTasks = loadTasksFromLocalStorage();
    setTasks(storedTasks);
    setFilteredTasks(storedTasks);
  }, []);

  // Sinkronisasi antar tab
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "cards") {
        const updatedTasks = loadTasksFromLocalStorage();
        setTasks(updatedTasks);
        setFilteredTasks(updatedTasks);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Simpan tasks ke localStorage saat tasks berubah
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("cards", JSON.stringify(tasks));
    }
  }, [tasks]);

  // Logika pengurutan
  useEffect(() => {
    let sortedTasks = [...tasks];
    if (sort) {
      sortedTasks.sort((a, b) => {
        let comparison = 0;
        if (sort === "title") {
          comparison = a.title.localeCompare(b.title);
        }
        if (sort === "deadline") {
          const dateA = a.deadline ? new Date(a.deadline) : new Date(0);
          const dateB = b.deadline ? new Date(b.deadline) : new Date(0);
          comparison = dateA - dateB;
        }
        return sortOrder === "asc" ? comparison : -comparison;
      });
    }
    setFilteredTasks(sortedTasks);
  }, [sort, sortOrder, tasks]);

  // Fungsi untuk menangani penambahan tugas baru
  const handleAddTask = (task) => {
    try {
      const newTask = {
        id: Date.now().toString(), // Gunakan timestamp sebagai ID
        ...task,
        workspace: task.workspace || "default", // Pastikan ada properti workspace
      };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      setFilteredTasks(updatedTasks);
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
                  <SelectItem value="deadline">Deadline</SelectItem>
                </SelectContent>
              </Select>

              {/* Sort Order Button */}
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
            onSave={handleAddTask}
          />

          {/* Task Table */}
          <TaskTable tasks={filteredTasks} />
        </div>
      </main>
    </div>
  );
};

export default TaskManager;
