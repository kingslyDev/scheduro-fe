"use client";

import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { motion, AnimatePresence } from "framer-motion";
import TaskFormSheet from "@/components/task/TaskFormSheet";
import { PiPlus } from "react-icons/pi";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import TaskCard from "../task/TaskCard";
import { Skeleton } from "@/components/ui/skeleton";

const StatusColumn = React.memo(
  ({
    status,
    tasks,
    slug,
    onAddTask,
    activeId,
    onTaskUpdate,
    isLoading = false,
  }) => {
    const { setNodeRef, isOver } = useDroppable({ id: status });
    const filteredTask = tasks.filter((task) => task.status === status);

    if (isLoading) {
      return (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full sm:w-1/4 flex flex-col h-full"
        >
          <div className="flex items-center justify-between mb-4 px-4 shrink-0">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
          <div className="flex-1 flex flex-col space-y-4 bg-gray-50 p-3 rounded-lg overflow-y-auto">
            {[...Array(3)].map((_, index) => (
              <TaskCard key={index} isLoading={true} />
            ))}
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full sm:w-1/4 flex flex-col h-full"
      >
        <div className="flex items-center justify-between mb-4 px-4 shrink-0">
          <span className="text-xl font-semibold text-gray-800">{status}</span>
          <TaskFormSheet
            slug={slug}
            onAddTask={onAddTask}
            initialStatus={status}
            trigger={
              <div className="h-8 w-8 flex items-center justify-center rounded-full bg-blue-100 hover:bg-blue-200 transition-colors duration-200">
                <PiPlus className="h-5 w-5 text-blue-600 cursor-pointer" />
              </div>
            }
          />
        </div>
        <div
          ref={setNodeRef}
          className={`flex-1 flex flex-col space-y-4 bg-gray-50 p-3 rounded-lg overflow-y-auto
            transition-colors duration-300 ease-in-out
            ${
              isOver && status === "In Progress"
                ? "bg-blue-50 ring-2 ring-blue-300"
                : ""
            }
            ${
              isOver && status === "Done"
                ? "bg-green-50 ring-2 ring-green-300"
                : ""
            }
          `}
        >
          <SortableContext
            items={filteredTask.map((task) => task.id)}
            strategy={verticalListSortingStrategy}
          >
            <AnimatePresence>
              {filteredTask.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {filteredTask.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      status={status}
                      isActive={task.id === activeId}
                      onTaskUpdate={onTaskUpdate}
                      slug={slug}
                      isLoading={false}
                    />
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-center h-24 text-gray-500 text-sm italic"
                >
                  Drag tasks here to get started
                </motion.div>
              )}
            </AnimatePresence>
          </SortableContext>
        </div>
      </motion.div>
    );
  }
);

StatusColumn.displayName = "StatusColumn";

export default StatusColumn;
