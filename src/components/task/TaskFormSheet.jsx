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
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { STATUS, PRIORITY } from "@/lib/utils";

export default function TaskFormSheet({
  slug,
  onAddTask,
  initialStatus,
  trigger,
}) {
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState({
    title: "",
    description: "",
    deadline: "",
    status: initialStatus || STATUS.TODO,
    priority: PRIORITY.UNKNOWN,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!open) handleReset();
  }, [open]);

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

    let workspaces = JSON.parse(localStorage.getItem("workspaces")) || [];
    let workspaceIndex = workspaces.findIndex((ws) => ws.slug === slug);

    if (workspaceIndex === -1) {
      const newWorkspace = { slug, tasks: [] };
      workspaces.push(newWorkspace);
      workspaceIndex = workspaces.length - 1;
      toast.info("New workspace created");
    }

    if (!workspaces[workspaceIndex].tasks) {
      workspaces[workspaceIndex].tasks = [];
    }

    const newTask = { id: Date.now(), ...task };
    workspaces[workspaceIndex].tasks.push(newTask);
    localStorage.setItem("workspaces", JSON.stringify(workspaces));

    if (typeof onAddTask === "function") {
      onAddTask(newTask);
    }
    toast.success("Task added successfully");
    setOpen(false);
  };

  const handleReset = () => {
    setTask({
      title: "",
      description: "",
      deadline: "",
      status: initialStatus || STATUS.TODO,
      priority: PRIORITY.UNKNOWN,
    });
    setErrors({});
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent
        side="right"
        className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 !max-w-full sm:!max-w-[75%] md:!max-w-[50%] lg:!max-w-[33%] rounded-l-2xl p-6 bg-gray-50 border-l shadow-xl"
      >
        <SheetHeader className="mb-1 md:-ml-4">
          <p className="text-l font-semibold text-black">Add New Task</p>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
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
              className="mt-1 w-full border rounded-lg px-3 py-2"
            />
          </div>

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

          <div className="flex justify-end gap-3 mt-8">
            <Button
              type="button"
              variant="outline"
              className="bg-gray-300 text-gray-700 hover:bg-gray-200"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-400"
            >
              Save
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
