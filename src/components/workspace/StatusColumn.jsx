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

const StatusColumn = React.memo(
  ({ status, cards, slug, onAddTask, activeId, onTaskUpdate }) => {
    const { setNodeRef, isOver } = useDroppable({ id: status });
    const filteredCards = cards.filter((card) => card.status === status);

    return (
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full sm:w-1/4 flex flex-col max-h-screen" // Batasi tinggi maksimum ke layar
      >
        {/* Header Kolom */}
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

        {/* Container untuk daftar task */}
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
            items={filteredCards.map((card) => card.id)}
            strategy={verticalListSortingStrategy}
          >
            <AnimatePresence>
              {filteredCards.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {filteredCards.map((card) => (
                    <TaskCard
                      key={card.id}
                      card={card}
                      status={status}
                      isActive={card.id === activeId}
                      onTaskUpdate={onTaskUpdate}
                      slug={slug}
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
