// -------------- Skill icons and their metadata --------------
import { type ExperienceKey } from "@/types";
export type SkillKey =
    | "html"
    | "css"
    | "javascript"
    | "typescript"
    | "react"
    | "nextjs"
    | "tailwind"
    | "git";

export type SkillItem = {
    key: SkillKey;
    icon: string; // Iconify icon name
    iconWrapClassName: string;
};

export const SKILLS: SkillItem[] = [
    { key: "html", icon: "vscode-icons:file-type-html", iconWrapClassName: "bg-orange-500/15 text-orange-500" },
    { key: "css", icon: "vscode-icons:file-type-css", iconWrapClassName: "bg-blue-500/15 text-blue-500" },
    { key: "javascript", icon: "vscode-icons:file-type-js-official", iconWrapClassName: "bg-yellow-500/15 text-yellow-500" },
    { key: "typescript", icon: "vscode-icons:file-type-typescript-official", iconWrapClassName: "bg-sky-500/15 text-sky-500" },
    { key: "react", icon: "logos:react", iconWrapClassName: "bg-cyan-500/15 text-cyan-500" },
    { key: "nextjs", icon: "logos:nextjs-icon", iconWrapClassName: "bg-zinc-500/15 text-zinc-700 dark:text-zinc-200" },
    { key: "tailwind", icon: "logos:tailwindcss-icon", iconWrapClassName: "bg-teal-500/15 text-teal-500" },
    { key: "git", icon: "logos:git-icon", iconWrapClassName: "bg-red-500/15 text-red-500" },
];
// -----------------------------------------------------------
// -------------- Service icons and their metadata --------------
export type ServiceKey = "responsiveWeb" | "figmaToCode" | "reactApps" | "performance" | "accessibility" | "apiIntegration";

export type ServiceItem = {
    key: ServiceKey;
    icon: string; // Iconify icon name
};


export const SERVICES: ServiceItem[] = [
    { key: "responsiveWeb", icon: "mdi:responsive" },
    { key: "figmaToCode", icon: "simple-icons:figma" },
    { key: "reactApps", icon: "mdi:react" },
    { key: "performance", icon: "mdi:speedometer" },
    { key: "accessibility", icon: "mdi:human" },
    { key: "apiIntegration", icon: "mdi:api" },
] as const;

// -----------------------------------------------------------
// -------------- My Experience icons and their metadata --------------

export type ExperienceIconItem = {
    key: ExperienceKey;
    icon: string; // Iconify icon name
};

export const EXPERIENCE_ICONS: ExperienceIconItem[] = [
    { key: "companyA", icon: "mdi:briefcase-outline" },
    { key: "companyB", icon: "mdi:office-building-outline" },

];
