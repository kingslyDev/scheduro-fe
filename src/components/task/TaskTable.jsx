"use client";

const TaskTable = () => {
  const tasks = [
    { id: 1, title: "Fetch and Display API Data", status: "Ongoing", startDate: "27 Feb 2025", dueDate: "4 Mar 2025" },
    { id: 2, title: "Integrate API with Frontend", status: "Ongoing", startDate: "1 Mar 2025", dueDate: "7 Mar 2025" },
    { id: 3, title: "Set Up a Rest API", status: "To Do", startDate: "15 Mar 2025", dueDate: "22 Mar 2025" },
    { id: 4, title: "Build Interactive Prototype", status: "Done", startDate: "25 Feb 2025", dueDate: "2 Mar 2025" },
    { id: 5, title: "Make a Login Page", status: "To Do", startDate: "19 Apr 2025", dueDate: "25 Apr 2025" },
    { id: 6, title: "User Research & Persona Creation", status: "Done", startDate: "19 Feb 2025", dueDate: "25 Feb 2025" },
  ];

  // Warna status yang sesuai dengan gambar
  const statusColors = {
    "Ongoing": "bg-[#4F74E8] text-white",  // Biru sedang
    "To Do": "bg-[#2C3E72] text-white",   // Biru tua
    "Done": "bg-[#A4B8E2] text-white",    // Biru muda
  };

  return (
    <div className="overflow-x-auto p-4">
      <table className="w-full border border-gray-200 rounded-lg">
        <thead>
          <tr className="bg-[#E6EEFF]">
            <th className="text-left py-3 px-4 font-medium text-gray-700">Title</th>
            <th className="text-center py-3 px-4 font-medium text-gray-700">Status</th> {/* Rata tengah */}
            <th className="text-left py-3 px-4 font-medium text-gray-700">Start Date</th>
            <th className="text-left py-3 px-4 font-medium text-gray-700">Due Date</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="border-t border-gray-100">
              <td className="py-4 px-4">{task.title}</td>
              <td className="py-4 px-4 text-center"> {/* Rata tengah */}
                <div className="flex justify-center">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[task.status]}`}>
                    {task.status}
                  </span>
                </div>
              </td>
              <td className="py-4 px-4">{task.startDate}</td>
              <td className="py-4 px-4">{task.dueDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
