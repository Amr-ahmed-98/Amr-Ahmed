"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

import { Project, ProjectCategory } from "@/types";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { createItemAnimation, flipCardConfig } from "@/components/animations/animations";


const FILTERS: Array<{ key: ProjectCategory }> = [
    { key: "all" },
    { key: "ecommerce" },
    { key: "dashboards" },
    { key: "landingPages" },
    { key: "Apps" },
];


const DEFAULT_PROJECTS: Project[] = [
    {
        id: "Education-App",
        titleKey: "items.education.title",
        descriptionKey: "items.education.description",
        categories: ["Apps"],
        tags: ["Tailwind", "axios", "Shadcn", "ReactJS", "TypeScript", "Vite",],
        image: { src: "/images/Education.webp", altKey: "items.education.imageAlt" },
        liveUrl: "https://education-app-rho-black.vercel.app/",
        repoUrl: "https://github.com/Amr-ahmed-98/Education-App",
        accent: "primary",
    },
    {
        id: "ecommerce-platform",
        titleKey: "items.ecommercePlatform.title",
        descriptionKey: "items.ecommercePlatform.description",
        categories: ["ecommerce"],
        tags: ["Nextjs", "Reactjs", "Typescript", "TailwindCSS", "MaterialUI", "Redux Toolkit", "Firebase"],
        image: { src: "/images/ecommerce.webp", altKey: "items.ecommercePlatform.imageAlt" },
        liveUrl: "https://yalla-n-shop-e-commerce-omega.vercel.app/",
        repoUrl: "https://github.com/Amr-ahmed-98/YallaNShop-E-commerce",
        accent: "primary",
    },
    {
        id: "analytics-dashboard",
        titleKey: "items.analyticsDashboard.title",
        descriptionKey: "items.analyticsDashboard.description",
        categories: ["dashboards"],
        tags: ["Next.js", "React", "Typescript", "TailwindCSS", "react-query", "DaisyUI", "Chart.js"],
        image: { src: "/images/dashboard.webp", altKey: "items.analyticsDashboard.imageAlt" },
        liveUrl: "https://simple-dashboard-rosy.vercel.app/",
        repoUrl: "https://github.com/Amr-ahmed-98/Simple-Dashboard",
        accent: "primary",
    },
    {
        id: "modern-landing-page",
        titleKey: "items.modernLandingPage.title",
        descriptionKey: "items.modernLandingPage.description",
        categories: ["landingPages"],
        tags: ["Next.js", "Tailwind", "Motion", "daisyui", "ReactJS"],
        image: { src: "/images/LandingPage.webp", altKey: "items.modernLandingPage.imageAlt" },
        liveUrl: "https://zytronic-assessment.vercel.app/",
        repoUrl: "https://github.com/Amr-ahmed-98/Zytronic-Assessment",
        accent: "primary",
    },
    {
        id: "Weather-App",
        titleKey: "items.weatherapp.title",
        descriptionKey: "items.weatherapp.description",
        categories: ["Apps"],
        tags: ["Tailwind", "axios", "daisyui", "ReactJS"],
        image: { src: "/images/weatherapp.webp", altKey: "items.weatherapp.imageAlt" },
        liveUrl: "https://amr-ahmed-98.github.io/Weather-App/",
        repoUrl: "https://github.com/Amr-ahmed-98/Weather-App",
        accent: "primary",
    },
];

function cn(...classes: Array<string | undefined | null | false>) {
    return classes.filter(Boolean).join(" ");
}

