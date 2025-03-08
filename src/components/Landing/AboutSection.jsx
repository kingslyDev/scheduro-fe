import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const AboutSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);

  const handleMouseMove = (e) => {
    if (imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      // Calculate relative position within the image container
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePosition({ x, y });
    }
  };

  return (
    <section id="about" className="py-16 px-8 md:px-16 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-[#6387CE] font-extrabold mb-8 text-2xl md:text-3xl" style={{ fontSize: '24px' }}>
          ABOUT
        </h2>
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          <div className="w-full md:w-1/2 flex justify-center overflow-hidden rounded-lg" ref={imageRef} onMouseMove={handleMouseMove} onMouseLeave={() => setMousePosition({ x: 0, y: 0 })}>
            <motion.div
              className="perspective-1000"
              animate={{
                rotateY: mousePosition.x * 10,
                rotateX: -mousePosition.y * 10,
                scale: 1.05,
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
                mass: 0.8,
              }}
              whileHover={{
                scale: 1.08,
                transition: { duration: 0.3 },
              }}
            >
              <motion.img
                src="https://res.cloudinary.com/dwgwb5vro/image/upload/v1741287251/iPhone_16_Pro_1_tqqkm2.png"
                alt="Scheduro app on iPhone"
                className="w-full max-w-[500px] md:max-w-[700px] rounded-lg shadow-xl"
                loading="lazy"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6 },
                }}
              />
            </motion.div>
          </div>

          <div className="w-full md:w-1/2 px-6 md:px-8 flex flex-col justify-center mt-24">
            <p className="text-lg text-gray-700 leading-relaxed mb-4 font-medium font-poppins">
              Scheduro makes scheduling easy and boosts productivity. Manage meetings, appointments, and tasks without hassle. With smart automation and an intuitive design, stay organized and efficient in one powerful app.
            </p>
            <p className="text-lg text-gray-700 font-medium font-poppins">Take control of your time effortlessly with Scheduro!</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
