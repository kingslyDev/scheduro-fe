"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { UploadIcon } from "lucide-react";

// Daftar workspace yang tersedia
const workspaces = [
  { id: 1, name: "Frontend", slug: "frontend" },
  { id: 2, name: "Backend", slug: "backend" },
  { id: 3, name: "UI/UX Design", slug: "design" },
];

const AddTaskSidebar = ({ open, onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [workspace, setWorkspace] = useState(workspaces[0]); // Default ke workspace pertama
  const [priority, setPriority] = useState("medium");
  const [status, setStatus] = useState("todo");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    // Mengambil task dari localStorage jika ada
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    console.log("Stored Tasks:", storedTasks);
  }, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSave = () => {
    const newTask = {
      title,
      workspace: workspace.slug, // Simpan slug, bukan objek
      priority,
      status,
      description,
      startDate,
      dueDate,
    };

    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    localStorage.setItem("tasks", JSON.stringify([...storedTasks, newTask]));

    if (onSave) {
      onSave(newTask);
    }

    // Reset form setelah menyimpan
    setTitle("");
    setWorkspace(workspaces[0]);
    setPriority("medium");
    setStatus("todo");
    setDescription("");
    setStartDate("");
    setDueDate("");
    setFile(null);

    onClose();
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-2xl max-h-screen overflow-y-auto p-0 border-l"
      >
        <div className="h-full flex flex-col p-8">
          <SheetHeader className="text-left pb-6">
            <SheetTitle className="text-xl font-bold">Add Task</SheetTitle>
            <p className="text-sm text-muted-foreground">Add new task</p>
          </SheetHeader>

          <div className="space-y-6 flex-1 overflow-y-auto max-h-[70vh]">
            {/* Title */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full"
              />
            </div>

            {/* Workspace */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Workspace</label>
              <Select
                value={workspace.slug}
                onValueChange={(val) => {
                  const selectedWorkspace = workspaces.find(
                    (w) => w.slug === val
                  );
                  if (selectedWorkspace) setWorkspace(selectedWorkspace);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a workspace">
                    {workspace ? workspace.name : "Select a workspace"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {workspaces.map((ws) => (
                    <SelectItem key={ws.id} value={ws.slug}>
                      {ws.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Priority */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Priority</label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger className="w-full">
                  <SelectValue>
                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-full">
                  <SelectValue>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todo">To Do</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                placeholder="Enter description"
                className="min-h-[150px] resize-none w-full"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* File Upload */}
            <div className="space-y-2">
              <label className="text-sm font-medium">File</label>
              <div className="flex items-center border rounded-md px-3 py-2 bg-background hover:bg-accent/50 cursor-pointer w-full">
                <Input
                  type="file"
                  className="hidden"
                  id="file-upload"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="file-upload"
                  className="flex items-center cursor-pointer w-full"
                >
                  <UploadIcon className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {file ? file.name : "Select attachment"}
                  </span>
                </label>
              </div>
            </div>

            {/* Start Date & Due Date */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Start Date</label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Due Date</label>
              <Input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-4 pt-8 w-full">
            <Button
              variant="outline"
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-2 bg-gray-300 text-gray-700"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="w-full sm:w-auto px-6 py-2 bg-blue-300 text-white hover:bg-blue-500"
            >
              Save
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AddTaskSidebar;
