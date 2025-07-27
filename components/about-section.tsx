"use client"

import { motion } from "framer-motion"
import { Code, Palette, Zap, Users, Brain, Rocket } from "lucide-react"

const AboutSection = () => {
  return (
    <section id="about" className="min-h-screen flex items-center py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gradient mb-4">About Me</h2>
          <p className="text-base text-gray-300 max-w-2xl mx-auto">
            Passionate developer crafting digital experiences with cutting-edge technology
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Story & Highlights */}
          <div className="space-y-6">
            {/* My Story */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="glass-morphism rounded-2xl p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="relative">
                  {/* Outer glow ring */}
                  <div className="absolute inset-0 w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-30 animate-ping" />
                  <div className="absolute inset-0 w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20 animate-pulse" />

                  {/* Main chrome bullet */}
                  <div className="relative w-5 h-5 bg-gradient-to-br from-gray-300 via-gray-100 to-gray-400 rounded-full shadow-lg">
                    {/* Top shine */}
                    <div className="absolute top-0.5 left-0.5 w-2 h-2 bg-gradient-to-br from-white to-transparent rounded-full opacity-60" />
                    {/* Center shine */}
                    <div className="absolute inset-0 w-5 h-5 bg-gradient-to-br from-transparent via-white to-transparent rounded-full opacity-20" />
                    {/* Inner core */}
                    <div className="absolute inset-1 w-3 h-3 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full" />
                    {/* Icon overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Brain className="w-2.5 h-2.5 text-gray-600" />
                    </div>
                  </div>

                  {/* Sparkle effects */}
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-300" />
                </div>
                <h3 className="text-lg font-bold text-white">My Story</h3>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                I'm a passionate full-stack developer with 4+ years of experience building scalable web applications. My
                journey began with curiosity about how websites work, and it evolved into a deep love for creating
                digital solutions that make a real impact. I specialize in modern JavaScript frameworks and have a
                particular interest in AI automation and user experience design.
              </p>
            </motion.div>

            {/* Key Highlights */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="glass-morphism rounded-2xl p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="relative group">
                  {/* Outer glow ring */}
                  <div className="absolute inset-0 w-5 h-5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full opacity-30 animate-ping" />
                  <div className="absolute inset-0 w-5 h-5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full opacity-20 animate-pulse" />

                  {/* Main chrome bullet */}
                  <div className="relative w-5 h-5 bg-gradient-to-br from-gray-300 via-gray-100 to-gray-400 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {/* Top shine */}
                    <div className="absolute top-0.5 left-0.5 w-2 h-2 bg-gradient-to-br from-white to-transparent rounded-full opacity-60" />
                    {/* Center shine */}
                    <div className="absolute inset-0 w-5 h-5 bg-gradient-to-br from-transparent via-white to-transparent rounded-full opacity-20" />
                    {/* Inner core */}
                    <div className="absolute inset-1 w-3 h-3 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full group-hover:bg-gradient-to-br group-hover:from-emerald-200 group-hover:to-cyan-200 transition-all duration-300" />
                    {/* Icon overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Zap className="w-2.5 h-2.5 text-gray-600 group-hover:text-emerald-600 transition-colors duration-300" />
                    </div>
                  </div>

                  {/* Sparkle effects */}
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-300" />
                  <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300" />
                </div>
                <h3 className="text-lg font-bold text-white">Key Highlights</h3>
              </div>
              <div className="space-y-3">
                {[
                  "4+ years of full-stack development experience",
                  "Specialized in Next.js, React, and Node.js",
                  "AI automation expert with n8n and custom APIs",
                  "Led teams of 5+ developers on enterprise projects",
                  "Built applications serving 1M+ daily users",
                ].map((highlight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-3 group"
                  >
                    <div className="relative mt-1.5">
                      {/* Smaller chrome bullet for sub-items */}
                      <div className="relative w-3 h-3 bg-gradient-to-br from-gray-300 via-gray-100 to-gray-400 rounded-full shadow-md group-hover:scale-125 transition-transform duration-200">
                        <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white rounded-full opacity-60" />
                        <div className="absolute inset-0.5 w-2 h-2 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full" />
                      </div>
                      {/* Glow effect */}
                      <div className="absolute inset-0 w-3 h-3 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full opacity-0 group-hover:opacity-20 group-hover:scale-150 transition-all duration-300" />
                    </div>
                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-200">
                      {highlight}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Skills & What I Do */}
          <div className="space-y-6">
            {/* Technical Skills */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="glass-morphism rounded-2xl p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="relative group">
                  {/* Outer glow ring */}
                  <div className="absolute inset-0 w-5 h-5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full opacity-30 animate-ping" />
                  <div className="absolute inset-0 w-5 h-5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full opacity-20 animate-pulse" />

                  {/* Main chrome bullet */}
                  <div className="relative w-5 h-5 bg-gradient-to-br from-gray-300 via-gray-100 to-gray-400 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {/* Top shine */}
                    <div className="absolute top-0.5 left-0.5 w-2 h-2 bg-gradient-to-br from-white to-transparent rounded-full opacity-60" />
                    {/* Center shine */}
                    <div className="absolute inset-0 w-5 h-5 bg-gradient-to-br from-transparent via-white to-transparent rounded-full opacity-20" />
                    {/* Inner core */}
                    <div className="absolute inset-1 w-3 h-3 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full group-hover:bg-gradient-to-br group-hover:from-orange-200 group-hover:to-red-200 transition-all duration-300" />
                    {/* Icon overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Code className="w-2.5 h-2.5 text-gray-600 group-hover:text-orange-600 transition-colors duration-300" />
                    </div>
                  </div>

                  {/* Sparkle effects */}
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-300" />
                  <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-red-400 rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300" />
                </div>
                <h3 className="text-lg font-bold text-white">Technical Skills</h3>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "Next.js",
                  "React",
                  "TypeScript",
                  "Node.js",
                  "Python",
                  "PostgreSQL",
                  "MongoDB",
                  "AWS",
                  "Docker",
                  "n8n",
                  "OpenAI API",
                  "Tailwind CSS",
                ].map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-1.5 bg-gray-800/50 border border-gray-600/30 rounded-lg text-xs text-gray-300 text-center hover:border-gray-400/50 hover:bg-gray-700/50 transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* What I Do */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="glass-morphism rounded-2xl p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="relative group">
                  {/* Outer glow ring */}
                  <div className="absolute inset-0 w-5 h-5 bg-gradient-to-r from-green-500 to-teal-500 rounded-full opacity-30 animate-ping" />
                  <div className="absolute inset-0 w-5 h-5 bg-gradient-to-r from-green-500 to-teal-500 rounded-full opacity-20 animate-pulse" />

                  {/* Main chrome bullet */}
                  <div className="relative w-5 h-5 bg-gradient-to-br from-gray-300 via-gray-100 to-gray-400 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {/* Top shine */}
                    <div className="absolute top-0.5 left-0.5 w-2 h-2 bg-gradient-to-br from-white to-transparent rounded-full opacity-60" />
                    {/* Center shine */}
                    <div className="absolute inset-0 w-5 h-5 bg-gradient-to-br from-transparent via-white to-transparent rounded-full opacity-20" />
                    {/* Inner core */}
                    <div className="absolute inset-1 w-3 h-3 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full group-hover:bg-gradient-to-br group-hover:from-green-200 group-hover:to-teal-200 transition-all duration-300" />
                    {/* Icon overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Rocket className="w-2.5 h-2.5 text-gray-600 group-hover:text-green-600 transition-colors duration-300" />
                    </div>
                  </div>

                  {/* Sparkle effects */}
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-300" />
                  <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-teal-400 rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300" />
                </div>
                <h3 className="text-lg font-bold text-white">What I Do</h3>
              </div>
              <div className="space-y-3">
                {[
                  { icon: Code, text: "Full-stack web application development" },
                  { icon: Palette, text: "UI/UX design and implementation" },
                  { icon: Zap, text: "AI automation and workflow optimization" },
                  { icon: Users, text: "Team leadership and mentoring" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-3 group"
                  >
                    <div className="relative mt-1.5">
                      {/* Smaller chrome bullet for sub-items */}
                      <div className="relative w-3 h-3 bg-gradient-to-br from-gray-300 via-gray-100 to-gray-400 rounded-full shadow-md group-hover:scale-125 transition-transform duration-200">
                        <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white rounded-full opacity-60" />
                        <div className="absolute inset-0.5 w-2 h-2 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full" />
                      </div>
                      {/* Glow effect */}
                      <div className="absolute inset-0 w-3 h-3 bg-gradient-to-r from-green-400 to-teal-400 rounded-full opacity-0 group-hover:opacity-20 group-hover:scale-150 transition-all duration-300" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <item.icon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-200" />
                      <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-200">
                        {item.text}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
