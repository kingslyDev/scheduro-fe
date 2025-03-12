import { Badge } from "@/components/ui/badge";
import { PRIORITY } from "@/lib/utils";

export default function GetPriorityBadge({ priority }) {
  console.log("Priority received:", priority); // Debugging

  const { HIGH, MEDIUM, LOW } = PRIORITY;
  const validPriorities = [HIGH, MEDIUM, LOW];

  if (!validPriorities.includes(priority)) return null; // Tidak menampilkan jika priority tidak valid

  const badgeStyles = {
    [HIGH]: "bg-blue-900 hover:bg-blue-800 text-white",
    [MEDIUM]: "bg-blue-500 hover:bg-blue-600 text-white",
    [LOW]: "bg-blue-300 hover:bg-blue-400 text-black",
  };

  return (
    <div className="mt-1 ml-0">
      {" "}
      {/* Perubahan di sini, mengurangi margin atas */}
      <Badge
        className={`${badgeStyles[priority]} border rounded-md px-2 py-1 text-center`}
      >
        {priority}
      </Badge>
    </div>
  );
}
