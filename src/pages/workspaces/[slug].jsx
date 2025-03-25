"use client";

import { useState, useEffect } from "react";
import { useWorkspaceData } from "@/hooks/useWorkspaceData";
import { useDragAndDrop } from "@/hooks/useDragAndDrop";
import WorkspaceHeader from "@/components/workspace/WorkspaceHeader";
import StatusColumn from "@/components/workspace/StatusColumn";
import NotFoundState from "@/components/workspace/NotFoundState";
import { STATUS } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import AppLayout from "@/components/layouts/AppLayout";
import { DndContext, closestCenter, DragOverlay } from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";

export default function WorkspaceShow({ workspace: initialWorkspace }) {
  const {
    workspace,
    tasks,
    setTask,
    loading,
    handleAddTask,
    saveToLocalStorage,
    slug,
  } = useWorkspaceData(initialWorkspace);

  const statuses = Object.values(STATUS);

  const {
    sensors,
    handleDragStart,
    handleDragEnd,
    dropAnimation,
    activeId,
    activeCard,
  } = useDragAndDrop(tasks, statuses, saveToLocalStorage, setTask);

  const [isCheckingWorkspace, setIsCheckingWorkspace] = useState(true);

  useEffect(() => {
    if (!loading) {
      const timeout = setTimeout(() => {
        setIsCheckingWorkspace(false);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [loading]);

  const handleTaskUpdate = (taskToUpdate, deletedId) => {
    let updatedTasks = [...tasks];
    if (taskToUpdate) {
      updatedTasks = updatedTasks.map((task) =>
        task.id === taskToUpdate.id ? taskToUpdate : task
      );
    } else if (deletedId) {
      updatedTasks = updatedTasks.filter((task) => task.id !== deletedId);
    }
    setTask(updatedTasks);
    saveToLocalStorage(updatedTasks);
  };

  if (loading || isCheckingWorkspace) {
    return (
      <div className="h-screen overflow-hidden flex flex-col">
        <WorkspaceHeader
          workspace={workspace || { name: "Loading..." }}
          className="shrink-0"
        />
        <div className="flex-1 px-2 sm:px-4 overflow-hidden">
          <div className="mt-4 flex w-full flex-col sm:flex-row gap-4 justify-between h-full overflow-y-auto">
            {statuses.map((status) => (
              <StatusColumn
                key={status}
                status={status}
                tasks={[]}
                slug={slug}
                onAddTask={handleAddTask}
                activeId={activeId}
                onTaskUpdate={handleTaskUpdate}
                isLoading={true}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!workspace) return <NotFoundState />;

  return (
    <div className="h-screen overflow-hidden flex flex-col">
      <WorkspaceHeader workspace={workspace} className="shrink-0" />
      <div className="flex-1 px-2 sm:px-4 overflow-hidden">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToWindowEdges]}
        >
          <div className="mt-4 flex w-full flex-col sm:flex-row gap-4 justify-between h-full overflow-y-auto">
            {statuses.map((status) => (
              <StatusColumn
                key={status}
                status={status}
                tasks={tasks}
                slug={slug}
                onAddTask={handleAddTask}
                activeId={activeId}
                onTaskUpdate={handleTaskUpdate}
                isLoading={false}
              />
            ))}
          </div>
          <DragOverlay dropAnimation={dropAnimation}>
            {activeId && activeCard ? (
              <Card className="w-full rounded-xl shadow-lg bg-white border-2 opacity-90 overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="line-clamp-2 text-base">
                      {activeCard.title}
                    </CardTitle>
                    <PiDotsThreeOutlineFill className="size-4" />
                  </div>
                  <CardDescription className="line-clamp-4">
                    {activeCard.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}

WorkspaceShow.layout = (page) => (
  <AppLayout title={page.props.workspace?.name || "Workspace"}>
    {page}
  </AppLayout>
);
