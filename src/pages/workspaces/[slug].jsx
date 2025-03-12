'use client';

import { useWorkspaceData } from '@/hooks/useWorkspaceData';
import { useDragAndDrop } from '@/hooks/useDragAndDrop';
import WorkspaceHeader from '@/components/workspace/WorkspaceHeader';
import StatusColumn from '@/components/workspace/StatusColumn';
import LoadingState from '@/components/workspace/LoadingState';
import NotFoundState from '@/components/workspace/NotFoundState';
import { STATUS } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PiDotsThreeOutlineFill } from 'react-icons/pi';
import { DndContext, closestCenter, DragOverlay } from '@dnd-kit/core';

export default function WorkspaceShow({ workspace: initialWorkspace }) {
  
  // Destrukturisasi semua variabel yang diperlukan dari useWorkspaceData
  const { workspace, cards, setCards, loading, handleAddTask, saveToLocalStorage, slug } = useWorkspaceData(initialWorkspace);
  
  // Definisikan statuses sebelum digunakan di useDragAndDrop
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
      <div className="px-2 sm:px-4">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
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

WorkspaceShow.layout = (page) => <AppLayout title={page.props.workspace?.name || 'Workspace'}>{page}</AppLayout>;