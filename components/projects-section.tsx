"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { ExternalLink, Github, Play, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const projectsPerPage = 6

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "web", label: "Web Development" },
    { id: "ai", label: "AI Automation" },
    { id: "web3", label: "Web3 Development" },
    { id: "Cloud and Cybersecurity", label: "Cloud and Cybersecurity" },
    { id: "visual", label: "Visual Content" },
  ]

  const projects = [
    {
      id: 1,
      title: "Siteflow",
      category: "web",
      description: "The complete construction management platform that streamlines projects, manages teams, tracks equipment, and provides AI-powered insights for modern construction businesses",
      image: "/siteflow.png",
      technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Tailwind CSS", "Framer Motion"],
      liveUrl: "https://siteflow-v1.vercel.app",
      githubUrl: "",
      videoUrl: "",
      featured: true,
    },
    {
      id: 5,
      title: "Content Creation Pipeline",
      category: "ai",
      description:
        "Automated content generation and publishing system for social media platforms with AI-driven optimization.",
      image: "/aicontentcreation.png",
      technologies: ["Python", "OpenAI API", "Social Media APIs", "Scheduler", "n8n", "Veo3"],
      liveUrl: "https://www.tiktok.com/@ishowedai",
      githubUrl: "",
      videoUrl: "",
      featured: false,
    },
    {
      id:9,
      title: "Cloud Hardening Platform",
      category: "Cloud and Cybersecurity",
      description:
        "Cloud Hardening Platform that automates the process of hardening cloud resources to meet security and CISO compliance requirements.",
      image: "/cloudhardening.jpg",
      technologies: ["React", "Ansible", "Cisco Security playbooks", "AWS SDK", "Digital Ocean API"],
      liveUrl: "",
      githubUrl: "https://github.com/MAHI-HAKIM/Cloud_Hardening_Platform",
    },
    {
      id: 3,
      title: "Santim Dex",
      category: "web",
      description:
        "Complete visual identity and marketing campaign for a tech startup, including photography and video content.",
      image: "/santimdex.png",
      technologies: ["Adobe Creative Suite", "Final Cut Pro", "After Effects", "Photoshop", "Illustrator"],
      liveUrl: "",
      githubUrl: "https://github.com/MAHI-HAKIM/DEX-Lending_DAPP/blob/master",
      videoUrl: "",
      featured: false,
    },
    {
      id: 2,
      title: "Bunagram Message App",
      category: "web3",
      description:
        "a real-time messaging application built using Socket.IO for WebSocket-based communication. The application enables users to send and receive messages instantly, whether in direct chats, group chats, or through broadcast messages.",
      image: "/bunagram.png",
      technologies: ["n8n", "OpenAI API", "Python", "MongoDB", "FastAPI", "Docker"],
      liveUrl: "",
      githubUrl: "https://github.com/MAHI-HAKIM/Bunagram",
      videoUrl: "",
      featured: true,
    },
    {
      id: 4,
      title: "Simons Game",
      category: "web",
      description:
        "simple simple Simon Game with rectangular buttons.",
      image: "/simons.png",
      technologies: ["React", "D3.js", "WebSocket", "Node.js", "Express", "Chart.js"],
      liveUrl: "https://simons-game-v0-0-1.pages.dev/",
      githubUrl: "https://github.com/MAHI-HAKIM/Simons-Game-v0.0.1",
      videoUrl: "",
      featured: true,
    },
    
    {
      id: 6,
      title: "Visionary Photography Series",
      category: "visual",
      description:
        "Offer insights into the art, craft, and philosophy of capturing moments. From emphasizing the subtle reality a photograph can reveal to highlighting the importance of human connection, quotes offer a glimpse into the photographer's mindset and the power of images. Some popular quotes focus on the technical aspects, like the relationship between light and time, while others delve into the emotional impact of a photograph. ",
      image: "/cinemagramic.png",
      technologies: ["Professional Photography", "Lightroom", "Photoshop", "Capture One", "Studio Lighting"],
      liveUrl: "https://www.instagram.com/cinemagramic/",
      githubUrl: "",
      videoUrl: "",
      featured: false,
    },
    {
      id: 7,
      title: "Family-Travel-Tracker",
      category: "web",
      description:
        "simple web interface to keep track of your families traveled history and connect.",
      image: "/familytraveltracker.png",
      technologies: ["React", "D3.js", "WebSocket", "Node.js", "Express" , "EJS"],
      liveUrl: "",
      githubUrl: "https://github.com/MAHI-HAKIM/Family-Travel-Tracker",
      videoUrl: "",
      featured: true,
    },
    {
      id: 8,
      title: "Social Media Management Tool",
      category: "ai",
      description:
        "AI-powered social media management platform with content scheduling, analytics, and automated responses.",
      image: "/socialmediamanagement.png",
      technologies: ["React", "Node.js", "OpenAI API", "MongoDB", "Socket.io", "Redis"],
      liveUrl: "",
      githubUrl: "",
      videoUrl: "",
      featured: false,
    },
  ]

  const filteredProjects =
    activeCategory === "all" ? projects : projects.filter((project) => project.category === activeCategory)

  // Pagination logic
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage)
  const startIndex = (currentPage - 1) * projectsPerPage
  const endIndex = startIndex + projectsPerPage
  const currentProjects = filteredProjects.slice(startIndex, endIndex)

  // Reset to first page when category changes
  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Scroll to the projects section instead of top of page
    const projectsSection = document.getElementById("projects")
    if (projectsSection) {
      const navHeight = 80 // Account for navbar height
      const elementPosition = projectsSection.offsetTop - navHeight
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-gradient mb-6">Featured Projects</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A showcase of innovative solutions spanning web development, AI automation, and creative visual content
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-gradient-to-r from-gray-200 to-white text-black"
                  : "glass-morphism text-gray-300 hover:text-white"
              }`}
            >
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {currentProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="glass-morphism rounded-2xl overflow-hidden group h-full"
            >
              {/* Project Image */}
              <div className="relative overflow-hidden h-64">
                <Image
                  src={project.image || "/placeholder.jpg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Overlay Actions */}
                <div className="absolute inset-0 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {project.liveUrl && (
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </motion.a>
                  )}
                  {project.githubUrl && (
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                    >
                      <Github className="w-5 h-5" />
                    </motion.a>
                  )}
                  {project.videoUrl && (
                    <motion.a
                      href={project.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                    >
                      <Play className="w-5 h-5" />
                    </motion.a>
                  )}
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6 flex flex-col h-full">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-gradient transition-all duration-300">
                    {project.title}
                  </h3>
                  {project.featured && (
                    <span className="px-2 py-1 bg-gradient-to-r from-gray-200 to-white text-black text-xs font-semibold rounded-full">
                      Featured
                    </span>
                  )}
                </div>

                <p className="text-gray-300 leading-relaxed mb-4 flex-grow">{project.description}</p>

                {/* Enhanced Tech Stack Display */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-400">Tech Stack:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 bg-gray-800/80 border border-gray-600/50 rounded-lg text-xs text-gray-300 hover:border-gray-400/70 hover:bg-gray-700/80 hover:scale-105 transition-all duration-200 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex justify-center items-center space-x-2"
          >
            {/* Previous Button */}
            <motion.button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-3 rounded-full transition-all duration-300 ${
                currentPage === 1
                  ? "text-gray-500 cursor-not-allowed"
                  : "glass-morphism text-gray-300 hover:text-white hover:bg-gray-700/50"
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>

            {/* Page Numbers */}
            <div className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <motion.button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    currentPage === page
                      ? "bg-gradient-to-r from-gray-200 to-white text-black"
                      : "glass-morphism text-gray-300 hover:text-white hover:bg-gray-700/50"
                  }`}
                >
                  {page}
                </motion.button>
              ))}
            </div>

            {/* Next Button */}
            <motion.button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-3 rounded-full transition-all duration-300 ${
                currentPage === totalPages
                  ? "text-gray-500 cursor-not-allowed"
                  : "glass-morphism text-gray-300 hover:text-white hover:bg-gray-700/50"
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}

        {/* Project Count Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <p className="text-gray-400 text-sm">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredProjects.length)} of {filteredProjects.length} projects
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default ProjectsSection
