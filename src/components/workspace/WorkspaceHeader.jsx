import { useState, useEffect } from "react";

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

  return (
    <div className="relative w-full">
      {/* Cover Image */}
      <div className="w-full h-24 sm:h-32 md:h-40 lg:h-48 overflow-hidden flex items-center">
        {(workspace.cover || randomImage) && (
          <img
            className="w-full h-full object-cover"
            src={workspace.cover || randomImage}
            alt={workspace.name}
          />
        )}
      </div>

      {/* Container Avatar + Nama Workspace */}
      <div className="relative px-4 sm:px-6 flex items-center gap-4 -mt-10 md:-mt-12">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {avatar ? (
            <img
              src={avatar}
              alt="Workspace Avatar"
              className="h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 rounded-full ring-4 ring-white shadow-md object-cover"
            />
          ) : (
            <div className="h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 flex items-center justify-center rounded-full bg-[#354273] text-white font-bold text-3xl ring-4 ring-white shadow-md">
              {workspace.name?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* Nama Workspace */}
        <div className="text-left mt-10 md:mt-12">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold">
            {workspace.name || "Unnamed Workspace"}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceHeader;
