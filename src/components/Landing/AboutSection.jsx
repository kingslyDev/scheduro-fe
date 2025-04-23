import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: 'https://res.cloudinary.com/dy8fe8tbe/image/upload/v1742133789/easy-to-use_j32exn.svg',
    title: 'Easy to Use',
    description: 'Scheduro simplifies scheduling and boosts productivity.',
  },
  {
    icon: 'https://res.cloudinary.com/dy8fe8tbe/image/upload/v1742133857/seamless_y02psa.svg',
    title: 'Seamless Management',
    description: 'Handle meetings, appointments, and tasks effortlessly.',
  },
  {
    icon: 'https://res.cloudinary.com/dy8fe8tbe/image/upload/v1742134010/maximum_ltexcl.svg',
    title: 'Maximum Efficiency',
    description: 'Everything you need in one complete solution.',
  },
  {
    icon: 'https://res.cloudinary.com/dy8fe8tbe/image/upload/v1742134058/effortless_fwsatf.svg',
    title: 'Effortless Time Control',
    description: 'Take charge of your schedule with ease using Scheduro!',
  },
];

const AboutSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);

  const handleMouseMove = (e) => {
    if (imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePosition({ x, y });
    }
  };

  return (
    <section id="about" className="py-16 px-8 md:px-16 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-[#6387CE] font-bold mb-10 text-lg">ABOUT</h2>
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-12">
          <div
            className="w-full md:w-1/2 flex justify-center overflow-hidden rounded-lg"
            ref={imageRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setMousePosition({ x: 0, y: 0 })}
          >
            <motion.div
              className="perspective-1000 relative"
              animate={{ rotateY: mousePosition.x * 10, rotateX: -mousePosition.y * 10, scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30, mass: 0.8 }}
              whileHover={{ scale: 1.08, transition: { duration: 0.3 } }}
            >
              <motion.img
                src="https://res.cloudinary.com/dy8fe8tbe/image/upload/v1742232295/widgets_b9ap96.svg"
                alt="Scheduro app on iPhone"
                className="w-full max-w-[500px] md:max-w-[700px] p-4 scale-115 rounded-lg shadow-xl"
                loading="lazy"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
              />
            </motion.div>
          </div>

          <div className="w-full md:w-1/2 flex flex-col gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4 py-4 transition hover:scale-105">
                <img src={feature.icon} alt={feature.title} className="w-12 h-12" loading="lazy" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{feature.title}</h3>
                  <p className="text-m text-gray-700">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;