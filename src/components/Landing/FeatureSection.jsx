import React from 'react';
import { motion } from 'framer-motion';

const FeatureSection = () => {
  const features = [
    {
      icon: 'https://res.cloudinary.com/dwgwb5vro/image/upload/v1741418260/taskbreakdown_tjjxr0.png',
      title: 'Task Breakdown with AI',
      description: 'Automate and simplify your tasks for better efficiency and productivity.',
    },
    {
      icon: 'https://res.cloudinary.com/dwgwb5vro/image/upload/v1741418260/IntegratedCalender_vvomxj.png',
      title: 'Integrated with Calendar',
      description: 'Sync your schedule seamlessly and stay on top of important tasks.',
    },
    {
      icon: 'https://res.cloudinary.com/dwgwb5vro/image/upload/v1741418260/Asimple_vir8tz.png',
      title: 'A simple and intuitive Kanban Board',
      description: 'Visualize your workflow, track progress, and stay organized effortlessly.',
    },
    {
      icon: 'https://res.cloudinary.com/dwgwb5vro/image/upload/v1741418260/NotificationWa_t5qeuh.png',
      title: 'Notifications integrated with WhatsApp',
      description: 'Get real-time updates and never miss important tasks or reminders.',
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-8 md:px-16 bg-white">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2 className="text-[#6387CE] font-semibold text-lg mb-2 uppercase tracking-wide" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          FEATURES
        </motion.h2>

        <motion.h3 className="text-3xl md:text-4xl font-bold mb-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
          Everything You Need to Stay on Track
        </motion.h3>

        <motion.p className="text-lg text-gray-600 max-w-lg mx-auto mb-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }}>
          Manage your schedule with ease and stay ahead effortlessly!
        </motion.p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-14"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex items-start space-x-6"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
            >
              <div className="bg-[#6387CE] rounded-lg p-4 flex items-center justify-center">
                <img src={feature.icon} alt={feature.title} className="object-contain" />
              </div>
              <div className="text-left max-w-xs">
                <h4 className="text-lg font-bold mb-2">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureSection;
