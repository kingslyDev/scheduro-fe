'use client';

import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { motion, AnimatePresence } from 'framer-motion';
import TaskFormSheet from '@/components/task/TaskFormSheet';
import { PiPlus } from 'react-icons/pi';
import CardItem from './CardItem';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

const StatusColumn = React.memo(({ status, cards, slug, onAddTask, activeId }) => {
  const { setNodeRef, isOver } = useDroppable({ id: status });
  const filteredCards = cards.filter((card) => card.status === status);
  console.log('Filtered cards for', status, ':', filteredCards); // Tambahkan debugging

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full sm:w-1/4 flex flex-col"
    >
      <div className="flex items-center justify-between mb-3 px-2">
        <span className="text-base font-semibold">{status}</span>
        <TaskFormSheet
          slug={slug}
          onAddTask={onAddTask}
          initialStatus={status}
          trigger={
            <div className="h-6 w-6 flex items-center justify-center rounded-full hover:bg-red-100 transition-colors duration-200">
              <PiPlus className="h-4 w-4 text-foreground hover:text-red-500 cursor-pointer" />
            </div>
          }
        />
      </div>
      <div
        ref={setNodeRef}
        className={`
          flex-grow space-y-4 bg-gray-50 p-3 rounded-lg min-h-[70vh]
          transition-colors duration-300 ease-in-out
          ${isOver && status === 'In Progress' ? 'bg-blue-50 ring-2 ring-blue-300' : ''}
          ${isOver && status === 'Done' ? 'bg-green-50 ring-2 ring-green-300' : ''}
        `}
      >
        <SortableContext items={filteredCards.map((card) => card.id)} strategy={verticalListSortingStrategy}>
          <AnimatePresence>
            {filteredCards.length > 0 ? (
              <div className="flex flex-col gap-4 min-h-[100px]">
                {filteredCards.map((card) => (
                  <CardItem key={card.id} card={card} status={status} isActive={card.id === activeId} />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center h-24 text-gray-400 text-sm italic"
              >
                Drop tasks here
              </motion.div>
            )}
          </AnimatePresence>
        </SortableContext>
      </div>
    </motion.div>
  );
});

StatusColumn.displayName = 'StatusColumn';

export default StatusColumn;