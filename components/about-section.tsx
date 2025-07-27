"use client"

import { motion } from "framer-motion"
import { Code, Palette, Zap, Users, Trophy, Lightbulb } from "lucide-react"

const AboutSection = () => {
  const highlights = [
    {
      icon: Code,
      text: "5+ years of full-stack development expertise",
    },
    {
      icon: Zap,
      text: "AI automation specialist with proven results",
    },
    {
      icon: Palette,
      text: "Creative problem solver with design thinking",
    },
    {
      icon: Users,
      text: "Team leader and mentor to junior developers",
    },
    {
      icon: Trophy,
      text: "Delivered 50+ successful projects",
    },
    {
      icon: Lightbulb,
      text: "Innovation-driven with cutting-edge solutions",
    },
  ]

  const skills = [
    { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
    { category: "Backend", items: ["Node.js", "Python", "PostgreSQL", "MongoDB"] },
    { category: "AI/Automation", items: ["OpenAI API", "n8n", "Zapier", "Custom APIs"] },
    { category: "Tools", items: ["Git", "Docker", "AWS", "Vercel"] },
  ]

  return (
    <section id="about" className="min-h-screen flex items-center py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gradient mb-4">About Me</h2>
          <p className="text-base text-gray-300 max-w-2xl mx-auto">
            Passionate developer crafting digital experiences with modern technologies
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left Column - Story & Highlights */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="glass-morphism rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="relative">
                  {/* Outer glow ring */}
                  <div className="absolute inset-0 w-6 h-6 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-sm animate-pulse" />
                  {/* Main chrome gradient */}
                  <div className="relative w-6 h-6 chrome-gradient rounded-full" />
                  {/* Inner shine effect */}
                  <div className="absolute inset-1 bg-gradient-to-br from-white/40 to-transparent rounded-full" />
                  {/* Center highlight */}
                  <div className="absolute inset-2 bg-white/20 rounded-full" />
                </div>
                <h3 className="text-lg font-semibold text-white">My Story</h3>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed mb-4">
                I'm a passionate full-stack developer and AI automation specialist with over 5 years of experience
                creating innovative digital solutions. My journey spans from crafting elegant user interfaces to
                building robust backend systems and implementing intelligent automation workflows.
              </p>
              <p className="text-sm text-gray-300 leading-relaxed">
                I thrive on solving complex problems and turning ideas into reality through clean, efficient code and
                cutting-edge technologies.
              </p>
            </div>

            <div className="glass-morphism rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="relative">
                  {/* Outer glow ring */}
                  <div className="absolute inset-0 w-6 h-6 bg-gradient-to-r from-emerald-400/30 to-cyan-400/30 rounded-full blur-sm animate-pulse" />
                  {/* Main chrome gradient */}
                  <div className="relative w-6 h-6 chrome-gradient rounded-full" />
                  {/* Inner shine effect */}
                  <div className="absolute inset-1 bg-gradient-to-br from-white/40 to-transparent rounded-full" />
                  {/* Center highlight */}
                  <div className="absolute inset-2 bg-white/20 rounded-full" />
                </div>
                <h3 className="text-lg font-semibold text-white">Key Highlights</h3>
              </div>
              <div className="grid gap-3">
                {highlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3 group hover:bg-gray-800/20 rounded-lg p-2 transition-all duration-300"
                  >
                    {/* Enhanced shiny bullet point */}
                    <div className="relative flex-shrink-0">
                      {/* Outer animated glow ring */}
                      <div className="absolute inset-0 w-5 h-5 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-md opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500 animate-pulse" />

                      {/* Secondary glow ring */}
                      <div className="absolute inset-0 w-5 h-5 bg-gradient-to-r from-cyan-400/30 to-blue-400/30 rounded-full blur-sm opacity-60 group-hover:opacity-80 group-hover:scale-125 transition-all duration-300" />

                      {/* Main chrome bullet with gradient */}
                      <div className="relative w-5 h-5 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 rounded-full group-hover:scale-110 transition-all duration-300 shadow-lg">
                        {/* Top shine highlight */}
                        <div className="absolute inset-0.5 bg-gradient-to-br from-white/60 via-white/30 to-transparent rounded-full" />

                        {/* Center metallic shine */}
                        <div className="absolute inset-1 bg-gradient-to-br from-white/40 via-transparent to-gray-400/20 rounded-full" />

                        {/* Inner core glow */}
                        <div className="absolute inset-1.5 bg-white/30 rounded-full group-hover:bg-white/50 transition-all duration-300" />

                        {/* Animated sparkle effect */}
                        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute top-1 left-1 w-1 h-1 bg-white rounded-full animate-ping" />
                          <div className="absolute bottom-1 right-1 w-0.5 h-0.5 bg-blue-200 rounded-full animate-pulse" />
                        </div>
                      </div>

                      {/* Reflection effect */}
                      <div className="absolute inset-0 w-5 h-5 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-full group-hover:from-white/20 transition-all duration-300" />
                    </div>

                    <highlight.icon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors flex-shrink-0" />
                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                      {highlight.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Skills */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="glass-morphism rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="relative">
                  {/* Outer glow ring */}
                  <div className="absolute inset-0 w-6 h-6 bg-gradient-to-r from-orange-400/30 to-red-400/30 rounded-full blur-sm animate-pulse" />
                  {/* Main chrome gradient */}
                  <div className="relative w-6 h-6 chrome-gradient rounded-full" />
                  {/* Inner shine effect */}
                  <div className="absolute inset-1 bg-gradient-to-br from-white/40 to-transparent rounded-full" />
                  {/* Center highlight */}
                  <div className="absolute inset-2 bg-white/20 rounded-full" />
                </div>
                <h3 className="text-lg font-semibold text-white">Technical Skills</h3>
              </div>
              <div className="grid gap-4">
                {skills.map((skillGroup, index) => (
                  <motion.div
                    key={skillGroup.category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <h4 className="text-sm font-medium text-gray-400 mb-2 group-hover:text-white transition-colors">
                      {skillGroup.category}
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {skillGroup.items.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-gray-800/50 border border-gray-600/30 rounded-md text-xs text-gray-300 hover:border-gray-400/50 hover:bg-gray-700/50 hover:scale-105 transition-all duration-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="glass-morphism rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="relative">
                  {/* Outer glow ring */}
                  <div className="absolute inset-0 w-6 h-6 bg-gradient-to-r from-green-400/30 to-teal-400/30 rounded-full blur-sm animate-pulse" />
                  {/* Main chrome gradient */}
                  <div className="relative w-6 h-6 chrome-gradient rounded-full" />
                  {/* Inner shine effect */}
                  <div className="absolute inset-1 bg-gradient-to-br from-white/40 to-transparent rounded-full" />
                  {/* Center highlight */}
                  <div className="absolute inset-2 bg-white/20 rounded-full" />
                </div>
                <h3 className="text-lg font-semibold text-white">What I Do</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="relative flex-shrink-0 mt-2">
                    {/* Mini shiny bullet */}
                    <div className="absolute inset-0 w-3 h-3 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-sm" />
                    <div className="relative w-3 h-3 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 rounded-full shadow-sm">
                      <div className="absolute inset-0.5 bg-gradient-to-br from-white/50 to-transparent rounded-full" />
                      <div className="absolute inset-1 bg-white/30 rounded-full" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white mb-1">Full-Stack Development</h4>
                    <p className="text-xs text-gray-400">End-to-end web applications with modern frameworks</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="relative flex-shrink-0 mt-2">
                    {/* Mini shiny bullet */}
                    <div className="absolute inset-0 w-3 h-3 bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 rounded-full blur-sm" />
                    <div className="relative w-3 h-3 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 rounded-full shadow-sm">
                      <div className="absolute inset-0.5 bg-gradient-to-br from-white/50 to-transparent rounded-full" />
                      <div className="absolute inset-1 bg-white/30 rounded-full" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white mb-1">AI Automation</h4>
                    <p className="text-xs text-gray-400">Intelligent workflows and process optimization</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="relative flex-shrink-0 mt-2">
                    {/* Mini shiny bullet */}
                    <div className="absolute inset-0 w-3 h-3 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-full blur-sm" />
                    <div className="relative w-3 h-3 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 rounded-full shadow-sm">
                      <div className="absolute inset-0.5 bg-gradient-to-br from-white/50 to-transparent rounded-full" />
                      <div className="absolute inset-1 bg-white/30 rounded-full" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white mb-1">Content Creation</h4>
                    <p className="text-xs text-gray-400">High-quality visual content and digital media</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
