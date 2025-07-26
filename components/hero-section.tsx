"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

const HeroSection = () => {
  const scrollToNext = () => {
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="home" className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Background floating elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            rotate: 360,
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            x: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
            y: { duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          }}
          className="absolute top-20 right-20 w-20 h-20 rounded-full chrome-sphere opacity-30"
        />
        <motion.div
          animate={{
            rotate: -360,
            x: [0, -80, 0],
            y: [0, 80, 0],
          }}
          transition={{
            rotate: { duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            x: { duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
            y: { duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          }}
          className="absolute bottom-32 left-16 w-12 h-12 rounded-full chrome-sphere opacity-20"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Text content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="space-y-8"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-3xl lg:text-5xl font-bold leading-tight"
          >
            <span className="text-gradient">MAHI</span>
            <br />
            <span className="text-white">ABDULHAKIM</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg lg:text-xl text-gray-300 font-light"
          >
            Full-Stack Developer • AI Automation Specialist • Visual Creator
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-base text-gray-400 max-w-2xl leading-relaxed"
          >
            Crafting digital experiences with cutting-edge technology, automated workflows, and compelling visual
            narratives. Transforming ideas into reality through code and creativity.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              onClick={() => scrollToNext()}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(255, 255, 255, 0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-gray-200 to-white text-black font-semibold rounded-full transition-all duration-300 hover:shadow-lg"
            >
              Explore My Work
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-gray-400 text-gray-300 font-semibold rounded-full hover:border-white hover:text-white transition-all duration-300"
            >
              Download Resume
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right side - Profile Picture with Animated Border */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1.2 }}
          className="relative flex justify-center items-center"
        >
          <div className="relative">
            {/* Animated border rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="absolute inset-0 w-80 h-80 rounded-full border-2 border-transparent bg-gradient-to-r from-white via-gray-300 to-transparent bg-clip-border"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent, rgba(255,255,255,0.8), transparent, rgba(192,192,192,0.6), transparent)",
              }}
            />

            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="absolute inset-2 w-76 h-76 rounded-full border border-transparent"
              style={{
                background: "conic-gradient(from 180deg, transparent, rgba(229,229,229,0.4), transparent)",
              }}
            />

            {/* Profile picture container */}
            <div className="relative w-72 h-72 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border-4 border-gray-700 overflow-hidden flex items-center justify-center">
              <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-gray-500 to-gray-700"></div>
                  <p className="text-sm">Your AI Generated</p>
                  <p className="text-sm">Profile Picture</p>
                </div>
              </div>
            </div>

            {/* Glow effect */}
            <div className="absolute inset-0 w-80 h-80 rounded-full bg-gradient-to-r from-transparent via-white to-transparent opacity-10 animate-pulse" />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.button
          onClick={scrollToNext}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="p-2 rounded-full border border-gray-400 hover:border-white transition-colors group"
        >
          <ChevronDown className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
        </motion.button>
      </motion.div>
    </section>
  )
}

export default HeroSection
