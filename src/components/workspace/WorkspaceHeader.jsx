import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CardTitle } from "@/components/ui/card";
import { Pencil } from "lucide-react"; // Import ikon edit

const WorkspaceHeader = ({ workspace }) => {
  const [randomImage, setRandomImage] = useState("");
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * 5) + 1; // Pilih angka 1-5
    setRandomImage(`/images/${randomIndex}.png`); // Path gambar sesuai nama file
  }, []);

  // Fungsi untuk menangani upload gambar
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
    }
  };

  return (
    <div>
      {/* Cover Workspace */}
      <div className="h-32 w-full overflow-hidden lg:h-48">
        <img
          className="h-full w-full object-cover"
          src={workspace.cover || randomImage}
          alt={workspace.name}
        />
      </div>

      {/* Detail Workspace */}
      <div className="px-2 sm:px-4">
        <div className="-mt-12 sm:flex sm:items-center sm:space-x-5">
          <div className="relative flex">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Label untuk Klik Avatar */}
              <label htmlFor="avatarUpload" className="cursor-pointer relative">
                {avatar ? (
                  <img
                    src={avatar}
                    alt="Workspace Avatar"
                    className="h-24 w-24 sm:h-32 sm:w-32 rounded-full ring-4 ring-white shadow-md transition-all duration-300 object-cover"
                  />
                ) : (
                  <div className="h-24 w-24 sm:h-32 sm:w-32 flex items-center justify-center rounded-full bg-[#354273] text-white font-bold text-6xl ring-4 ring-white shadow-md transition-all duration-300">
                    {workspace.name?.charAt(0).toUpperCase()}
                  </div>
                )}
                {/* Ikon Edit */}
                <div className="absolute bottom-2 right-2 bg-white p-1 rounded-full shadow-md">
                  <Pencil className="h-5 w-5 text-gray-600" />
                </div>
              </label>
              {/* Input file tersembunyi */}
              <input
                type="file"
                id="avatarUpload"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </motion.div>
          </div>
          <div className="mt-6 flex-1">
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <CardTitle className="text-4xl">
                {workspace.name || "Unnamed Workspace"}
              </CardTitle>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceHeader;
