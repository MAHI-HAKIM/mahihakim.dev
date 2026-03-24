"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { useEffect, useState } from "react"

const HeroSection = () => {
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 })
  const [downloadCount, setDownloadCount] = useState(0)

  useEffect(() => {
    // Set initial window size
    setWindowSize({ width: window.innerWidth, height: window.innerHeight })

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }

    window.addEventListener("resize", handleResize)

    // Load download count on component mount
    const loadDownloadCount = async () => {
      try {
        const response = await fetch('/api/download-track')
        const data = await response.json()
        if (data.success) {
          setDownloadCount(data.downloadCount)
        } else {
          console.error('Failed to load download count:', data.error)
        }
      } catch (error) {
        console.error('Error loading download count:', error)
      }
    }

    loadDownloadCount()

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const scrollToNext = () => {
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      const navHeight = 80 // Account for navbar height
      const elementPosition = aboutSection.offsetTop - navHeight
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      })
    }
  }

  const handleDownloadResume = async () => {
    try {
      // Track the download first
      const response = await fetch('/api/download-track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      const data = await response.json()
      if (data.success) {
        setDownloadCount(data.downloadCount)
        console.info('Download tracked successfully. Count:', data.downloadCount)
        if (data.debug) {
          console.info('[download-track] server geo debug (dev only):', data.debug)
        }
      } else {
        console.error('Failed to track download:', data.error)
      }
    } catch (error) {
      console.error('Error tracking download:', error)
    }

    // Create a link element for the actual download
    const link = document.createElement('a')
    link.href = '/Mahi_CV.pdf'
    link.download = 'Mahi_Abdulhakim_Resume.pdf'
    link.target = '_blank'
    
    // Append to body, click, and remove
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Pearl-like particles with random movement
  const particles = [
    { size: 20, opacity: 0.6, duration: 25, baseX: 10, baseY: 20, delay: 0 },
    { size: 12, opacity: 0.5, duration: 20, baseX: 85, baseY: 15, delay: 2 },
    { size: 16, opacity: 0.55, duration: 22, baseX: 25, baseY: 75, delay: 1 },
    { size: 8, opacity: 0.45, duration: 18, baseX: 70, baseY: 45, delay: 3 },
    { size: 24, opacity: 0.65, duration: 28, baseX: 15, baseY: 60, delay: 0.5 },
    { size: 10, opacity: 0.48, duration: 19, baseX: 90, baseY: 80, delay: 2.5 },
    { size: 14, opacity: 0.52, duration: 21, baseX: 35, baseY: 25, delay: 1.5 },
    { size: 18, opacity: 0.58, duration: 24, baseX: 65, baseY: 70, delay: 0.8 },
    { size: 6, opacity: 0.42, duration: 16, baseX: 80, baseY: 30, delay: 3.5 },
    { size: 22, opacity: 0.62, duration: 26, baseX: 20, baseY: 85, delay: 1.2 },
    { size: 11, opacity: 0.49, duration: 17, baseX: 75, baseY: 55, delay: 2.8 },
    { size: 26, opacity: 0.68, duration: 30, baseX: 5, baseY: 40, delay: 0.3 },
    { size: 9, opacity: 0.46, duration: 15, baseX: 95, baseY: 65, delay: 3.2 },
    { size: 15, opacity: 0.54, duration: 23, baseX: 45, baseY: 10, delay: 1.8 },
    { size: 19, opacity: 0.59, duration: 25, baseX: 55, baseY: 90, delay: 0.7 },
  ]

  return (
    <section
      id="home"
      className="min-h-screen relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800 pt-16 sm:pt-20"
    >
      {/* Pearl-like floating particles with random movement */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((particle, index) => (
          <motion.div
            key={index}
            animate={{
              rotate: 360,
              x: [0, Math.sin(index) * 60, Math.cos(index) * 40, 0],
              y: [0, -Math.cos(index) * 40, Math.sin(index) * 30, 0],
            }}
            transition={{
              rotate: {
                duration: particle.duration,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              },
              x: {
                duration: particle.duration * 0.8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: particle.delay,
              },
              y: {
                duration: particle.duration * 0.6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: particle.delay,
              },
            }}
            className="absolute rounded-full"
            style={{
              top: `${particle.baseY}%`,
              left: `${particle.baseX}%`,
              width: `${Math.max(particle.size * 0.7, 8)}px`,
              height: `${Math.max(particle.size * 0.7, 8)}px`,
              background: `radial-gradient(circle at 30% 30%, 
                rgba(255, 255, 255, ${particle.opacity}) 0%, 
                rgba(255, 255, 255, ${particle.opacity * 0.8}) 20%, 
                rgba(147, 197, 253, ${particle.opacity * 0.6}) 50%, 
                rgba(59, 130, 246, ${particle.opacity * 0.4}) 80%, 
                transparent 100%)`,
              boxShadow: `
                0 0 ${particle.size * 1.2}px rgba(255, 255, 255, ${particle.opacity * 0.6}),
                0 0 ${particle.size * 0.6}px rgba(147, 197, 253, ${particle.opacity * 0.4}),
                inset 0 0 ${particle.size * 0.2}px rgba(255, 255, 255, ${particle.opacity * 0.7})
              `,
              filter: "blur(0.3px)",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="space-y-6 lg:space-y-8 text-center lg:text-left order-2 lg:order-1"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
            >
              <span className="bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent">
                MAHI
              </span>
              <br />
              <span className="text-white">ABDULHAKIM</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-base sm:text-lg lg:text-xl text-gray-300 font-light"
            >
              Full-Stack Developer • AI Automation Specialist • Visual Creator
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-sm sm:text-base text-gray-400 max-w-2xl leading-relaxed mx-auto lg:mx-0"
            >
              Crafting digital experiences with cutting-edge technology, automated workflows, and compelling visual
              narratives. Transforming ideas into reality through code and creativity.
            </motion.p>

                         <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.8, duration: 0.8 }}
               className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center lg:justify-start lg:items-start"
             >
               <motion.button
                 onClick={() => scrollToNext()}
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-gray-400 text-gray-300 font-semibold rounded-full hover:border-gray-500 hover:text-black hover:bg-white transition-all duration-300 text-sm sm:text-base"
               >
                 Explore My Work
               </motion.button>

               <div className="flex flex-col items-center gap-1">
                 <motion.button
                   onClick={handleDownloadResume}
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                   className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-gray-400 text-gray-300 font-semibold rounded-full hover:border-800 hover:bg-green-100 hover:text-green-800 transition-all duration-300 text-sm sm:text-base"
                 >
                   Download Resume
                 </motion.button>
                 {downloadCount > 0 && (
                   <motion.div
                     initial={{ opacity: 0, scale: 0.8 }}
                     animate={{ opacity: 1, scale: 1 }}
                     className="text-xs text-gray-400 bg-gray-800/50 px-2 py-1 rounded-full"
                   >
                     {downloadCount + 10} download{downloadCount !== 1 ? 's' : ''}
                   </motion.div>
                 )}
               </div>
             </motion.div>
          </motion.div>

          {/* Right side - Enhanced character with 3D lighting from behind */}
          <div className="flex justify-center items-center relative order-1 lg:order-2 mb-8 lg:mb-0">
            {/* Main backlight - creates the "from behind" effect */}
            <motion.div
              animate={{
                scale: [1, 1.4, 1.2, 1.6, 1],
                opacity: [0.6, 1, 0.8, 1, 0.6],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="absolute"
              style={{
                width: "100px",
                height: "100px",
                background: `radial-gradient(ellipse 120% 150% at 50% 40%, 
                  rgba(255, 255, 255, 0.8) 0%, 
                  rgba(255, 243, 176, 0.7) 20%, 
                  rgba(255, 215, 0, 0.5) 40%, 
                  rgba(255, 165, 0, 0.3) 60%, 
                  transparent 80%)`,
                borderRadius: "50%",
                filter: "blur(12px)",
                zIndex: 1,
                transform: "translateZ(-50px) translateY(-15px)",
              }}
            />

            {/* Secondary backlight layers for depth */}
            <motion.div
              animate={{
                scale: [1, 1.6, 1.3, 1.8, 1],
                opacity: [0.3, 0.7, 0.5, 0.8, 0.3],
                rotate: [0, 45, 90, 135, 180],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="absolute"
              style={{
                width: "120px",
                height: "60px",
                background: `radial-gradient(ellipse 100% 80% at 50% 50%, 
                  rgba(255, 255, 255, 0.6) 0%, 
                  rgba(255, 240, 140, 0.4) 30%, 
                  rgba(255, 200, 50, 0.2) 60%, 
                  transparent 80%)`,
                borderRadius: "50%",
                filter: "blur(15px)",
                zIndex: 0,
                transform: "translateZ(-80px) translateY(-20px)",
              }}
            />

            {/* Pulsing beat light */}
            <motion.div
              animate={{
                scale: [0.8, 2.0, 0.8],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeOut",
              }}
              className="absolute"
              style={{
                width: "160px",
                height: "160px",
                background: `radial-gradient(circle, 
                  rgba(255, 255, 255, 0.3) 0%, 
                  rgba(255, 255, 255, 0.15) 20%, 
                  rgba(147, 197, 253, 0.08) 40%, 
                  transparent 70%)`,
                borderRadius: "50%",
                filter: "blur(20px)",
                zIndex: -1,
              }}
            />

            {/* Character container with enhanced lighting */}
            <motion.div
              className="relative z-20"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              style={{
                filter: `drop-shadow(0 0 15px rgba(255, 255, 255, 0.4)) 
                        drop-shadow(0 0 30px rgba(147, 197, 253, 0.2))
                        drop-shadow(0 8px 25px rgba(0, 0, 0, 0.3))`,
              }}
            >
              <img
                src="/animated_character_close_up-removebg-preview.png"
                alt="Animated Character"
                className="w-40 sm:w-48 md:w-56 lg:w-64 xl:w-72 h-auto rounded-xl shadow-2xl"
              />
            </motion.div>

            {/* Rim lighting effect around character */}
            <motion.div
              animate={{
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 1.5,
              }}
              className="absolute z-10"
              style={{
                width: "180px",
                height: "180px",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "12px",
                boxShadow: `
                  0 0 20px rgba(255, 255, 255, 0.15),
                  inset 0 0 20px rgba(255, 255, 255, 0.08)
                `,
                background: "transparent",
              }}
            />
          </div>
        </div>
      </div>

      {/* Enhanced scroll indicator */}
      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.button
          onClick={scrollToNext}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="p-2 rounded-full border border-gray-400 hover:border-white transition-colors group bg-black/20 backdrop-blur-sm"
          whileHover={{
            boxShadow: "0 0 15px rgba(255, 255, 255, 0.2)",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          }}
        >
          <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-white transition-colors" />
        </motion.button>
      </motion.div> */}
    </section>
  )
}

export default HeroSection
