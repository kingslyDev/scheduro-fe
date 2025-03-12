import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';
import { PiDotsThreeOutlineFill, PiEye } from 'react-icons/pi';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import GetPriorityBadge from '@/components/task/GetPriorityBadge';

const CardItem = React.memo(({ card, status, isActive }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card.id,
    data: { status },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <motion.div
      layout
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={`
          relative rounded-xl transition-all duration-200
          ${isDragging ? 'opacity-50' : 'opacity-100'}
          ${isActive ? 'z-10' : 'z-0'}
          hover:shadow-md hover:translate-y-[-2px]
          active:shadow-inner active:translate-y-[0px]
          cursor-grab bg-white
          border border-transparent hover:border-blue-200
        `}
      >
        <CardHeader className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CardTitle className="line-clamp-2 text-base">{card.title}</CardTitle>
              <PiEye className="size-4 text-gray-500 cursor-pointer transition-colors hover:text-blue-500" />
            </div>
            <div className="relative group">
              <PiDotsThreeOutlineFill className="size-4 cursor-pointer transition-colors hover:text-red-500" />
              <div className="absolute right-0 mt-1 w-32 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                <div className="py-1">
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50">Edit</button>
                  <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">Delete</button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-2">
            <GetPriorityBadge priority={card.priority} />
          </div>
          <CardDescription className="line-clamp-4 mt-2">{card.description}</CardDescription>
          <div className="absolute bottom-2 right-2 flex space-x-0.5">
            <div className="w-1 h-1 rounded-full bg-gray-300"></div>
            <div className="w-1 h-1 rounded-full bg-gray-300"></div>
            <div className="w-1 h-1 rounded-full bg-gray-300"></div>
          </div>
        </CardHeader>
      </Card>
    </motion.div>
  );
});

CardItem.displayName = 'CardItem';

export default CardItem;