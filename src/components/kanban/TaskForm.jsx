import { useState } from "react";

export default function TaskForm({ workspaceId, onAddTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: Date.now(), // ID sederhana berdasarkan timestamp
      workspaceId,
      title,
      description,
      status: "To Do",
      progress: 0,
      deadline: new Date(deadline),
      isAiGenerated: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    onAddTask(newTask);
    setTitle("");
    setDescription("");
    setDeadline("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-50 rounded-lg mb-4">
      <h3 className="text-lg font-semibold mb-2">Add New Task</h3>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Add Task
      </button>
    </form>
  );
}