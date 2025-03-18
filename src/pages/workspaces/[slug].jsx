'use client';

import { useWorkspaceData } from '@/hooks/useWorkspaceData';
import { useDragAndDrop } from '@/hooks/useDragAndDrop';
import WorkspaceHeader from '@/components/workspace/WorkspaceHeader';
import StatusColumn from '@/components/workspace/StatusColumn';
import LoadingState from '@/components/workspace/LoadingState';
import NotFoundState from '@/components/workspace/NotFoundState';
import { STATUS } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PiDotsThreeOutlineFill, PiPlus, PiEye } from 'react-icons/pi';
import AppLayout from '@/components/layouts/AppLayout';
import { DndContext, closestCenter, DragOverlay } from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers'; // Tambahkan jika perlu

export default function WorkspaceShow({ workspace: initialWorkspace }) {
  
  // Ambil data workspace dan tugas menggunakan custom hook
  const { workspace, cards, setCards, loading, handleAddTask, saveToLocalStorage, slug } = useWorkspaceData(initialWorkspace);
  
  // Definisikan status yang digunakan dalam drag and drop
  const statuses = Object.values(STATUS);
  
  const { sensors, handleDragStart, handleDragEnd, dropAnimation, activeId, activeCard } = useDragAndDrop(
    cards,
    statuses,
    saveToLocalStorage,
    setCards
  );

  if (loading) return <LoadingState />;
  if (!workspace) return <NotFoundState />;

  return (
    <>
      <WorkspaceHeader workspace={workspace} />
      <div className="px-2 sm:px-4 bg">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToWindowEdges]} // Jika tidak perlu, bisa dihapus
        >
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

// Layout untuk membungkus halaman
WorkspaceShow.layout = (page) => (
  <AppLayout title={page.props.workspace?.name || 'Workspace'}>
    {page}
  </AppLayout>
);
