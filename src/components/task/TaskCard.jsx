"use client";

import React, { useState, useRef, useEffect } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";
import { Clock, Save, Trash2 } from "lucide-react"; // Impor Trash2
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  cn,
  getPriorityBadgeStyles,
  getPriorityColor,
  isValidPriority,
  PRIORITY,
  STATUS,
} from "@/lib/utils"; // Impor PRIORITY dan STATUS
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";

const TaskCard = React.memo(
  ({ task, status, isActive, onTaskUpdate, isLoading = false }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); // State untuk dialog konfirmasi hapus
    const [editedTask, setEditedTask] = useState(null);
    const titleRef = useRef(null);
    const descriptionRef = useRef(null);

    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({
      id: task?.id || "empty",
      data: { status },
      disabled: !task?.id,
    });

    useEffect(() => {
      const preventDragAndOpenDialog = (e) => {
        e.preventDefault();
        e.stopPropagation();
        handleOpenDialog();
      };

      const titleElement = titleRef.current;
      const descElement = descriptionRef.current;

      if (titleElement) {
        titleElement.addEventListener("mousedown", preventDragAndOpenDialog);
        titleElement.addEventListener("touchstart", preventDragAndOpenDialog, {
          passive: false,
        });
      }

      if (descElement) {
        descElement.addEventListener("mousedown", preventDragAndOpenDialog);
        descElement.addEventListener("touchstart", preventDragAndOpenDialog, {
          passive: false,
        });
      }

      return () => {
        if (titleElement) {
          titleElement.removeEventListener(
            "mousedown",
            preventDragAndOpenDialog
          );
          titleElement.removeEventListener(
            "touchstart",
            preventDragAndOpenDialog
          );
        }
        if (descElement) {
          descElement.removeEventListener(
            "mousedown",
            preventDragAndOpenDialog
          );
          descElement.removeEventListener(
            "touchstart",
            preventDragAndOpenDialog
          );
        }
      };
    }, []);

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    const handleOpenDialog = () => {
      console.log("handleOpenDialog called, isDragging:", isDragging); // Debugging
      if (!isDragging) {
        console.log("Setting editedTask and opening dialog:", task); // Debugging
        setEditedTask({ ...task });
        setIsDialogOpen(true);
      } else {
        console.log("Dialog not opened because isDragging is true"); // Debugging
      }
    };

    const handleCloseDialog = () => {
      setIsDialogOpen(false);
      setEditedTask(null);
    };

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEditedTask((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    const handleSelectChange = (field, value) => {
      setEditedTask((prev) => ({
        ...prev,
        [field]: value,
      }));
    };

    const handleSaveTask = () => {
      try {
        if (!editedTask?.id) throw new Error("Task ID is missing");
        if (!editedTask.title.trim()) throw new Error("Title cannot be empty");

        // Konversi deadline ke format ISO jika ada
        if (editedTask.deadline) {
          const date = new Date(editedTask.deadline);
          if (isNaN(date.getTime())) throw new Error("Invalid deadline format");
          editedTask.deadline = date.toISOString();
        } else {
          editedTask.deadline = null;
        }

        // Panggil onTaskUpdate untuk memberi tahu parent tentang perubahan
        if (onTaskUpdate) {
          onTaskUpdate(editedTask);
        }
        toast.success("Task updated", {
          description: "Your task has been successfully updated.",
        });
        handleCloseDialog();
      } catch (error) {
        console.error("Error saving task:", error);
        toast.error("Error", {
          description:
            error.message || "Failed to save task. Please try again.",
        });
      }
    };

    const handleDeleteTask = () => {
      try {
        if (!task?.id) throw new Error("Task ID is missing");

        // Panggil onTaskUpdate untuk memberi tahu parent tentang penghapusan
        if (onTaskUpdate) {
          onTaskUpdate(null, task.id);
        }
        toast.success("Task deleted", {
          description: "Your task has been successfully deleted.",
        });
        setIsDeleteDialogOpen(false); // Tutup dialog konfirmasi hapus
      } catch (error) {
        console.error("Error deleting task:", error);
        toast.error("Error", {
          description:
            error.message || "Failed to save task. Please try again.",
        });
      }
    };

    const handleOpenDeleteDialog = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDeleteDialogOpen(true);
    };

    const { priority, deadline, subtasks } = task || {};

    const [formattedTime, setFormattedTime] = useState("");

    useEffect(() => {
      if (deadline) {
        const date = new Date(deadline);
        const now = new Date();
        const diffMs = date - now;

        if (diffMs < 0) {
          setFormattedTime("Expired");
        } else if (diffMs < 86400000) {
          setFormattedTime(
            date.toLocaleTimeString("id-ID", {
              hour: "2-digit",
              minute: "2-digit",
            })
          );
        } else {
          setFormattedTime(
            date.toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          );
        }
      } else {
        setFormattedTime("No Deadline");
      }
    }, [deadline]);

    if (isLoading) {
      return (
        <motion.div
          layout
          initial={{ scale: 0.98, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.98, opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="w-full"
        >
          <div className="group relative rounded-md border bg-task overflow-hidden">
            {/* Bar prioritas */}
            <Skeleton className="absolute top-0 left-0 right-0 h-1.5 w-full" />

            <div className="p-3">
              {/* Judul dan tombol hapus */}
              <div className="flex items-start justify-between gap-1 mb-2">
                <Skeleton className="h-4 w-3/4" /> {/* Judul */}
                <Skeleton className="h-6 w-6 rounded-sm" /> {/* Tombol hapus */}
              </div>

              {/* Badge prioritas */}
              <div className="mb-2">
                <Skeleton className="h-6 w-16 rounded-md" />
              </div>

              {/* Deskripsi */}
              <div className="space-y-1 mb-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-2/3" />
              </div>

              {/* Deadline */}
              <div className="flex items-center justify-between border-t border-dashed border-muted/40 pt-1.5 mt-1">
                <div className="flex items-center gap-1">
                  <Skeleton className="h-5 w-20 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      );
    }

    return (
      <>
        <motion.div
          layout
          initial={{ scale: 0.98, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.98, opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="w-full"
        >
          <div
            ref={setNodeRef}
            style={style}
            className={`group relative rounded-md transition-all duration-200
                ${isDragging ? "opacity-50" : "opacity-100"} 
                ${isActive ? "z-10" : "z-0"}
                hover:shadow-md hover:-translate-y-0.5
                active:shadow-sm active:translate-y-0
                cursor-grab
                overflow-hidden
                border bg-task
              `}
            {...attributes}
            {...listeners}
          >
            <div
              className={cn(
                "absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r to-transparent z-10",
                getPriorityColor(task.priority)
              )}
            />

            <div className="p-3">
              <div className="flex items-start justify-between gap-1 mb-2">
                <h3
                  ref={titleRef}
                  className="line-clamp-2 text-sm font-medium text-foreground hover:text-primary hover:underline transition-colors cursor-pointer select-none z-10"
                >
                  {task?.title}
                </h3>
                <button
                  className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 flex items-center justify-center rounded-sm hover:bg-muted/80 z-20"
                  onMouseDown={handleOpenDeleteDialog}
                  onTouchStart={handleOpenDeleteDialog}
                >
                  <Trash2 className="h-3.5 w-3.5 text-destructive" />
                  <span className="sr-only">Delete task</span>
                </button>
              </div>
              {isValidPriority(priority) && (
                <div className="mb-2">
                  <Badge
                    className={cn(
                      "border rounded-md px-2 py-1 text-center",
                      getPriorityBadgeStyles(priority)
                    )}
                  >
                    {priority}
                  </Badge>
                </div>
              )}
              {task?.description && (
                <p className="line-clamp-2 text-xs text-muted-foreground mb-2 cursor-pointer z-10">
                  {task.description}
                </p>
              )}
              <div className="flex items-center justify-between border-t border-dashed border-muted/40 pt-1.5 mt-1">
                <div className="flex items-center gap-1">
                  <div
                    className={`flex items-center text-[10px] ${deadline && new Date(deadline) < new Date()
                      ? "bg-gray-200 text-gray-900"
                      : "bg-gray-300 text-gray-900"
                      } px-2 py-1 rounded-full`}
                  >
                    <Clock className="h-3 w-3 mr-1" />
                    <span className="font-medium">{formattedTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Dialog untuk edit tugas */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
            </DialogHeader>

            {editedTask && (
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={editedTask.title || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={editedTask.description || ""}
                    onChange={handleInputChange}
                    className="min-h-[100px]"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={editedTask.priority}
                    onValueChange={(value) =>
                      handleSelectChange("priority", value)
                    }
                  >
                    <SelectTrigger id="priority">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={PRIORITY.LOW}>
                        {PRIORITY.LOW}
                      </SelectItem>
                      <SelectItem value={PRIORITY.MEDIUM}>
                        {PRIORITY.MEDIUM}
                      </SelectItem>
                      <SelectItem value={PRIORITY.HIGH}>
                        {PRIORITY.HIGH}
                      </SelectItem>
                      <SelectItem value={PRIORITY.URGENT}>
                        {PRIORITY.URGENT}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={editedTask.status}
                    onValueChange={(value) =>
                      handleSelectChange("status", value)
                    }
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={STATUS.TODO}>To Do</SelectItem>
                      <SelectItem value={STATUS.INPROGRESS}>
                        In Progress
                      </SelectItem>
                      <SelectItem value={STATUS.DONE}>Done</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="deadline">Deadline</Label>
                  <Input
                    id="deadline"
                    name="deadline"
                    type="date"
                    value={
                      editedTask.deadline
                        ? new Date(editedTask.deadline)
                          .toISOString()
                          .split("T")[0]
                        : ""
                    }
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={handleCloseDialog}
                className="bg-gray-300 text-gray-700 hover:bg-gray-200"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveTask}
                className="bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-400"
              >
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Dialog untuk konfirmasi hapus */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-xl text-center text-destructive">
                Delete Task
              </DialogTitle>
              <DialogDescription className="text-base font-normal text-center mt-2">
                Are you sure you want to delete this task? This action cannot be
                undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex justify-center gap-4 sm:justify-center">
              <Button
                variant="outline"
                className="bg-gray-300 text-gray-700 hover:bg-gray-200"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteTask}
                className="bg-red-600 text-white font-semibold rounded-md hover:bg-red-400 transition duration-200"
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  }
);

TaskCard.displayName = "TaskCard";

export default TaskCard;
