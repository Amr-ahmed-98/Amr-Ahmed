"use client";

import React, { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  Home,
  Code2,
  Briefcase,
  Award,
  FolderOpen,
  Sun,
  Moon,
  Globe,
  Download,
  Menu,
  Folder,
} from "lucide-react";
import { cn } from "@/lib/utils";

import type { NavItem } from "@/types";



const navItems: NavItem[] = [
  { id: "all", icon: <Folder className="w-5 h-5" />, labelKey: "allSections", href: "#" },
  { id: "hero", icon: <Home className="w-5 h-5" />, labelKey: "hero", href: "#hero" },
  { id: "skills", icon: <Code2 className="w-5 h-5" />, labelKey: "skills", href: "#skills" },
  { id: "services", icon: <Briefcase className="w-5 h-5" />, labelKey: "services", href: "#services" },
  { id: "experience", icon: <Award className="w-5 h-5" />, labelKey: "experience", href: "#experience" },
  { id: "projects", icon: <FolderOpen className="w-5 h-5" />, labelKey: "projects", href: "#projects" },
];

function SidebarContent({ onItemClick }: { onItemClick?: () => void }) {
  const t = useTranslations("sidebar");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState("all");

  const switchLanguage = () => {
    const newLocale = locale === "en" ? "ar" : "en";
    router.replace(pathname, { locale: newLocale });
  };

  const handleNavClick = (id: string, href: string) => {
    setActiveSection(id);

    // Dispatch custom event to notify page component
    const event = new CustomEvent("sectionChange", {
      detail: { section: id }
    });
    window.dispatchEvent(event);

    // Smooth scroll to section if it's not "all"
    if (href.startsWith("#") && href !== "#") {
      setTimeout(() => {
        const element = document.querySelector(href);
        element?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } else if (id === "all") {
      // Scroll to top when "all" is selected
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    onItemClick?.();
  };

  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col h-full p-4 bg-sidebar border-r border-sidebar-border">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-sidebar-foreground">
          {t("title")}
        </h2>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id, item.href)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
              "text-sidebar-foreground hover:bg-sidebar-accent",
              activeSection === item.id &&
              "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
            data-cursor="nav"
            data-cursor-text="Go"
          >
            {item.icon}
            <span className="font-medium">{t(item.labelKey)}</span>
          </button>
        ))}
      </nav>

      {/* Settings Section */}
      <div className="space-y-3 mt-6 pt-6 border-t border-sidebar-border">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
          aria-label="Toggle theme"
          data-cursor="button"
          data-cursor-text="Toggle"
        >
          <span className="text-muted-foreground font-medium">{t("theme")}</span>
          {theme === "light" ? (
            <Sun className="w-5 h-5 text-muted-foreground" />
          ) : (
            <Moon className="w-5 h-5 text-muted-foreground" />
          )}
        </button>

        {/* Language Toggle */}
        <button
          onClick={switchLanguage}
          className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
          aria-label="Switch language"
          data-cursor="button"
          data-cursor-text="Toggle"
        >
          <span className="text-muted-foreground font-medium">{t("language")}</span>
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground uppercase">{locale}</span>
          </div>
        </button>

        {/* Download Resume Button */}
        <Button
          onClick={handleDownloadResume}
          className="w-full flex items-center justify-center gap-2"
          size="lg"
          aria-label="Dawnload Resume"
          data-cursor="button"
          data-cursor-text="Download"
        >
          <Download className="w-5 h-5" />
          <span className="font-medium">{t("downloadResume")}</span>
        </Button>
      </div>
    </div>
  );
}

export function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-80 h-screen sticky top-0">
        <SidebarContent />
      </aside>

      {/* Mobile Header with Menu Button */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg font-bold">Portfolio</h1>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" aria-label="Open menu" data-cursor="button" data-cursor-text="Menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-80">
            <SheetHeader>
              <SheetTitle className="sr-only">Navigation menu</SheetTitle>
            </SheetHeader>
            <SidebarContent onItemClick={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
      </header>
    </>
  );
}