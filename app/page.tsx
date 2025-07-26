"use client"

import Navigation from "@/components/navigation"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import ExperienceSection from "@/components/experience-section"
import ProjectsSection from "@/components/projects-section"
import SkillsSection from "@/components/skills-section"
import ContactSection from "@/components/contact-section"

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
    </main>
  )
}
