import { useState, useEffect } from "react";
import { getData, initializeData, saveData } from "../../../utils/storage";
import KanbanBoard from "@/components/kanban/Board";
import TaskForm from "@/components/kanban/TaskForm";

export default function Workspace() {
  const [workspaces, setWorkspaces] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);

  useEffect(() => {
    initializeData();
    const { workspaces, tasks } = getData();
    setWorkspaces(workspaces);
    setTasks(tasks);
    setSelectedWorkspace(workspaces[0]); // Pilih workspace pertama secara default
  }, []);

  const handleAddTask = (newTask) => {
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveData(workspaces, updatedTasks);
  };

  if (!selectedWorkspace) return <div>Loading...</div>;

  const workspaceTasks = tasks.filter(
    (task) => task.workspaceId === selectedWorkspace.id
  );

  return (
    <div>
      <h2 className="text-2xl font-bold p-4">{selectedWorkspace.name}</h2>
      <TaskForm workspaceId={selectedWorkspace.id} onAddTask={handleAddTask} />
      {tasks.length === 0 ? (
        <p>No tasks available yet.</p>
      ) : (
        <KanbanBoard
          workspaceId={selectedWorkspace.id}
          tasks={workspaceTasks}
          setTasks={setTasks}
        />
      )}
    </div>
  );
}