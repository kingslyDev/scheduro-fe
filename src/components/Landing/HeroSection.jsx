import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="flex flex-col md:flex-row justify-between items-center px-4 sm:px-8 md:px-16 py-12 overflow-hidden">
      <motion.div className="w-full md:w-1/2 text-center md:text-left" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }}>
        <motion.h1 className="text-4xl sm:text-5xl font-bold leading-tight" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.8 }}>
          Seamless
          <br />
          <motion.span className="text-[#6387CE]" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}>
            Scheduling,
          </motion.span>
          <br />
          Ultimate
          <br />
          <motion.span className="text-[#6387CE]" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }}>
            Productivity
          </motion.span>
        </motion.h1>

        <motion.p className="text-lg text-gray-700 mt-8 md:mt-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.8 }}>
          Scheduro helps you manage your tasks and time effectively,
          <br className="hidden sm:block" />
          giving you the control to focus on what truly matters.
        </motion.p>

        <motion.button
          className="bg-[#6387CE] text-white px-6 py-3 rounded-lg flex items-center shadow-md hover:bg-[#4058A4] mt-8 md:mt-12 mx-auto md:mx-0 transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          whileHover={{
            scale: 1.05,
            boxShadow: '0 10px 25px -5px rgba(99, 135, 206, 0.4)',
          }}
          whileTap={{ scale: 0.98 }}
        >
          <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M5 3v18l14-9z" />
          </svg>
          <div className="text-left flex flex-col">
            <span className="text-sm">GET IT ON</span>
            <span className="text-base font-medium">Google Play</span>
          </div>
        </motion.button>
      </motion.div>

      <motion.div className="w-full md:w-1/2 flex justify-center mt-8 md:mt-0" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }}>
        <motion.img
          src="https://res.cloudinary.com/dwgwb5vro/image/upload/v1741287250/char_1_1_ugxw4a.png"
          alt="Character with productivity icons"
          className="w-72 md:w-96"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{
            y: {
              duration: 2.5,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            },
          }}
          whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
