'use client';

import { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragOverlay, defaultDropAnimationSideEffects } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PiDotsThreeOutlineFill, PiPlus, PiEye } from 'react-icons/pi';
import AppLayout from '@/components/layouts/AppLayout';
import { STATUS } from '@/lib/utils';
import GetPriorityBadge from '@/components/GetPriorityBadge';
import TaskFormSheet from '@/components/TaskFormSheet';
import { AnimatePresence, motion } from 'framer-motion';

export default function WorkspaceShow() {
  const pathname = usePathname();
  const slug = useMemo(() => (pathname ? pathname.split('/').pop() : null), [pathname]);
  const [workspace, setWorkspace] = useState(null);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState(null);
  const [activeCard, setActiveCard] = useState(null);
  const cardsRef = useRef(cards); // Cache cards untuk akses cepat

  const statuses = useMemo(() => Object.values(STATUS), []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 5,
      },
    })
  );

  useEffect(() => {
    if (!slug) return;
    const workspaces = JSON.parse(localStorage.getItem('workspaces')) || [];
    const foundWorkspace = workspaces.find((ws) => ws.slug === slug);
    if (foundWorkspace) {
      setWorkspace(foundWorkspace);
      const initialCards = foundWorkspace.cards || [];
      setCards(initialCards);
      cardsRef.current = initialCards; // Simpan di ref
    }
    setLoading(false);
  }, [slug]);

  const handleDragStart = useCallback((event) => {
    const { active } = event;
    setActiveId(active.id);
    const draggedCard = cardsRef.current.find((card) => card.id === active.id);
    setActiveCard(draggedCard);
  }, []);

  const dropAnimation = useMemo(
    () => ({
      sideEffects: defaultDropAnimationSideEffects({
        styles: {
          active: {
            opacity: '0.5',
          },
        },
      }),
    }),
    []
  );

  const handleDragEnd = useCallback(
    (event) => {
      const { active, over } = event;

      setActiveId(null);
      setActiveCard(null);

      if (!over || active.id === over.id) return;

      const oldIndex = cardsRef.current.findIndex((card) => card.id === active.id);
      if (oldIndex === -1) return;

      const updatedCards = [...cardsRef.current];
      const draggedCard = updatedCards[oldIndex];

      if (statuses.includes(over.id)) {
        draggedCard.status = over.id;
        const newCards = [...updatedCards.filter((card) => card.id !== active.id), draggedCard];
        setCards(newCards);
        cardsRef.current = newCards;
        saveToLocalStorage(newCards);
      } else {
        const newIndex = cardsRef.current.findIndex((card) => card.id === over.id);
        if (newIndex === -1) return;

        const overCardStatus = cardsRef.current[newIndex].status;
        if (draggedCard.status !== overCardStatus) {
          draggedCard.status = overCardStatus;
        }

        const newCards = arrayMove(updatedCards, oldIndex, newIndex);
        setCards(newCards);
        cardsRef.current = newCards;
        saveToLocalStorage(newCards);
      }
    },
    [statuses]
  );

  const saveToLocalStorage = useCallback(
    (updatedCards) => {
      const workspaces = JSON.parse(localStorage.getItem('workspaces')) || [];
      const workspaceIndex = workspaces.findIndex((ws) => ws.slug === slug);
      if (workspaceIndex !== -1) {
        workspaces[workspaceIndex].cards = updatedCards;
        localStorage.setItem('workspaces', JSON.stringify(workspaces));
      }
    },
    [slug]
  );

  const handleAddTask = useCallback((newTask) => {
    const updatedCards = [...cardsRef.current, newTask];
    setCards(updatedCards);
    cardsRef.current = updatedCards;
    saveToLocalStorage(updatedCards);
  }, []);

  if (loading) return <LoadingState />;
  if (!workspace) return <NotFoundState />;

  return (
    <>
      <WorkspaceHeader workspace={workspace} />
      <div className="px-2 sm:px-4">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd} modifiers={[restrictToWindowEdges]}>
          <div className="mt-8 flex w-full flex-col sm:flex-row gap-16 justify-between">
            {statuses.map((status) => (
              <StatusColumn key={status} status={status} cards={cards} slug={slug} onAddTask={handleAddTask} activeId={activeId} />
            ))}
          </div>
          <DragOverlay dropAnimation={dropAnimation}>
            {activeId && activeCard ? (
              <Card className="w-full rounded-xl shadow-lg bg-white border-2 opacity-90">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="line-clamp-2 text-base">{activeCard.title}</CardTitle>
                    <PiDotsThreeOutlineFill className="size-4" />
                  </div>
                  <CardDescription className="line-clamp-4">{activeCard.description}</CardDescription>
                </CardHeader>
              </Card>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </>
  );
}

// Komponen Loading dan NotFound dipisah untuk reusable
const LoadingState = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-pulse text-center">
      <div className="h-8 w-48 bg-gray-200 rounded mb-4 mx-auto"></div>
      <p className="text-gray-500">Loading workspace...</p>
    </div>
  </div>
);

const NotFoundState = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="text-center p-8 bg-red-50 rounded-lg shadow-sm">
      <p className="text-red-500 font-medium text-lg">Workspace not found</p>
      <p className="text-gray-500 mt-2">The workspace you're looking for doesn't exist or has been deleted.</p>
    </div>
  </div>
);

// Komponen Header Workspace
const WorkspaceHeader = ({ workspace }) => (
  <div>
    <div className="h-32 w-full overflow-hidden lg:h-48">
      <img className="h-full w-full object-cover" src={workspace.cover || 'https://i.pinimg.com/736x/a0/31/74/a03174546a0994fa4712d96056a0c0c8.jpg'} alt={workspace.name} />
    </div>
    <div className="px-2 sm:px-4">
      <div className="-mt-12 sm:flex sm:items-center sm:space-x-5">
        <div className="flex">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.3 }}>
            <img
              className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32 shadow-md transition-all duration-300"
              src={workspace.logo || 'https://res.cloudinary.com/dwgwb5vro/image/upload/v1741287175/splash_ymsobt.png'}
              alt={workspace.name}
            />
          </motion.div>
        </div>
        <div className="mt-6 flex-1">
          <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4 }}>
            <CardTitle className="text-4xl">{workspace.name || 'Unnamed Workspace'}</CardTitle>
          </motion.div>
        </div>
      </div>
    </div>
  </div>
);

// Komponen Kolom Status
const StatusColumn = ({ status, cards, slug, onAddTask, activeId }) => {
  const { setNodeRef, isOver } = useDroppable({ id: status });
  const filteredCards = useMemo(() => cards.filter((card) => card.status === status), [cards, status]);

  return (
    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4 }} className="w-full sm:w-1/4 flex flex-col">
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
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center h-24 text-gray-400 text-sm italic">
                Drop tasks here
              </motion.div>
            )}
          </AnimatePresence>
        </SortableContext>
      </div>
    </motion.div>
  );
};

// Komponen CardItem
const CardItem = ({ card, status, isActive }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card.id,
    data: { status },
  });

  const style = useMemo(
    () => ({
      transform: CSS.Transform.toString(transform),
      transition,
    }),
    [transform, transition]
  );

  return (
    <motion.div layout initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} transition={{ duration: 0.2 }}>
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
};

WorkspaceShow.layout = (page) => <AppLayout title={page.props.workspace?.name || 'Workspace'}>{page}</AppLayout>;
