"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin } from "lucide-react"

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
      logo: "🚀",
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
      logo: "🤖",
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
      logo: "🎬",
    },
  ]

  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-gradient mb-6">Experience</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A journey through innovative companies where I've crafted digital solutions and automated complex workflows
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-600 to-transparent hidden lg:block" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`relative lg:grid lg:grid-cols-2 lg:gap-12 items-center ${
                  index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-6 w-4 h-4 chrome-gradient rounded-full hidden lg:block transform -translate-x-1/2" />

                {/* Company logo and basic info */}
                <div className={`${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                  <motion.div whileHover={{ scale: 1.02, y: -5 }} className="glass-morphism rounded-2xl p-8 h-full">
                    <div className="flex items-start space-x-4 mb-6">
                      <div className="text-4xl">{exp.logo}</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-1">{exp.company}</h3>
                        <p className="text-lg text-gray-300 mb-2">{exp.position}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{exp.duration}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{exp.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-300 leading-relaxed mb-6">{exp.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-gray-800 border border-gray-600 rounded-full text-xs text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Achievements */}
                <div className={`mt-8 lg:mt-0 ${index % 2 === 1 ? "lg:col-start-1" : ""}`}>
                  <motion.div whileHover={{ scale: 1.02, y: -5 }} className="glass-morphism rounded-2xl p-8 h-full">
                    <h4 className="text-lg font-semibold text-white mb-6 flex items-center">
                      <div className="w-2 h-2 chrome-gradient rounded-full mr-3" />
                      Key Achievements
                    </h4>
                    <ul className="space-y-4">
                      {exp.achievements.map((achievement, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-start space-x-3"
                        >
                          <div className="w-1.5 h-1.5 chrome-gradient rounded-full mt-2 flex-shrink-0" />
                          <span className="text-gray-300 leading-relaxed">{achievement}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExperienceSection
