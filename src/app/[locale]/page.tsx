// app/[locale]/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HeroSection } from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection/ServicesSection";
import SkillSection from "@/components/sections/SkillSection/SkillSection";
import ExperienceSection from "@/components/sections/MyExperienceSection/MyExperienceSection";
import ProjectsSection from "@/components/sections/MyProjectsSection/MyProjectSection";
import { pageSectionVariants } from "@/components/animations/animations";

type SectionId = "all" | "hero" | "skills" | "services" | "experience" | "projects";

export default function Page() {
  const [activeSection, setActiveSection] = useState<SectionId>("all");

  useEffect(() => {
    const handleSectionChange = (event: CustomEvent<{ section: SectionId }>) => {
      setActiveSection(event.detail.section);
    };
    window.addEventListener("sectionChange" as any, handleSectionChange);
    return () => window.removeEventListener("sectionChange" as any, handleSectionChange);
  }, []);

  const sections = useMemo(
    () => ({
      hero: <HeroSection />,
      skills: <SkillSection />,
      services: <ServicesSection />,
      experience: <ExperienceSection />,
      projects: <ProjectsSection />,
    }),
    []
  );

  // ✅ Best performance: no wrappers at all for “all”
  if (activeSection === "all") {
    return (
      <div className="flex flex-col">
        {sections.hero}
        {sections.skills}
        {sections.services}
        {sections.experience}
        {sections.projects}
      </div>
    );
  }

  // ✅ Animate only when switching to one section
  return (
    <div className="flex flex-col">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeSection}
          variants={pageSectionVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {sections[activeSection]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
