"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { ExternalLink, Github, Play } from "lucide-react"

const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all")

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "web", label: "Web Development" },
    { id: "ai", label: "AI Automation" },
    { id: "visual", label: "Visual Content" },
  ]

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      category: "web",
      description: "Full-stack e-commerce solution with AI-powered recommendations and real-time inventory management.",
      image: "/placeholder.svg?height=300&width=500",
      technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
    },
    {
      id: 2,
      title: "AI Workflow Automation",
      category: "ai",
      description:
        "Intelligent automation system that processes customer inquiries and routes them using natural language processing.",
      image: "/placeholder.svg?height=300&width=500",
      technologies: ["n8n", "OpenAI API", "Python", "MongoDB"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
    },
    {
      id: 3,
      title: "Brand Identity Campaign",
      category: "visual",
      description:
        "Complete visual identity and marketing campaign for a tech startup, including photography and video content.",
      image: "/placeholder.svg?height=300&width=500",
      technologies: ["Adobe Creative Suite", "Final Cut Pro", "After Effects"],
      liveUrl: "#",
      videoUrl: "#",
      featured: false,
    },
    {
      id: 4,
      title: "Real-time Analytics Dashboard",
      category: "web",
      description:
        "Interactive dashboard for monitoring business metrics with real-time data visualization and alerts.",
      image: "/placeholder.svg?height=300&width=500",
      technologies: ["React", "D3.js", "WebSocket", "Node.js"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
    },
    {
      id: 5,
      title: "Content Creation Pipeline",
      category: "ai",
      description:
        "Automated content generation and publishing system for social media platforms with AI-driven optimization.",
      image: "/placeholder.svg?height=300&width=500",
      technologies: ["Python", "OpenAI API", "Social Media APIs", "Scheduler"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
    },
    {
      id: 6,
      title: "Product Photography Series",
      category: "visual",
      description:
        "High-end product photography series for luxury brands with creative lighting and post-processing techniques.",
      image: "/placeholder.svg?height=300&width=500",
      technologies: ["Professional Photography", "Lightroom", "Photoshop"],
      liveUrl: "#",
      featured: false,
    },
  ]

  const filteredProjects =
    activeCategory === "all" ? projects : projects.filter((project) => project.category === activeCategory)

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
              onClick={() => setActiveCategory(category.id)}
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
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className={`glass-morphism rounded-2xl overflow-hidden group ${
                project.featured ? "lg:col-span-2 lg:row-span-1" : ""
              }`}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Overlay Actions */}
                <div className="absolute inset-0 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {project.liveUrl && (
                    <motion.a
                      href={project.liveUrl}
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
              <div className="p-6">
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

                <p className="text-gray-300 leading-relaxed mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-800 border border-gray-600 rounded-full text-xs text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default ProjectsSection
