"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { CalendarIcon, UploadIcon } from "lucide-react";

const AddTaskSidebar = ({ open, onClose }) => {
  const [title, setTitle] = useState("");
  const [workspace, setWorkspace] = useState("frontend");
  const [priority, setPriority] = useState("medium");
  const [status, setStatus] = useState("todo");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSave = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("workspace", workspace);
    formData.append("priority", priority);
    formData.append("status", status);
    formData.append("description", description);
    formData.append("deadline", deadline);
    if (file) formData.append("file", file);
    
    console.log("Task data:", Object.fromEntries(formData.entries()));
    onClose();
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-2xl max-h-screen overflow-y-auto p-0 border-l">
        <div className="h-full flex flex-col p-8">
          <SheetHeader className="text-left pb-6">
            <SheetTitle className="text-xl font-bold">Add Task</SheetTitle>
            <p className="text-sm text-muted-foreground">Add new task</p>
          </SheetHeader>

          <div className="space-y-6 flex-1 overflow-y-auto max-h-[70vh]">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input type="text" placeholder="Enter title" className="w-full" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Workspace</label>
              <Select value={workspace} onValueChange={setWorkspace}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select workspace" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="frontend">Frontend</SelectItem>
                  <SelectItem value="backend">Backend</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Priority</label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todo">To Do</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea placeholder="Enter description" className="min-h-[150px] resize-none w-full" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">File</label>
              <div className="flex items-center border rounded-md px-3 py-2 bg-background hover:bg-accent/50 cursor-pointer w-full">
                <Input type="file" className="hidden" id="file-upload" onChange={handleFileChange} />
                <label htmlFor="file-upload" className="flex items-center cursor-pointer w-full">
                  <UploadIcon className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground">{file ? file.name : "Select attachment"}</span>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Deadline</label>
              <div className="relative w-full">
                <Input type="date" className="w-full" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
                <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-8">
            <Button variant="outline" onClick={onClose} className="w-32 bg-gray-300 text-gray-700">
              Cancel
            </Button>
            <Button onClick={handleSave} className="w-32 bg-blue-300 text-white hover:bg-blue-500">
              Save
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AddTaskSidebar;
