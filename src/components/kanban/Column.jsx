import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import TaskCard from "./TaskCard";

export default function Column({ id, title, tasks }) {
  return (
    <div className="w-80 bg-gray-100 p-4 m-2 rounded-lg">
      <h2 className="text-lg font-bold mb-4">{title}</h2>
      <SortableContext
        id={id}
        items={tasks.map((task) => task.id)}
        strategy={verticalListSortingStrategy}
      >
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </SortableContext>
    </div>
  );
}