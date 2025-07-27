"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin, Award, TrendingUp } from "lucide-react"
import Image from "next/image"

const ExperienceSection = () => {
  const experiences = [
    {
      id: 1,
      company: "TechFlow Solutions",
      position: "Senior Full-Stack Developer",
      duration: "2022 - Present",
      location: "Remote",
      description:
        "Leading development of enterprise-scale web applications using Next.js and Node.js. Implemented AI-powered features that increased user engagement by 40%.",
      achievements: [
        "Architected microservices handling 1M+ daily requests",
        "Reduced application load time by 60% through optimization",
        "Mentored 5 junior developers in modern React patterns",
      ],
      technologies: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "AWS"],
      logo: "/placeholder.svg?height=60&width=60&text=TF",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      company: "Digital Innovations Inc",
      position: "AI Automation Specialist",
      duration: "2021 - 2022",
      location: "New York, NY",
      description:
        "Designed and implemented automated workflows using n8n and custom APIs. Created intelligent systems that streamlined business processes.",
      achievements: [
        "Automated 15+ business processes saving 200+ hours/month",
        "Built custom AI integrations with 99.9% uptime",
        "Increased operational efficiency by 35%",
      ],
      technologies: ["n8n", "Python", "OpenAI API", "Zapier", "MongoDB"],
      logo: "/placeholder.svg?height=60&width=60&text=DI",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: 3,
      company: "Creative Media Studio",
      position: "Full-Stack Developer & Content Creator",
      duration: "2020 - 2021",
      location: "Los Angeles, CA",
      description:
        "Developed custom CMS solutions for content creators while producing high-quality visual content for digital marketing campaigns.",
      achievements: [
        "Built custom CMS used by 50+ content creators",
        "Produced 100+ marketing videos with 2M+ total views",
        "Increased client social media engagement by 150%",
      ],
      technologies: ["React", "Express.js", "Adobe Creative Suite", "Final Cut Pro"],
      logo: "/placeholder.svg?height=60&width=60&text=CM",
      color: "from-orange-500 to-red-500",
    },
    {
      id: 4,
      company: "StartupLab",
      position: "Junior Developer",
      duration: "2019 - 2020",
      location: "San Francisco, CA",
      description:
        "Contributed to various startup projects, focusing on rapid prototyping and MVP development using modern web technologies.",
      achievements: [
        "Delivered 8+ MVP projects within tight deadlines",
        "Improved code quality through comprehensive testing",
        "Collaborated with cross-functional teams of 10+ members",
      ],
      technologies: ["React", "Node.js", "MongoDB", "Firebase", "Figma"],
      logo: "/placeholder.svg?height=60&width=60&text=SL",
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
