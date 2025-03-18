import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { usePathname } from 'next/navigation';

export function useWorkspaceData(initialWorkspace) {
  const pathname = usePathname();
  const slug = useMemo(() => (pathname ? pathname.split('/').pop() : null), [pathname]);
  const [workspace, setWorkspace] = useState(initialWorkspace || null);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const cardsRef = useRef(cards);

  useEffect(() => {
    if (initialWorkspace) {
      setWorkspace(initialWorkspace);
      const initialCards = initialWorkspace.cards || [];
      setCards(initialCards);
      cardsRef.current = initialCards;
      setLoading(false);
      return;
    }

    if (!slug) return;
    const workspaces = JSON.parse(localStorage.getItem('workspaces')) || [];
    const foundWorkspace = workspaces.find((ws) => ws.slug === slug);
    if (foundWorkspace) {
      setWorkspace(foundWorkspace);
      const initialCards = foundWorkspace.cards || [];
      setCards(initialCards);
      cardsRef.current = initialCards;
    }
    setLoading(false);
  }, [slug, initialWorkspace]);

  const saveToLocalStorage = useCallback((updatedCards) => {
    const workspaces = JSON.parse(localStorage.getItem('workspaces')) || [];
    const workspaceIndex = workspaces.findIndex((ws) => ws.slug === slug);
    if (workspaceIndex !== -1) {
      workspaces[workspaceIndex].cards = updatedCards;
      localStorage.setItem('workspaces', JSON.stringify(workspaces));
    }
  }, [slug]);

  const handleAddTask = useCallback((newTask) => {
    const updatedCards = [...cardsRef.current, newTask];
    setCards(updatedCards);
    cardsRef.current = updatedCards;
    saveToLocalStorage(updatedCards);
  }, []);

  return { workspace, cards, setCards, loading, handleAddTask, saveToLocalStorage, slug };
}