export default function ProjectsSection({
    projects = DEFAULT_PROJECTS,
    id = "projects",
}: {
    projects?: Project[];
    id?: string;
}) {
    const locale = useLocale();
    const t = useTranslations("experience.items.projects");

    const [active, setActive] = React.useState<ProjectCategory>("all");

    const filtered = React.useMemo(() => {
        if (active === "all") return projects;
        return projects.filter((p) => p.categories.includes(active as Exclude<ProjectCategory, "all">));
    }, [active, projects]);

    return (
        <section id={id} dir={locale === "ar" ? "rtl" : "ltr"} className="w-full py-14 sm:py-16">
            <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
                {/* Heading  */}
                <SectionHeading title={t("title")} subtitle={t("subtitle")} />
                {/* Filters */}
                <div className="mt-8 flex justify-center">
                    <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-border bg-muted/40 p-1">
                        {FILTERS.map(({ key }) => {
                            const isActive = active === key;

                            return (
                                <button
                                    key={key}
                                    type="button"
                                    onClick={() => setActive(key)}
                                    aria-label="filter buttons"
                                    className={cn(
                                        "relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200",
                                        "text-muted-foreground hover:text-foreground",
                                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
                                        isActive && "text-primary-foreground"
                                    )}
                                >
                                    {isActive ? (
                                        <motion.span
                                            layoutId="projects-active-filter"
                                            className="absolute inset-0 rounded-full bg-primary shadow-sm"
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                            aria-hidden="true"
                                        />
                                    ) : null}

                                    <span className="relative z-10">{t(`filters.${key}`)}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Grid - Simplified animation */}
                <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filtered.map((project, index) => (
                        <ProjectFlipCard
                            key={project.id}
                            project={project}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

// Memoized component to prevent unnecessary re-renders
const ProjectFlipCard = React.memo(({ project, index }: { project: Project; index: number }) => {
    const t = useTranslations("experience.items.projects");
    const [flipped, setFlipped] = React.useState(false);

    const title = t(project.titleKey);
    const description = project.descriptionKey ? t(project.descriptionKey) : "";
    const imageAlt = t(project.image.altKey);

    const accent = project.accent ?? "primary";
    const anim = createItemAnimation(index * 0.05);

    const backClass =
        accent === "primary"
            ? "bg-primary text-primary-foreground"
            : "bg-card text-card-foreground";

    return (
        <motion.article {...anim} className="group">
            {/* Perspective wrapper */}
            <div
                className="relative h-[420px] w-full rounded-2xl cursor-pointer"
                style={{ perspective: flipCardConfig.perspective }}
                data-cursor="card"
                data-cursor-text="Flip"
                onMouseEnter={() => setFlipped(true)}
                onMouseLeave={() => setFlipped(false)}
                onClick={() => setFlipped((v) => !v)}
            >
                <motion.div
                    className="relative h-full w-full rounded-2xl shadow-sm"
                    style={{
                        transformStyle: "preserve-3d",
                        willChange: "transform",
                    }}
                    animate={{ rotateY: flipped ? 180 : 0 }}
                    transition={flipCardConfig.transition}
                >
                    {/* FRONT */}
                    <div
                        className="absolute inset-0 overflow-hidden rounded-2xl border border-border bg-card text-card-foreground"
                        style={{ backfaceVisibility: "hidden" }}
                    >
                        <div className="relative h-52 w-full">
                            <Image
                                src={project.image.src}
                                alt={imageAlt}
                                fill
                                className="object-cover"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                loading="lazy"
                                quality={85}
                            />
                        </div>

                        <div className="p-5">
                            <h3 className="text-lg font-semibold">{title}</h3>

                            {project.tags?.length ? (
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="rounded-full bg-accent px-3 py-1 text-xs text-accent-foreground"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            ) : null}

                            <p className="mt-4 line-clamp-3 text-sm text-muted-foreground">{description}</p>
                            <p className="mt-6 text-xs text-muted-foreground">{t("hoverHint")}</p>
                        </div>
                    </div>

                    {/* BACK */}
                    <div
                        className={`absolute inset-0 rounded-2xl border border-border ${backClass}`}
                        style={{
                            transform: "rotateY(180deg)",
                            backfaceVisibility: "hidden",
                        }}
                    >
                        <div className="flex h-full flex-col justify-between p-6">
                            <div>
                                <h3 className="text-xl font-semibold">{title}</h3>
                                {description ? (
                                    <p
                                        className={
                                            accent === "primary"
                                                ? "mt-3 text-sm leading-relaxed text-primary-foreground/90"
                                                : "mt-3 text-sm leading-relaxed text-muted-foreground"
                                        }
                                    >
                                        {description}
                                    </p>
                                ) : null}
                            </div>

                            <div className="space-y-3">
                                {project.liveUrl ? (
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className={
                                            accent === "primary"
                                                ? "flex w-full items-center justify-center rounded-xl bg-primary-foreground px-4 py-3 text-sm font-medium text-primary transition-transform hover:scale-[1.02]"
                                                : "flex w-full items-center justify-center rounded-xl border border-border bg-secondary px-4 py-3 text-sm font-medium text-foreground hover:bg-accent transition-colors"
                                        }
                                        aria-label="live preview"
                                        data-cursor="link"
                                        data-cursor-text="Open"
                                    >
                                        {t("actions.livePreview")}
                                    </a>
                                ) : null}

                                {project.repoUrl ? (
                                    <a
                                        href={project.repoUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className={
                                            accent === "primary"
                                                ? "flex w-full items-center justify-center rounded-xl border border-primary-foreground/40 px-4 py-3 text-sm font-medium text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
                                                : "flex w-full items-center justify-center rounded-xl border border-border px-4 py-3 text-sm font-medium text-foreground hover:bg-accent transition-colors"
                                        }
                                        aria-label="view reposotory"
                                        data-cursor="link"
                                        data-cursor-text="Open"
                                    >
                                        {t("actions.viewRepo")}
                                    </a>
                                ) : null}

                                <p className={accent === "primary" ? "text-center text-xs text-primary-foreground/80" : "text-center text-xs text-muted-foreground"}>
                                    {t("flipHint")}
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.article>
    );
});

ProjectFlipCard.displayName = "ProjectFlipCard";