// types/sidebar.types.ts
export interface NavItem {
    id: string;
    icon: React.ReactNode;
    labelKey: string;
    href: string;
}

export type SectionId = "all" | "hero" | "skills" | "services" | "experience" | "projects";