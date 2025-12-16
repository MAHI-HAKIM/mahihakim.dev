"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [scrolled, setScrolled] = useState(false)

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => document.getElementById(item.id))
      const scrollPosition = window.scrollY + 100

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id)
          break
        }
      }

      // Check if scrolled down
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const navHeight = 80 // Account for navbar height
      const elementPosition = element.offsetTop - navHeight
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      })
    }
    setIsOpen(false)
  }

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isOpen) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("click", handleClickOutside)
    }

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [isOpen])

  return (
    <motion.nav 
      initial={{ y: -100 }} 
      animate={{ y: 0 }} 
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16 sm:h-20 pt-4">
          {/* Glassmorphism Navigation Container - Centered */}
          <div className="hidden md:flex items-center justify-center">
            <motion.div
              className={`relative px-6 py-3 rounded-full transition-all duration-300 ${
                scrolled 
                  ? 'bg-gray-900/30 backdrop-blur-xl shadow-2xl shadow-black/20' 
                  : 'bg-gray-900/20 backdrop-blur-lg'
              }`}
              style={{
                border: '0.5px solid rgba(192, 192, 192, 0.2)'
              }}
            >
              {/* Glass effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-full pointer-events-none" />
              
              <div className="relative flex items-center">
                {/* Logo inside glass container */}
                <Link href="/" className="flex-shrink-0">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center cursor-pointer"
                    onClick={() => scrollToSection("home")}
                  >
                    <Image
                      src="/logo.png"
                      alt="Mahi Hakim Logo"
                      width={40}
                      height={40}
                      className="sm:w-[50px] sm:h-[50px] object-contain"
                      style={{ filter: "brightness(0) invert(1) drop-shadow(0 0 0 transparent)" }}
                    />
                  </motion.div>
                </Link>
                
                {/* Spacer with more gap after logo */}
                <div className="w-8 lg:w-10" />
                
                {/* Navigation items */}
                <div className="flex items-center space-x-4 lg:space-x-6">
                  {navItems.map((item) => (
                    <motion.button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                        activeSection === item.id ? "text-white" : "text-gray-400 hover:text-white"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.label}
                      {activeSection === item.id && (
                        <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 chrome-gradient" />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Mobile Menu Button and Logo */}
          <div className="md:hidden flex items-center justify-between w-full">
            <Link href="/" className="flex-shrink-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center"
                onClick={() => scrollToSection("home")}
              >
                <Image
                  src="/logo.png"
                  alt="Mahi Hakim Logo"
                  width={40}
                  height={40}
                  className="sm:w-[50px] sm:h-[50px] object-contain cursor-pointer"
                  style={{ filter: "brightness(0) invert(1) drop-shadow(0 0 0 transparent)" }}
                />
              </motion.div>
            </Link>
            <motion.button
              onClick={(e) => {
                e.stopPropagation()
                setIsOpen(!isOpen)
              }}
              className="p-2 rounded-md text-gray-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mx-4 mt-2 rounded-2xl bg-gray-900/40 backdrop-blur-2xl border border-gray-700/50 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-2xl pointer-events-none" />
            <div className="py-4 space-y-1 relative">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`block w-full text-left px-4 py-3 mx-2 rounded-lg text-base font-medium transition-all duration-200 ${
                    activeSection === item.id
                      ? "text-white bg-gray-800/60 backdrop-blur-sm border border-gray-700/30"
                      : "text-gray-400 hover:text-white hover:bg-gray-800/30 hover:backdrop-blur-sm"
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navigation
