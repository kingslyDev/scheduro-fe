"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { Play, ArrowRight } from "lucide-react"
import { useMediaQuery } from "@/hooks/useMobile"

const HeroSection = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)")

  return (
    <section className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-[90vh] flex flex-col md:flex-row justify-between items-center px-6 sm:px-10 md:px-20 py-16 overflow-hidden">
      <motion.div
        className="w-full md:w-1/2 text-center md:text-left"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="relative inline-block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <motion.h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
            <span className="relative z-10">Seamless </span>
      
            <motion.span
              className="text-[#6387CE] relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Scheduling,
            </motion.span>
            <br />
            <span className="relative z-10">Ultimate </span>
          
            <motion.span
              className="text-[#6387CE] relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              Productivity
            </motion.span>
          </motion.h1>
          <motion.div
            className="absolute -bottom-4 -left-6 w-20 h-20 bg-[#6387CE]/10 rounded-full blur-xl z-0"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          />
          <motion.div
            className="absolute top-1/4 -right-10 w-32 h-32 bg-[#6387CE]/10 rounded-full blur-xl z-0"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, duration: 1 }}
          />
        </motion.div>

        <motion.p
          className="text-lg text-gray-700 mt-8 md:mt-12 max-w-md mx-auto md:mx-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          Scheduro helps you manage your tasks and time effectively, giving you the control to focus on what truly
          matters.
        </motion.p>

        {isDesktop ? (
          <Link href="/dashboard" passHref>
            <motion.button
              className="bg-[#6387CE] text-white px-6 py-3 rounded-lg flex items-center shadow-md hover:bg-[#4058A4] mt-8 md:mt-12 mx-auto md:mx-0 transition-all duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(99, 135, 206, 0.4)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              <ArrowRight className="w-5 h-5 mr-2" />
              <span className="text-base font-medium">Try it now</span>
            </motion.button>
          </Link>
        ) : (
          <motion.button
            className="bg-[#6387CE] text-white px-6 py-3 rounded-lg flex items-center shadow-md hover:bg-[#4058A4] mt-8 md:mt-12 mx-auto md:mx-0 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px -5px rgba(99, 135, 206, 0.4)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            <Play className="w-5 h-5 mr-2" />
            <div className="text-left flex flex-col">
              <span className="text-xs">GET IT ON</span>
              <span className="text-base font-medium">Google Play</span>
            </div>
          </motion.button>
        )}
      </motion.div>

      <motion.div
        className="w-full md:w-1/2 flex justify-center mt-12 md:mt-0 relative"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#6387CE]/10 rounded-full blur-3xl z-0"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        />
        <motion.div className="relative z-10" whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}>
          <motion.img
            src="https://res.cloudinary.com/dwgwb5vro/image/upload/v1741287250/char_1_1_ugxw4a.png"
            alt="Character with productivity icons"
            className="w-72 md:w-96 lg:w-[450px] drop-shadow-2xl"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{
              y: {
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
              },
            }}
          />
          <motion.div
            className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-[90%] h-8 bg-black/10 blur-md rounded-full z-0"
            initial={{ scaleX: 0.8, opacity: 0.5 }}
            animate={{
              scaleX: [0.8, 0.9, 0.8],
              opacity: [0.5, 0.7, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HeroSection

