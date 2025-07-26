"use client"

import { motion } from "framer-motion"
import { Code2, Brain, Camera, Zap } from "lucide-react"

const AboutSection = () => {
  const skills = [
    {
      icon: <Code2 className="w-8 h-8" />,
      title: "Full-Stack Development",
      description: "Building scalable web applications with modern frameworks like Next.js, React, and Node.js.",
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI Automation",
      description: "Creating intelligent workflows and automation solutions using n8n and API integrations.",
    },
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Visual Content Creation",
      description: "Professional photography, videography, and content creation for digital platforms.",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Performance Optimization",
      description: "Optimizing applications for speed, SEO, and exceptional user experiences.",
    },
  ]

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-bold text-gradient mb-6">About Me</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            I'm a passionate technologist who bridges the gap between cutting-edge development and creative expression.
            With expertise spanning full-stack development, AI automation, and visual storytelling, I bring a unique
            perspective to every project.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-white mb-4">My Journey</h3>
            <p className="text-gray-300 leading-relaxed">
              My journey began with a fascination for how technology can transform ideas into reality. Over the years,
              I've evolved from a curious developer into a multidisciplinary creator who leverages the latest in web
              technologies, artificial intelligence, and visual media.
            </p>
            <p className="text-gray-300 leading-relaxed">
              I believe in the power of continuous learning and staying ahead of technological trends. Whether it's
              implementing cutting-edge React features, building AI-powered automation workflows, or capturing
              compelling visual narratives, I approach each project with innovation and attention to detail.
            </p>
            <div className="flex flex-wrap gap-3 pt-4">
              {["Next.js", "TypeScript", "AI/ML", "n8n", "Photography", "Video Production"].map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-full text-sm text-gray-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass-morphism rounded-2xl p-8"
          >
            <h3 className="text-xl font-bold text-white mb-6">What Drives Me</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 chrome-gradient rounded-full"></div>
                <span className="text-gray-300">Creating seamless user experiences</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 chrome-gradient rounded-full"></div>
                <span className="text-gray-300">Automating complex workflows</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 chrome-gradient rounded-full"></div>
                <span className="text-gray-300">Pushing creative boundaries</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 chrome-gradient rounded-full"></div>
                <span className="text-gray-300">Delivering exceptional results</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-morphism rounded-xl p-6 text-center group hover:bg-gray-800/20 transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 chrome-gradient rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                <div className="text-black">{skill.icon}</div>
              </div>
              <h4 className="text-lg font-semibold text-white mb-3">{skill.title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed">{skill.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutSection
