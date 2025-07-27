"use client"

import { motion, time } from "framer-motion"
import { Calendar, MapPin, Award, TrendingUp } from "lucide-react"
import Image from "next/image"

const ExperienceSection = () => {
  const experiences = [
    {
      id: 1,
      company: "Kitcenter",
      position: "Software Engineer – Product Maintenance & Support Systems",
      duration: "2025 - Present",
      location: "Remote",
      description:
        "Build and maintain a real-time customer support chat system, troubleshoot and improve existing products, optimize performance, and ensure stability of core platforms.",
      achievements: [
        "Developed a real-time customer support chat system.",
        "Optimized performance and stability of core platforms",
        "Troubleshoot and improve existing products",
      ],
      technologies: ["Next.js", "TypeScript", "Node.js", "MongoDB", "Socket.io"],
      logo: "/kitcenter.png",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      company: "Haramaya University",
      position: "Software Engineer Intern - Full Stack Development",
      duration: "2024 - 2025",
      location: " Hararghe, Ethiopia",
      description:
        "s an intern at Haramaya University's ICT Directorate, I contributed to the development of a Full-Stack Student Management System to streamline student records, enrollment, and academic tracking.",
      achievements: [
        "Engineered a Full-Stack Student Management System used by 5,000+ students, accelerating academic record retrieval time by 40% through optimized PostgreSQL queries.",
        "Optimized backend processes and database queries with Node.js, Express, and PostgreSQL, significantly boosting performance and scalability.",
        "Built custom AI integrations with 99.9% uptime",
        "Optimized performance and stability of core platforms",
      ],
      technologies: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "AWS" , "Docker" , "Express" , "Pipeline" ],
      logo: "/haramaya.png",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: 3,
      company: "Minaret Real Estate",
      position: "Desktop App Developer",
      duration: "2023 - 2024",
      location: "Addis Ababa, Ethiopia",
      description:
        " I contributed to building a desktop application for Minaret Real Estate Company, designed to streamline employee, property, and room management",
      achievements: [
        "Developed a desktop application for Minaret Real Estate Company, designed to streamline employee, property, and room management.",
        "Optimized data management and retrieval with ASP.NET Core and SQL Server, improving efficiency and scalability.",
        "Built a modern and intuitive UI with WinUI 3, enhancing user experience and workflow automation.",
    
      ],
      technologies: ["ASP.NET Core", "SQL Server","C#" ,"Entity Framework" ,"WPF" , "WinUI 3"],
      logo: "/minaret.png",
      color: "from-orange-500 to-red-500",
    },
    {
      id: 4,
      company: "Cinemagramic",
      position: "Content Creator",
      duration: "2023 - Present",
      location: " DMV, USA",
      description:
        "I am a content creator, videographer, and cinematographer passionate about crafting cinematic visuals and compelling storytelling.",
      achievements: [
        "Created 10+ high-quality videos, including tutorials, product reviews, and cinematic content, reaching 100,000+ views on YouTube.",
        "Developed a strong social media presence, growing my channel to 10,000+ subscribers and 100,000+ views on Instagram.",
        "Collaborated with 5+ brands and influencers, expanding my network and increasing engagement.",
      ],
      technologies: ["Canva", "Capcut","Davinci Resolve" , "Adobe Photoshop", "Adobe After Effects", "Adobe Lightroom"],
      logo: "/cinemagramic.jpg",
      color: "from-green-500 to-emerald-500",
    },
  ]

  return (
    <section id="experience" className="py-12 sm:py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gradient mb-3 sm:mb-4">Experience</h2>
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto">
            A journey through innovative companies where I've crafted digital solutions
          </p>
        </motion.div>

        {/* Responsive grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: (index % 2) * 0.1 }}
              viewport={{ once: true }}
              className="glass-morphism rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:bg-gray-800/30 transition-all duration-300"
            >
              {/* Company Info Section */}
              <div className="mb-4 sm:mb-6">
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className="flex items-center space-x-3 sm:space-x-4 flex-1">
                    {/* Company Logo */}
                    <div className="relative group flex-shrink-0">
                      <div
                        className={`absolute inset-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${exp.color} rounded-full opacity-20 group-hover:opacity-30 transition-all duration-300`}
                      />
                      <div className="relative w-10 h-10 sm:w-12 sm:h-12 bg-gray-800 rounded-full border-2 border-gray-600 flex items-center justify-center overflow-hidden group-hover:border-gray-400 transition-all duration-300">
                        <Image
                          src={exp.logo || "/placeholder.svg"}
                          alt={`${exp.company} logo`}
                          width={24}
                          height={24}
                          className="sm:w-8 sm:h-8 rounded-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 sm:space-x-3 mb-1 sm:mb-2">
                        <h3 className="text-base sm:text-lg font-bold text-white truncate">{exp.company}</h3>
                        <div className={`w-8 sm:w-12 h-0.5 bg-gradient-to-r ${exp.color} rounded-full flex-shrink-0`} />
                      </div>
                      <p className="text-sm sm:text-base text-gray-300 mb-1 sm:mb-2">{exp.position}</p>
                      <div className="flex flex-wrap gap-2 sm:gap-3 text-xs text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{exp.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-3 sm:mb-4">{exp.description}</p>

                <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-3 sm:mb-4">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gray-800/50 border border-gray-600/30 rounded text-xs text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Achievements Section */}
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center space-x-2 mb-2 sm:mb-3">
                  <div
                    className={`w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-r ${exp.color} rounded-full flex items-center justify-center`}
                  >
                    <Award className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                  </div>
                  <h4 className="text-sm sm:text-base font-semibold text-white">Key Achievements</h4>
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  {exp.achievements.map((achievement, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start space-x-2 sm:space-x-3 group hover:bg-gray-800/20 rounded-lg p-1.5 sm:p-2 transition-all duration-200"
                    >
                      <div className="relative flex-shrink-0 mt-1.5">
                        <div
                          className={`w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r ${exp.color} rounded-full group-hover:scale-125 transition-all duration-200`}
                        />
                        <div
                          className={`absolute inset-0 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r ${exp.color} rounded-full opacity-0 group-hover:opacity-20 group-hover:scale-150 transition-all duration-300`}
                        />
                      </div>
                      <div className="flex items-start space-x-1.5 sm:space-x-2 flex-1">
                        <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-gray-300 leading-relaxed group-hover:text-white transition-colors">
                          {achievement}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExperienceSection
