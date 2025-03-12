import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CardTitle } from '@/components/ui/card';

const WorkspaceHeader = ({ workspace }) => {
  const [randomImage, setRandomImage] = useState('');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * 5) + 1; // Pilih angka 1-5
    setRandomImage(`/images/${randomIndex}.png`); // Path gambar sesuai nama file
  }, []);

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
          <div className="flex">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <img
                className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32 shadow-md transition-all duration-300"
                src={
                  workspace.logo ||
                  'https://res.cloudinary.com/dwgwb5vro/image/upload/v1741287175/splash_ymsobt.png'
                }
                alt={workspace.name}
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
                {workspace.name || 'Unnamed Workspace'}
              </CardTitle>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceHeader;