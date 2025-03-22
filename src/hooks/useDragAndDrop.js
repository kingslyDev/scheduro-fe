"use client";

import { useState, useCallback, useMemo, useRef } from "react";
import {
  PointerSensor,
  useSensor,
  useSensors,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { toast } from "sonner"; // Impor toast

export function useDragAndDrop(cards, statuses, saveToLocalStorage, setCards) {
  const [activeId, setActiveId] = useState(null);
  const [activeCard, setActiveCard] = useState(null);
  const cardsRef = useRef(cards);

  cardsRef.current = cards;

  const sensors = useSensors(useSensor(PointerSensor));

  const dropAnimation = useMemo(
    () => ({
      sideEffects: defaultDropAnimationSideEffects({
        styles: {
          active: {
            opacity: "0.5",
          },
        },
      }),
    }),
    []
  );

  const handleDragStart = useCallback((event) => {
    const { active } = event;
    setActiveId(active.id);
    const draggedCard = cardsRef.current.find((card) => card.id === active.id);
    setActiveCard(draggedCard);
  }, []);

  const handleDragEnd = useCallback(
    (event) => {
      const { active, over } = event;

      setActiveId(null);
      setActiveCard(null);

      if (!over || active.id === over.id) return;

      const oldIndex = cardsRef.current.findIndex(
        (card) => card.id === active.id
      );
      if (oldIndex === -1) return;

      const updatedCards = [...cardsRef.current];
      const draggedCard = updatedCards[oldIndex];

      if (statuses.includes(over.id)) {
        const oldStatus = draggedCard.status; // Simpan status lama
        draggedCard.status = over.id; // Perbarui status
        const newStatus = draggedCard.status;

        // Tampilkan toast jika status berubah
        if (oldStatus !== newStatus) {
          toast.success("Status updated", {
            description: `Task "${draggedCard.title}" has been moved to "${newStatus}".`,
          });
        }

        const newCards = [
          ...updatedCards.filter((card) => card.id !== active.id),
          draggedCard,
        ];
        setCards(newCards);
        saveToLocalStorage(newCards);
      } else {
        const newIndex = cardsRef.current.findIndex(
          (card) => card.id === over.id
        );
        if (newIndex === -1) return;

        const overCardStatus = cardsRef.current[newIndex].status;
        const oldStatus = draggedCard.status; // Simpan status lama
        if (draggedCard.status !== overCardStatus) {
          draggedCard.status = overCardStatus;
          const newStatus = draggedCard.status;

          // Tampilkan toast jika status berubah
          if (oldStatus !== newStatus) {
            toast.success("Status updated", {
              description: `Task "${draggedCard.title}" has been moved to "${newStatus}".`,
            });
          }
        }

        const newCards = arrayMove(updatedCards, oldIndex, newIndex);
        setCards(newCards);
        saveToLocalStorage(newCards);
      }
    },
    [statuses, saveToLocalStorage, setCards]
  );

  return {
    sensors,
    handleDragStart,
    handleDragEnd,
    dropAnimation,
    activeId,
    activeCard,
  };
}
