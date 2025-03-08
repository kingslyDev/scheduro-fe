// Mengambil data dari localStorage
export const getData = () => {
  const workspaces = JSON.parse(localStorage.getItem("workspaces")) || [];
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  return { workspaces, tasks };
};

// Menyimpan data ke localStorage
export const saveData = (workspaces, tasks) => {
  localStorage.setItem("workspaces", JSON.stringify(workspaces));
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Inisialisasi data default jika localStorage kosong
export const initializeData = () => {
  const { workspaces, tasks } = getData();
  if (workspaces.length === 0) {
    const defaultWorkspaces = [
      {
        userId: 1,
        id: 1,
        name: "Tech Innovators",
        logoUrl: "https://example.com/logos/tech-innovators.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    const defaultTasks = [
      {
        id: 1,
        workspaceId: 1,
        title: "Research New Tech",
        description: "Explore new AI trends and their applications.",
        status: "On Going",
        progress: 0,
        deadline: new Date("2025-04-01"),
        isAiGenerated: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        workspaceId: 1,
        title: "Design Marketing Strategy",
        description: "Develop a social media marketing plan.",
        status: "To Do",
        progress: 10,
        deadline: new Date("2025-03-15"),
        isAiGenerated: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        workspaceId: 1,
        title: "Client Proposal",
        description: "Draft and finalize proposal for new client.",
        status: "Done",
        progress: 70,
        deadline: new Date("2025-03-20"),
        isAiGenerated: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    saveData(defaultWorkspaces, defaultTasks);
  }
};
