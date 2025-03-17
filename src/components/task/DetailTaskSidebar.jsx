import { useState } from "react";
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
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { CalendarIcon, UploadIcon } from "lucide-react";

const DetailTaskSidebar = ({ open, onClose, task, onSave }) => {
  const [taskName, setTaskName] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [status, setStatus] = useState(task?.status || "To Do");
  const [startDate, setStartDate] = useState(task?.startDate || "");
  const [dueDate, setDueDate] = useState(task?.dueDate || "");
  const [file, setFile] = useState(null);

  const handleSave = () => {
    onSave({ ...task, title: taskName, description, status, startDate, dueDate });
    onClose();
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-2xl p-8 border-l">
        <SheetHeader className="text-left pb-6">
          <SheetTitle className="text-xl font-bold">Task Detail</SheetTitle>
        </SheetHeader>

        <div className="space-y-6">
          {/* File Display Section */}
          <div className="border rounded-lg p-4 relative">
            <img src="/flowchart-sample.png" alt="Task Attachment" className="w-full rounded-md" />
            <label className="absolute bottom-2 right-2 text-blue-500 cursor-pointer flex items-center text-sm">
              <UploadIcon className="w-4 h-4 mr-1" /> Edit File
              <input type="file" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
            </label>
          </div>

          {/* Task Name */}
          <div>
            <label className="text-sm font-medium">Task Name</label>
            <Input type="text" className="w-full" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium">Description</label>
            <Textarea className="w-full" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>

          {/* Status */}
          <div>
            <label className="text-sm font-medium">Status</label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="To Do">To Do</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Done">Done</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Start Date</label>
              <div className="relative">
                <Input type="date" className="w-full" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Due Date</label>
              <div className="relative">
                <Input type="date" className="w-full" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSave} className="bg-blue-500 text-white">Save</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default DetailTaskSidebar;