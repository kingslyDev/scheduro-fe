"use client"

import React, { useState, useRef, useEffect } from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { motion } from "framer-motion"
import { MoreHorizontal, Clock, CheckCircle2, Save } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import GetPriorityBadge from "@/components/task/GetPriorityBadge"

const TaskCard = React.memo(({ card, status, isActive, onClick, onTaskUpdate }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editedTask, setEditedTask] = useState(null)
  const titleRef = useRef(null)
  const descriptionRef = useRef(null)
  const menuRef = useRef(null)
  
  // Setup sortable hook with all listeners
  const { 
    attributes, 
    listeners, 
    setNodeRef, 
    transform, 
    transition, 
    isDragging 
  } = useSortable({
    id: card?.id || "empty",
    data: { status },
    disabled: !card?.id,
  })
  
  // Custom click handlers to prevent drag on specific elements
  useEffect(() => {
    const preventDragAndOpenDialog = (e) => {
      e.preventDefault();
      e.stopPropagation();
      handleOpenDialog();
    };
    
    const titleElement = titleRef.current;
    const descElement = descriptionRef.current;
    
    if (titleElement) {
      titleElement.addEventListener('mousedown', preventDragAndOpenDialog);
      titleElement.addEventListener('touchstart', preventDragAndOpenDialog, { passive: false });
    }
    
    if (descElement) {
      descElement.addEventListener('mousedown', preventDragAndOpenDialog);
      descElement.addEventListener('touchstart', preventDragAndOpenDialog, { passive: false });
    }
    
    return () => {
      if (titleElement) {
        titleElement.removeEventListener('mousedown', preventDragAndOpenDialog);
        titleElement.removeEventListener('touchstart', preventDragAndOpenDialog);
      }
      
      if (descElement) {
        descElement.removeEventListener('mousedown', preventDragAndOpenDialog);
        descElement.removeEventListener('touchstart', preventDragAndOpenDialog);
      }
    };
  }, []);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const getPriorityPattern = () => {
    if (card?.priority === "high") {
      return "bg-[radial-gradient(#fecaca_1px,transparent_1px)] bg-[length:10px_10px]"
    } else if (card?.priority === "medium") {
      return "bg-[radial-gradient(#fef3c7_1px,transparent_1px)] bg-[length:10px_10px]"
    }
    return "bg-[radial-gradient(#dbeafe_1px,transparent_1px)] bg-[length:10px_10px]"
  }

  const getPriorityColor = () => {
    if (card?.priority === "high") {
      return "from-red-500"
    } else if (card?.priority === "medium") {
      return "from-amber-500"
    }
    return "from-blue-500"
  }

  const handleOpenDialog = () => {
    setEditedTask({ ...card })
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setEditedTask(null)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditedTask((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (value) => {
    setEditedTask((prev) => ({
      ...prev,
      priority: value,
    }))
  }

  const handleSaveTask = () => {
    try {
      const tasksJson = localStorage.getItem("tasks")
      const tasks = tasksJson ? JSON.parse(tasksJson) : []
      const updatedTasks = tasks.map((task) => (task.id === editedTask.id ? editedTask : task))
      localStorage.setItem("tasks", JSON.stringify(updatedTasks))
      if (onTaskUpdate) {
        onTaskUpdate(editedTask)
      }
      toast.success("Task updated", {
        description: "Your task has been successfully updated.",
      })
      handleCloseDialog()
    } catch (error) {
      console.error("Error saving task:", error)
      toast.error("Error", {
        description: "Failed to save task. Please try again.",
      })
    }
  }

  const handleDeleteTask = () => {
    try {
      const tasksJson = localStorage.getItem("tasks")
      const tasks = tasksJson ? JSON.parse(tasksJson) : []
      const updatedTasks = tasks.filter((task) => task.id !== card.id)
      localStorage.setItem("tasks", JSON.stringify(updatedTasks))
      if (onTaskUpdate) {
        onTaskUpdate(null, card.id)
      }
      toast.success("Task deleted", {
        description: "Your task has been successfully deleted.",
      })
      handleCloseDialog()
    } catch (error) {
      console.error("Error deleting task:", error)
      toast.error("Error", {
        description: "Failed to delete task. Please try again.",
      })
    }
  }

  const handleDropdownClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

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
            border border-muted/60
            ${getPriorityPattern()}
          `}
          {...attributes}
          {...listeners}
        >
          <div
            className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${getPriorityColor()} to-transparent`}
          ></div>

          <div className="p-2">
            <div className="flex items-start justify-between gap-1 mb-1">
              <div className="flex items-center gap-1.5">
                <h3
                  ref={titleRef}
                  className="line-clamp-1 text-sm font-medium text-foreground hover:text-primary hover:underline transition-colors cursor-pointer select-none z-10"
                >
                  {card?.title}
                </h3>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger
                  ref={menuRef}
                  className="dropdown-trigger opacity-0 group-hover:opacity-100 transition-opacity h-5 w-5 flex items-center justify-center rounded-sm hover:bg-muted z-20"
                  onClick={handleDropdownClick}
                  onMouseDown={handleDropdownClick}
                  onTouchStart={handleDropdownClick}
                >
                  <MoreHorizontal className="h-3 w-3" />
                  <span className="sr-only">Open menu</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.preventDefault()
                      handleOpenDialog()
                    }}
                    onSelect={(e) => e.preventDefault()}
                  >
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={(e) => {
                      e.preventDefault()
                      handleDeleteTask()
                    }}
                    onSelect={(e) => e.preventDefault()}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {card?.description && (
              <p 
                ref={descriptionRef}
                className="line-clamp-1 text-[10px] text-muted-foreground mb-1.5 cursor-pointer z-10"
              >
                {card.description}
              </p>
            )}

            <div className="flex items-center justify-between border-t border-dashed border-muted/40 pt-1 mt-1">
              <div className="flex items-center gap-1">
                {card?.priority && <GetPriorityBadge priority={card.priority} />}
                <div className="flex items-center text-[10px] text-muted-foreground bg-muted/30 px-1 py-0.5 rounded">
                  <Clock className="h-2.5 w-2.5 mr-0.5" />
                  <span>2d</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-4 w-4 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="h-3 w-3 text-green-600" />
                </div>
                <span className="text-[10px] text-muted-foreground">2/5</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Task Details</DialogTitle>
          </DialogHeader>

          {editedTask && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" value={editedTask.title || ""} onChange={handleInputChange} />
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
                <Select value={editedTask.priority || "low"} onValueChange={handleSelectChange}>
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button onClick={handleSaveTask}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
})

TaskCard.displayName = "TaskCard"

export default TaskCard