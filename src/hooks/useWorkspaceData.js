import { useState, useEffect, useMemo, useCallback } from "react";
import { usePathname } from "next/navigation";

export function useWorkspaceData(initialWorkspace) {
  const pathname = usePathname();
  const slug = useMemo(
    () => (pathname ? pathname.split("/").pop() : null),
    [pathname]
  );
  const [workspace, setWorkspace] = useState(initialWorkspace || null);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  // Muat data workspace dan cards dari localStorage atau initialWorkspace
  useEffect(() => {
    try {
      setLoading(true);

      if (initialWorkspace) {
        setWorkspace(initialWorkspace);
        const initialCards = initialWorkspace.cards || []; // Pastikan initialCards ada
        setCards(initialCards);
        setLoading(false);
        return;
      }

      if (!slug) {
        setLoading(false);
        return;
      }

      const workspaces = JSON.parse(localStorage.getItem("workspaces")) || [];
      const foundWorkspace = workspaces.find((ws) => ws.slug === slug);
      if (foundWorkspace) {
        setWorkspace(foundWorkspace);
        const initialCards = foundWorkspace.cards || [];
        setCards(initialCards);
      } else {
        setWorkspace(null);
        setCards([]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error loading workspace data:", error);
      setWorkspace(null);
      setCards([]);
      setLoading(false);
    }
  }, [slug, initialWorkspace]);

  // Simpan cards ke localStorage
  const saveToLocalStorage = useCallback(
    (updatedCards) => {
      try {
        const workspaces = JSON.parse(localStorage.getItem("workspaces")) || [];
        const workspaceIndex = workspaces.findIndex((ws) => ws.slug === slug);
        if (workspaceIndex !== -1) {
          workspaces[workspaceIndex] = {
            ...workspaces[workspaceIndex], // Pertahankan properti lain dari workspace
            cards: updatedCards,
          };
          localStorage.setItem("workspaces", JSON.stringify(workspaces));
        } else {
          // Jika workspace tidak ditemukan, tambahkan workspace baru
          const newWorkspace = { slug, name: slug, cards: updatedCards };
          workspaces.push(newWorkspace);
          localStorage.setItem("workspaces", JSON.stringify(workspaces));
          setWorkspace(newWorkspace);
        }
      } catch (error) {
        console.error("Error saving to localStorage:", error);
        // Tambahkan notifikasi atau penanganan error di sini jika diperlukan
      }
    },
    [slug]
  );

  // Tambah tugas baru
  const handleAddTask = useCallback(
    (newTask) => {
      const updatedCards = [...cards, { ...newTask, id: Date.now() }]; // Tambahkan ID unik
      setCards(updatedCards);
      saveToLocalStorage(updatedCards);
    },
    [cards, saveToLocalStorage]
  );

  return {
    workspace,
    cards,
    setCards,
    loading,
    handleAddTask,
    saveToLocalStorage,
    slug,
  };
}
