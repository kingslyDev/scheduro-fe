import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CardTitle } from "@/components/ui/card";
import { Pencil } from "lucide-react";
import Progress from "@/components/ui/progress";

const WorkspaceHeader = ({ workspace, completedTasks, totalTasks }) => {
  const [randomImage, setRandomImage] = useState("");
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    const savedAvatar = localStorage.getItem(
      `workspace-avatar-${workspace.id}`
    );
    if (savedAvatar) {
      setAvatar(savedAvatar);
    }

    const randomIndex = Math.floor(Math.random() * 5) + 1;
    setRandomImage(`/images/${randomIndex}.png`);
  }, [workspace.id]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
      localStorage.setItem(`workspace-avatar-${workspace.id}`, imageUrl);
    }
  };

  const progressValue =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="relative w-full">
      {/* Cover Workspace */}
      <div className="h-32 w-full overflow-hidden lg:h-48">
        <img
          className="h-full w-full object-cover"
          src={workspace.cover || randomImage}
          alt={workspace.name}
        />
      </div>

      {/* Container Workspace Header */}
      <div className="px-4 sm:px-6 relative">
        <div className="flex items-center mt-[-40px] space-x-4">
          {/* Avatar */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <label htmlFor="avatarUpload" className="cursor-pointer relative">
              {avatar ? (
                <img
                  src={avatar}
                  alt="Workspace Avatar"
                  className="h-20 w-20 sm:h-28 sm:w-28 rounded-full ring-4 ring-white shadow-md object-cover"
                />
              ) : (
                <div className="h-20 w-20 sm:h-28 sm:w-28 flex items-center justify-center rounded-full bg-[#354273] text-white font-bold text-4xl ring-4 ring-white shadow-md">
                  {workspace.name?.charAt(0).toUpperCase()}
                </div>
              )}
              {/* Edit Icon */}
              <div className="absolute bottom-2 right-2 bg-white p-1 rounded-full shadow-md">
                <Pencil className="h-4 w-4 text-gray-600" />
              </div>
            </label>
            <input
              type="file"
              id="avatarUpload"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </motion.div>

          {/* Title Workspace */}
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="mt-6"
          >
            <CardTitle className="text-3xl font-semibold">
              {workspace.name || "Unnamed Workspace"}
            </CardTitle>
          </motion.div>
        </div>

        {/* Progress Bar */}
        <div className="absolute top-[15px] right-4 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg max-w-xs shadow-md">
          <h2 className="text-sm font-semibold">Progress</h2>
          <Progress value={progressValue} max={100} />
        </div>
      </div>
    </div>
  );
};

export default WorkspaceHeader;
