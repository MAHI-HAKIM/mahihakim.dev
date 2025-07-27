"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState } from "react"
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, Instagram } from "lucide-react"

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setFormData({ name: "", email: "", subject: "", message: "" })

    // You would integrate with your preferred form handling service here
    alert("Message sent successfully!")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const contactInfo = [
    {
      icon: <Mail className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />,
      label: "Email",
      value: "mahi@abdulhakim.dev",
      href: "mailto:mahi@abdulhakim.dev",
    },
    {
      icon: <Phone className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />,
      label: "Phone",
      value: "+1 (555) 123-4567",
      href: "tel:+15551234567",
    },
    {
      icon: <MapPin className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />,
      label: "Location",
      value: "Available Worldwide",
      href: null,
    },
  ]

  const socialLinks = [
    { icon: <Github className="w-4 h-4 sm:w-5 sm:h-5" />, label: "GitHub", href: "#", color: "hover:text-gray-300" },
    {
      icon: <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />,
      label: "LinkedIn",
      href: "#",
      color: "hover:text-blue-400",
    },
    { icon: <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />, label: "Twitter", href: "#", color: "hover:text-blue-400" },
    {
      icon: <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />,
      label: "Instagram",
      href: "#",
      color: "hover:text-pink-400",
    },
  ]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gradient mb-4 sm:mb-6"
          >
            Let's Connect
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base lg:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed px-4"
          >
            Ready to bring your ideas to life? Let's discuss how we can create something extraordinary together.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={cardVariants}
            className="glass-morphism rounded-xl sm:rounded-2xl p-6 sm:p-8 order-2 lg:order-1"
          >
            <motion.h3 variants={itemVariants} className="text-xl sm:text-2xl font-bold text-white mb-6">
              Send a Message
            </motion.h3>

            <motion.form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6" variants={containerVariants}>
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                <motion.div variants={itemVariants}>
                  <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all duration-300 text-sm sm:text-base"
                    placeholder="Your name"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all duration-300 text-sm sm:text-base"
                    placeholder="your@email.com"
                  />
                </motion.div>
              </div>

              <motion.div variants={itemVariants}>
                <label htmlFor="subject" className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all duration-300 text-sm sm:text-base"
                  placeholder="Project inquiry"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all duration-300 resize-none text-sm sm:text-base"
                  placeholder="Tell me about your project..."
                />
              </motion.div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center space-x-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-gray-200 to-white text-black font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-white/10 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </motion.form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
            className="space-y-6 sm:space-y-8 order-1 lg:order-2"
          >
            {/* Contact Details */}
            <motion.div variants={cardVariants} className="glass-morphism rounded-xl sm:rounded-2xl p-6 sm:p-8">
              <motion.h3 variants={itemVariants} className="text-xl sm:text-2xl font-bold text-white mb-6">
                Get in Touch
              </motion.h3>

              <div className="space-y-4 sm:space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.label}
                    variants={itemVariants}
                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                    className="flex items-center space-x-3 sm:space-x-4 group cursor-pointer"
                  >
                    <motion.div
                      className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 chrome-gradient rounded-full group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <div className="text-black">{info.icon}</div>
                    </motion.div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm text-gray-400">{info.label}</p>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-sm sm:text-base text-white hover:text-gradient transition-all duration-300 break-all"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-sm sm:text-base text-white">{info.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={cardVariants} className="glass-morphism rounded-xl sm:rounded-2xl p-6 sm:p-8">
              <motion.h3 variants={itemVariants} className="text-lg sm:text-xl font-bold text-white mb-6">
                Follow My Work
              </motion.h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center space-x-3 p-3 sm:p-4 bg-gray-800/30 rounded-lg text-gray-400 ${social.color} transition-all duration-300 hover:bg-gray-700/30 hover:shadow-lg`}
                  >
                    {social.icon}
                    <span className="font-medium text-sm sm:text-base">{social.label}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Availability Status */}
            <motion.div
              variants={cardVariants}
              className="glass-morphism rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center"
            >
              <motion.div variants={itemVariants} className="flex items-center justify-center space-x-2 mb-4">
                <motion.div
                  className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
                <span className="text-green-400 font-medium text-sm sm:text-base">Available for Projects</span>
              </motion.div>
              <motion.p variants={itemVariants} className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                Currently accepting new projects and collaborations. Let's create something amazing together!
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
