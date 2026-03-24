"use client"

import { motion } from "framer-motion"
import { useState } from "react"

const SkillsSection = () => {
  const skills = {
    development: [
      { name: "Next.js", level: 95, description: "Advanced React framework for production applications" },
      { name: "TypeScript", level: 90, description: "Type-safe JavaScript development" },
      { name: "React", level: 95, description: "Modern component-based UI development" },
      { name: "Node.js", level: 88, description: "Server-side JavaScript runtime" },
      { name: "PostgreSQL", level: 85, description: "Advanced database design and optimization" },
      { name: "GraphQL", level: 80, description: "Efficient API query language" },
    ],
    ai: [
      { name: "n8n Automation", level: 70, description: "Workflow automation and integration" },
      { name: "OpenAI API", level: 75, description: "AI model integration and prompt engineering" },
      { name: "Python", level: 65, description: "Data processing and AI scripting" },
      { name: "TensorFlow", level: 85, description: "Machine learning and deep learning" },
      { name: "Keras", level: 45, description: "Machine learning and deep learning" },
      { name: "PyTorch", level: 55, description: "Machine learning and deep learning" },
      { name: "Matplotlib", level: 50, description: "Data processing and analysis" },
      { name: "API Integration", level: 90, description: "Third-party service connections" },
      { name: "Workflow Design", level: 90, description: "Business process automation" },
      { name: "Data Analysis", level: 80, description: "Insights and pattern recognition" },
    ],
    creative: [
      { name: "Photography", level: 90, description: "Professional product and portrait photography" },
      { name: "Video Production", level: 88, description: "End-to-end video content creation" },
      { name: "Adobe Creative Suite", level: 85, description: "Photoshop, Premiere, After Effects" },
      { name: "Content Strategy", level: 87, description: "Strategic content planning and execution" },
      { name: "Brand Design", level: 83, description: "Visual identity and brand development" },
      { name: "UI/UX Design", level: 86, description: "User-centered design principles" },
    ],
    IoT: [
      { name: "NodeMCU(ESP8266)", level: 90, description: "IoT development" },
      { name: "Arduino", level: 85, description: "IoT development" },
      { name: "Firebase", level: 80, description: "IoT development" },
      { name: "React Native (Expo)", level: 85, description: "IoT development" },
    ],
    tools: [
      { name: "Git & GitHub", level: 92, description: "Version control and collaboration" },
      { name: "Docker", level: 85, description: "Containerization and deployment" },
      { name: "AWS", level: 80, description: "Cloud infrastructure and services" },
      { name: "Vercel", level: 90, description: "Modern deployment and hosting" },
      { name: "Figma", level: 88, description: "Design collaboration and prototyping" },
      { name: "Analytics", level: 85, description: "Performance monitoring and insights" },
    ],
  }

  const [activeSkillCategory, setActiveSkillCategory] = useState<keyof typeof skills>("development")

  const skillCategories: { id: keyof typeof skills; label: string; icon: string }[] = [
    { id: "development", label: "Development", icon: "💻" },
    { id: "ai", label: "AI & Automation", icon: "🤖" },
    { id: "creative", label: "Creative", icon: "🎨" },
    { id: "IoT", label: "IoT & Robotics", icon: "🤖" },
    { id: "tools", label: "Tools & Platforms", icon: "🛠️" },
  ]

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-gradient mb-6">Skills & Expertise</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A comprehensive toolkit spanning modern development, AI automation, and creative content production
          </p>
        </motion.div>

        {/* Skill Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {skillCategories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveSkillCategory(category.id)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center space-x-3 px-6 py-4 rounded-2xl font-medium transition-all duration-300 ${
                activeSkillCategory === category.id
                  ? "bg-gradient-to-r from-gray-200 to-white text-black"
                  : "glass-morphism text-gray-300 hover:text-white hover:bg-gray-800/30"
              }`}
            >
              <span className="text-xl">{category.icon}</span>
              <span>{category.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          key={activeSkillCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skills[activeSkillCategory].map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass-morphism rounded-2xl p-6 group hover:bg-gray-800/20 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white group-hover:text-gradient transition-all duration-300">
                  {skill.name}
                </h3>
                <span className="text-sm text-gray-400 font-medium">{skill.level}%</span>
              </div>

              {/* Skill Progress Bar */}
              <div className="relative mb-4">
                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="h-full chrome-gradient relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shine" />
                  </motion.div>
                </div>
              </div>

              <p className="text-sm text-gray-400 leading-relaxed">{skill.description}</p>

              {/* Skill level indicator */}
              <div className="flex items-center space-x-1 mt-4">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i < Math.floor(skill.level / 20) ? "chrome-gradient" : "bg-gray-700"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 glass-morphism rounded-2xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-4">Continuous Learning</h3>
          <p className="text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Technology evolves rapidly, and so do I. I'm constantly exploring new frameworks, tools, and methodologies
            to stay at the forefront of innovation. Currently diving deep into Web3 technologies, advanced AI
            integrations, and immersive 3D web experiences.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default SkillsSection
