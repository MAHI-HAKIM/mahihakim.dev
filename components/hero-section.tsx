import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { useEffect, useState } from "react"

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 })

  useEffect(() => {
    // Set initial window size
    setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }

    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [mouseX, mouseY])

  const scrollToNext = () => {
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
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
    <section id="home" className="min-h-screen relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800">
             {/* Pearl-like floating particles with random movement */}
       <div className="absolute inset-0 pointer-events-none">
         {particles.map((particle, index) => (
           <motion.div
             key={index}
             animate={{
               rotate: 360,
               x: [0, Math.sin(index) * 80, Math.cos(index) * 60, 0],
               y: [0, -Math.cos(index) * 60, Math.sin(index) * 40, 0],
             }}
             transition={{
               rotate: { 
                 duration: particle.duration, 
                 repeat: Infinity, 
                 ease: "linear" 
               },
               x: { 
                 duration: particle.duration * 0.8, 
                 repeat: Infinity, 
                 ease: "easeInOut", 
                 delay: particle.delay 
               },
               y: { 
                 duration: particle.duration * 0.6, 
                 repeat: Infinity, 
                 ease: "easeInOut", 
                 delay: particle.delay 
               },
             }}
             className="absolute rounded-full"
             style={{
               top: `${particle.baseY}%`,
               left: `${particle.baseX}%`,
               width: `${particle.size}px`,
               height: `${particle.size}px`,
               background: `radial-gradient(circle at 30% 30%, 
                 rgba(255, 255, 255, ${particle.opacity}) 0%, 
                 rgba(255, 255, 255, ${particle.opacity * 0.8}) 20%, 
                 rgba(147, 197, 253, ${particle.opacity * 0.6}) 50%, 
                 rgba(59, 130, 246, ${particle.opacity * 0.4}) 80%, 
                 transparent 100%)`,
               boxShadow: `
                 0 0 ${particle.size * 1.5}px rgba(255, 255, 255, ${particle.opacity * 0.8}),
                 0 0 ${particle.size * 0.8}px rgba(147, 197, 253, ${particle.opacity * 0.6}),
                 inset 0 0 ${particle.size * 0.3}px rgba(255, 255, 255, ${particle.opacity * 0.9})
               `,
               filter: 'blur(0.3px)',
             }}
           />
         ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center relative z-10">
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
        
        {/* Right side - Enhanced character with 3D lighting from behind */}
        <div className="flex justify-center items-center relative">
          {/* Main backlight - creates the "from behind" effect */}
          <motion.div
            animate={{
              scale: [1, 1.4, 1.2, 1.6, 1],
              opacity: [0.6, 1, 0.8, 1, 0.6],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute"
            style={{
              width: "180px",
              height: "180px",
              background: `radial-gradient(ellipse 120% 150% at 50% 40%, 
                rgba(255, 255, 255, 0.9) 0%, 
                rgba(255, 243, 176, 0.8) 20%, 
                rgba(255, 215, 0, 0.6) 40%, 
                rgba(255, 165, 0, 0.4) 60%, 
                transparent 80%)`,
              borderRadius: "50%",
              filter: "blur(15px)",
              zIndex: 1,
              transform: "translateZ(-50px) translateY(-20px)",
            }}
          />

          {/* Secondary backlight layers for depth */}
          <motion.div
            animate={{
              scale: [1, 1.6, 1.3, 1.8, 1],
              opacity: [0.4, 0.8, 0.6, 0.9, 0.4],
              rotate: [0, 45, 90, 135, 180],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="absolute"
            style={{
              width: "220px",
              height: "120px",
              background: `radial-gradient(ellipse 100% 80% at 50% 50%, 
                rgba(255, 255, 255, 0.7) 0%, 
                rgba(255, 240, 140, 0.5) 30%, 
                rgba(255, 200, 50, 0.3) 60%, 
                transparent 80%)`,
              borderRadius: "50%",
              filter: "blur(20px)",
              zIndex: 0,
              transform: "translateZ(-80px) translateY(-30px)",
            }}
          />

          {/* Pulsing beat light */}
          <motion.div
            animate={{
              scale: [0.8, 2.2, 0.8],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
            }}
            className="absolute"
            style={{
              width: "300px",
              height: "300px",
              background: `radial-gradient(circle, 
                rgba(255, 255, 255, 0.4) 0%, 
                rgba(255, 255, 255, 0.2) 20%, 
                rgba(147, 197, 253, 0.1) 40%, 
                transparent 70%)`,
              borderRadius: "50%",
              filter: "blur(25px)",
              zIndex: -1,
            }}
          />

          {/* Additional atmospheric lighting */}
          <motion.div
            animate={{
              scale: [1, 1.3, 1.1, 1.5, 1],
              opacity: [0.2, 0.5, 0.3, 0.6, 0.2],
              rotate: [0, -30, -60, -90, -120],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute"
            style={{
              width: "400px",
              height: "200px",
              background: `linear-gradient(45deg, 
                rgba(147, 197, 253, 0.2) 0%, 
                rgba(59, 130, 246, 0.15) 30%, 
                rgba(29, 78, 216, 0.1) 60%, 
                transparent 80%)`,
              borderRadius: "50%",
              filter: "blur(30px)",
              zIndex: -2,
              transform: "translateZ(-100px)",
            }}
          />

          {/* Character container with enhanced lighting */}
          <motion.div
            className="relative z-20"
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              filter: `drop-shadow(0 0 20px rgba(255, 255, 255, 0.5)) 
                      drop-shadow(0 0 40px rgba(147, 197, 253, 0.3))
                      drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3))`,
            }}
          >
           
            
            {/* Uncomment and replace with your actual image */}
             
            <img 
              src="/animated_character_close_up-removebg-preview.png" 
              alt="Animated Character" 
              className="max-w-xs w-full h-auto rounded-xl shadow-2xl"
            />
            
          </motion.div>

          {/* Rim lighting effect around character */}
          <motion.div
            animate={{
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5,
            }}
            className="absolute z-10"
            style={{
              width: "340px",
              height: "340px",
              border: "2px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "12px",
              boxShadow: `
                0 0 30px rgba(255, 255, 255, 0.2),
                inset 0 0 30px rgba(255, 255, 255, 0.1)
              `,
              background: "transparent",
            }}
          />
        </div>
      </div>

      {/* Enhanced scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.button
          onClick={scrollToNext}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="p-2 rounded-full border border-gray-400 hover:border-white transition-colors group bg-black/20 backdrop-blur-sm"
          whileHover={{
            boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          }}
        >
          <ChevronDown className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
        </motion.button>
      </motion.div>
    </section>
  )
}

export default HeroSection