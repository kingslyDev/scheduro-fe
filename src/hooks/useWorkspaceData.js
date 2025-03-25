import { useState, useEffect, useMemo, useCallback } from "react";
import { usePathname } from "next/navigation";

export function useWorkspaceData(initialWorkspace) {
  const pathname = usePathname();
  const slug = useMemo(
    () => (pathname ? pathname.split("/").pop() : null),
    [pathname]
  );
  const [workspace, setWorkspace] = useState(initialWorkspace || null);
  const [tasks, setTask] = useState([]);
  const [loading, setLoading] = useState(true);

  // Muat data workspace dan tasks dari localStorage atau initialWorkspace
  useEffect(() => {
    try {
      setLoading(true);

      if (initialWorkspace) {
        setWorkspace(initialWorkspace);
        const initialTask = initialWorkspace.tasks || []; // Pastikan initialTask ada
        setTask(initialTask);
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
        const initialTask = foundWorkspace.tasks || [];
        setTask(initialTask);
      } else {
        setWorkspace(null);
        setTask([]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error loading workspace data:", error);
      setWorkspace(null);
      setTask([]);
      setLoading(false);
    }
  }, [slug, initialWorkspace]);

  // Simpan tasks ke localStorage
  const saveToLocalStorage = useCallback(
    (updatedTask) => {
      try {
        const workspaces = JSON.parse(localStorage.getItem("workspaces")) || [];
        const workspaceIndex = workspaces.findIndex((ws) => ws.slug === slug);
        if (workspaceIndex !== -1) {
          workspaces[workspaceIndex] = {
            ...workspaces[workspaceIndex], // Pertahankan properti lain dari workspace
            tasks: updatedTask,
          };
          localStorage.setItem("workspaces", JSON.stringify(workspaces));
        } else {
          // Jika workspace tidak ditemukan, tambahkan workspace baru
          const newWorkspace = { slug, name: slug, tasks: updatedTask };
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
      const updatedTask = [...tasks, { ...newTask, id: Date.now() }]; // Tambahkan ID unik
      setTask(updatedTask);
      saveToLocalStorage(updatedTask);
    },
    [tasks, saveToLocalStorage]
  );

  return {
    workspace,
    tasks,
    setTask,
    loading,
    handleAddTask,
    saveToLocalStorage,
    slug,
  };
}
