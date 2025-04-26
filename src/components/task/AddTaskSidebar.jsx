"use client";

import { useState, useEffect } from "react";
import InputError from "@/components/InputError";
import InputLabel from "@/components/InputLabel";
import TextInput from "@/components/TextInput";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { STATUS, PRIORITY } from "@/lib/utils";

const AddTaskSidebar = ({ slug, onAddTask, initialStatus, trigger }) => {
  const [open, setOpen] = useState(false);
  const [availableWorkspaces, setAvailableWorkspaces] = useState([]);
  const [task, setTask] = useState({
    title: "",
    description: "",
    deadline: "",
    status: initialStatus || STATUS.TODO,
    priority: PRIORITY.UNKNOWN,
    workspace: "", // Akan diperbarui di useEffect
  });
  const [errors, setErrors] = useState({});

  // Muat workspace dari localStorage saat komponen dimount
  useEffect(() => {
    const loadWorkspacesFromLocalStorage = () => {
      try {
        const storedWorkspaces =
          JSON.parse(localStorage.getItem("workspaces")) || [];
        console.log("Loaded workspaces:", storedWorkspaces);
        setAvailableWorkspaces(storedWorkspaces);

        // Tentukan nilai default workspace
        let defaultWorkspace = "default";
        if (slug && storedWorkspaces.some((ws) => ws.slug === slug)) {
          defaultWorkspace = slug;
        } else if (storedWorkspaces.length > 0) {
          defaultWorkspace = storedWorkspaces[0].slug;
        }

        setTask((prev) => ({ ...prev, workspace: defaultWorkspace }));
      } catch (error) {
        console.error("Error loading workspaces from localStorage:", error);
        toast.error("Error", {
          description: "Failed to load workspaces. Using default.",
        });
        setAvailableWorkspaces([]);
        setTask((prev) => ({ ...prev, workspace: "default" }));
      }
    };

    loadWorkspacesFromLocalStorage();
  }, [slug]);

  // Reset form saat sheet ditutup
  useEffect(() => {
    if (!open) handleReset();
  }, [open, availableWorkspaces, slug]); // Tambahkan dependensi untuk memastikan reset sesuai data terbaru

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    if (!task.title.trim()) {
      setErrors({ title: "Task title is required" });
      return;
    }

    if (!task.workspace) {
      setErrors({ workspace: "Workspace is required" });
      return;
    }

    let workspaces = JSON.parse(localStorage.getItem("workspaces")) || [];
    let workspaceIndex = workspaces.findIndex(
      (ws) => ws.slug === task.workspace
    );

    if (workspaceIndex === -1) {
      const workspaceName =
        availableWorkspaces.find((ws) => ws.slug === task.workspace)?.name ||
        task.workspace;
      const newWorkspace = {
        slug: task.workspace,
        name: workspaceName,
        tasks: [],
      };
      workspaces.push(newWorkspace);
      workspaceIndex = workspaces.length - 1;
      setAvailableWorkspaces(workspaces);
      toast.info(`New workspace "${workspaceName}" created`);
    }

    if (!workspaces[workspaceIndex].tasks) {
      workspaces[workspaceIndex].tasks = [];
    }

    const newTask = { id: Date.now(), ...task };
    workspaces[workspaceIndex].tasks.push(newTask);

    try {
      localStorage.setItem("workspaces", JSON.stringify(workspaces));
      if (typeof onAddTask === "function") {
        onAddTask(newTask);
      }
      toast.success("Task added successfully");
      setOpen(false);
    } catch (error) {
      console.error("Error saving to localStorage:", error);
      toast.error("Error", {
        description: "Failed to save task. Please try again.",
      });
    }
  };

  const handleReset = () => {
    let defaultWorkspace = "default";
    if (slug && availableWorkspaces.some((ws) => ws.slug === slug)) {
      defaultWorkspace = slug;
    } else if (availableWorkspaces.length > 0) {
      defaultWorkspace = availableWorkspaces[0].slug;
    }

    setTask({
      title: "",
      description: "",
      deadline: "",
      status: initialStatus || STATUS.TODO,
      priority: PRIORITY.UNKNOWN,
      workspace: defaultWorkspace,
    });
    setErrors({});
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent
        side="right"
        className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 !max-w-full sm:!max-w-[75%] md:!max-w-[50%] lg:!max-w-[33%] rounded-l-2xl p-12 md:p-10 bg-gray-50 border-l shadow-xl overflow-y-auto"
      >
        <SheetHeader className="-mt-4 -ml-4 md:-ml-4 space-y-6">
          <p className="text-l font-semibold text-black">Add New Task</p>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <InputLabel
              htmlFor="title"
              value="Title"
              className="text-sm font-medium"
            />
            <TextInput
              id="title"
              name="title"
              type="text"
              placeholder="Enter task title"
              value={task.title}
              onChange={handleChange}
              autoFocus
              className={`mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none ${
                errors.title
                  ? "border-red-500"
                  : "border-gray-300 focus:ring-blue-300"
              }`}
            />
            {errors.title && <InputError message={errors.title} />}
          </div>

          {/* Description */}
          <div>
            <InputLabel
              htmlFor="description"
              value="Description"
              className="text-sm font-medium"
            />
            <TextInput
              id="description"
              name="description"
              type="text"
              placeholder="Enter task description"
              value={task.description}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg px-3 py-2 resize-y"
            />
          </div>

          {/* Workspace */}
          <div>
            <InputLabel
              htmlFor="workspace"
              value="Workspace"
              className="text-sm font-medium"
            />
            <Select
              value={task.workspace}
              onValueChange={(value) => setTask({ ...task, workspace: value })}
            >
              <SelectTrigger className="mt-1 w-full border rounded-lg px-3 py-2">
                <SelectValue placeholder="Select a workspace" />
              </SelectTrigger>
              <SelectContent>
                {availableWorkspaces.length > 0 ? (
                  availableWorkspaces.map((ws) => (
                    <SelectItem key={ws.id} value={ws.slug}>
                      {ws.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="default">
                    Workspace not available
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
            {errors.workspace && <InputError message={errors.workspace} />}
          </div>

          {/* Deadline */}
          <div>
            <InputLabel
              htmlFor="deadline"
              value="Deadline"
              className="text-sm font-medium"
            />
            <TextInput
              id="deadline"
              name="deadline"
              type="date"
              value={task.deadline}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* Status */}
          <div>
            <InputLabel
              htmlFor="status"
              value="Status"
              className="text-sm font-medium"
            />
            <Select
              value={task.status}
              onValueChange={(value) => setTask({ ...task, status: value })}
            >
              <SelectTrigger className="mt-1 w-full border rounded-lg px-3 py-2">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(STATUS).map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Priority */}
          <div>
            <InputLabel
              htmlFor="priority"
              value="Priority"
              className="text-sm font-medium"
            />
            <Select
              value={task.priority}
              onValueChange={(value) => setTask({ ...task, priority: value })}
            >
              <SelectTrigger className="mt-1 w-full border rounded-lg px-3 py-2">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(PRIORITY).map((priority) => (
                  <SelectItem key={priority} value={priority}>
                    {priority}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-8">
            <Button
              type="button"
              variant="outline"
              className="bg-gray-300 text-gray-700 hover:bg-gray-200 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-400 cursor-pointer"
            >
              Save
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default AddTaskSidebar;
