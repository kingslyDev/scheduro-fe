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
import { CalendarIcon, Save } from "lucide-react";
import { STATUS } from "@/lib/utils"; // Impor STATUS dari utils.js
import { toast } from "sonner"; // Impor toast untuk notifikasi

const DetailTaskSidebar = ({ open, onClose, task, onSave }) => {
  // Inisialisasi state dengan data dari task
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(STATUS.TODO);
  const [deadline, setDeadline] = useState("");

  // Sinkronkan state dengan prop task setiap kali task berubah
  useEffect(() => {
    if (task) {
      setTaskName(task.title || "");
      setDescription(task.description || "");
      setStatus(task.status || STATUS.TODO);
      setDeadline(
        task.deadline ? new Date(task.deadline).toISOString().split("T")[0] : ""
      );
    } else {
      // Reset state jika task tidak ada
      setTaskName("");
      setDescription("");
      setStatus(STATUS.TODO);
      setDeadline("");
    }
  }, [task]);

  // Fungsi untuk menyimpan perubahan tugas
  const handleSave = () => {
    try {
      if (!task?.id) throw new Error("Task ID is missing");
      if (!taskName.trim()) throw new Error("Title cannot be empty");

      // Konversi deadline ke format ISO jika ada
      let formattedDeadline = null;
      if (deadline) {
        const date = new Date(deadline);
        if (isNaN(date.getTime())) throw new Error("Invalid deadline format");
        formattedDeadline = date.toISOString();
      }

      // Buat objek tugas yang diperbarui
      const updatedTask = {
        ...task,
        title: taskName,
        description,
        status,
        deadline: formattedDeadline,
      };

      // Panggil onSave untuk memberi tahu parent tentang perubahan
      if (onSave) {
        onSave(updatedTask);
      }
      toast.success("Task updated", {
        description: "Your task has been successfully updated.",
      });
      onClose();
    } catch (error) {
      console.error("Error saving task:", error);
      toast.error("Error", {
        description: error.message || "Failed to save task. Please try again.",
      });
    }
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-2xl p-8 border-l max-w-lg mx-auto">
        <SheetHeader className=" -mb-1 text-left pb-6 md:px-0">
          <SheetTitle className="text-l font-semibold text-black">Task Detail</SheetTitle>
        </SheetHeader>

        <div className="space-y-4">
          {/* Task Name */}
          <div>
            <label className="text-sm font-medium">Task Name</label>
            <Input
              type="text"
              className="w-full"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              disabled={!task} // Nonaktifkan jika tidak ada task
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium">Description</label>
            <Textarea
              className="w-full"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={!task} // Nonaktifkan jika tidak ada task
            />
          </div>

          {/* Status */}
          <div>
            <label className="text-sm font-medium">Status</label>
            <Select value={status} onValueChange={setStatus} disabled={!task}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={STATUS.TODO}>{STATUS.TODO}</SelectItem>
                <SelectItem value={STATUS.INPROGRESS}>
                  {STATUS.INPROGRESS}
                </SelectItem>
                <SelectItem value={STATUS.DONE}>{STATUS.DONE}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Deadline */}
          <div>
            <label className="text-sm font-medium">Deadline</label>
            <div className="relative">
              <Input
                type="date"
                className="w-full"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                disabled={!task} // Nonaktifkan jika tidak ada task
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={onClose} className="bg-gray-300 text-gray-700 hover:bg-gray-200"> 
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-400"
              disabled={!task} // Nonaktifkan tombol Save jika tidak ada task
            >
              Save
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default DetailTaskSidebar;
