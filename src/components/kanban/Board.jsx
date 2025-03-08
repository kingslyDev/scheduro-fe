import { DndContext, closestCenter } from "@dnd-kit/core";
import Column from "./Column";
import { getData, saveData } from "../../../utils/storage";

export default function KanbanBoard({ workspaceId, tasks, setTasks }) {
  // Tambahkan pengecekan untuk memastikan tasks tidak undefined
  if (!tasks) {
    return <div>Loading tasks...</div>;
  }

  const columns = {
    "To Do": tasks.filter((task) => task.status === "To Do"),
    "On Going": tasks.filter((task) => task.status === "On Going"),
    Done: tasks.filter((task) => task.status === "Done"),
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;
    const sourceColumn = active.data.current.sortable.containerId;
    const destColumn = over.data.current?.sortable?.containerId;

    const updatedTasks = [...tasks];
    const taskIndex = updatedTasks.findIndex((task) => task.id === activeId);

    // Jika dipindahkan ke kolom lain
    if (sourceColumn !== destColumn) {
      updatedTasks[taskIndex].status = destColumn;
      updatedTasks[taskIndex].updatedAt = new Date();
    }

    setTasks(updatedTasks);
    const { workspaces } = getData();
    saveData(workspaces, updatedTasks);
  };

  return (
    <div className="flex justify-center p-4">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        {Object.entries(columns).map(([status, columnTasks]) => (
          <Column
            key={status}
            id={status}
            title={status}
            tasks={columnTasks}
          />
        ))}
      </DndContext>
    </div>
  );
}