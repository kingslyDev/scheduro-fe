"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import AddTaskSidebar from "@/components/AddTaskSidebar";
import TaskTable from "@/components/TaskTable";

const TaskManager = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sort, setSort] = useState("20");

  return (
    <div className="min-h-screen bg-white p-6">
      <main className="container mx-auto">
        <h1 className="text-2xl font-bold mb-6">Tasks</h1>
        <div className="bg-[#F8FAFF] rounded-lg border border-gray-200 shadow-sm">
          {/* Header dengan Background Putih */}
          <div className="bg-white p-4 flex items-center gap-6 rounded-t-lg">
            {/* Search Input */}
            <Input
              placeholder="Search.."
              className="bg-[#E6EEFF] border-0 h-10 w-150 pl-3 shadow-sm"
            />

            {/* Sort Dropdown */}
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-30 bg-[#E6EEFF] shadow-sm border-0">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>

            {/* Filter Button */}
            <Button
              variant="outline"
              className="flex items-center gap-2 px-4 py-2 bg-[#E6EEFF] border-0 shadow-sm"
            >
              <span>Filter</span>
            </Button>

            {/* Create Task Button */}
            <Button
              onClick={() => setIsSidebarOpen(true)}
              className="bg-[#4F74E8] text-white px-4 py-2 ml-auto hover:bg-[#3E5EB8]"
            >
              Create Task
            </Button>
          </div>

          {/* Sidebar */}
          <AddTaskSidebar
            open={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />

          {/* Task Table */}
          <TaskTable />
        </div>
      </main>
    </div>
  );
};

export default TaskManager;
