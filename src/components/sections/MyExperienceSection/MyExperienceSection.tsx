"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { useLocale, useTranslations } from "next-intl";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { EXPERIENCE_ICONS } from "@/assets/icons";

import { type ExperienceItem } from "@/types";
import { SectionHeading } from "@/components/shared/SectionHeading";
import {
    staggerList,
    itemFadeInSubtle,
    timelineDot,
    viewportConfig,
} from "@/components/animations/animations";



const items: ExperienceItem[] = EXPERIENCE_ICONS;

export default function ExperienceSection() {
    const t = useTranslations("experience");
    const locale = useLocale();
    const isRTL = locale === "ar";

    return (
        <section id="experience" dir={isRTL ? "rtl" : "ltr"} className="py-16 sm:py-24">
            <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
                {/* Heading */}
                <SectionHeading title={t("title")} subtitle={t("subtitle")} />

                {/* Timeline list */}
                <div className="relative mt-10 sm:mt-12">
                    {/* One connected line for ALL dots */}
                    <div className="pointer-events-none absolute inset-y-0 left-[11px] w-px bg-border lg:left-1/2 lg:-translate-x-1/2" />

                    <motion.div
                        variants={staggerList}
                        initial="hidden"
                        whileInView="show"
                        viewport={viewportConfig.loose}
                        className="space-y-6"
                    >
                        {items.map((it, idx) => {

                            const rawBullets = t.raw(`items.${it.key}.bullets`);
                            const bullets =
                                Array.isArray(rawBullets)
                                    ? rawBullets.filter((x) => typeof x === "string" && x.trim().length)
                                    : [];

                            return (
                                <ExperienceRow
                                    key={it.key}
                                    icon={it.icon}
                                    company={t(`items.${it.key}.company`)}
                                    period={t(`items.${it.key}.period`)}
                                    role={t(`items.${it.key}.role`)}
                                    bullets={bullets}
                                    isRTL={isRTL}
                                    isLast={idx === items.length - 1}
                                />
                            );
                        })}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function ExperienceRow(props: {
    icon: string;
    company: string;
    period: string;
    role: string;
    bullets: string[];
    isRTL: boolean;
    isLast: boolean;
}) {
    const { icon, company, period, role, bullets, isRTL, isLast } = props;

    return (
        <motion.div variants={itemFadeInSubtle}>
            {/* Force the ROW layout to LTR so Arabic looks exactly like English */}
            <div
                dir="ltr"
                className={cn(
                    "grid gap-4",
                    "grid-cols-[24px_1fr]",
                    "lg:grid-cols-[1fr_56px_1fr] lg:gap-8",
                    "items-start"
                )}
            >
                {/* Timeline column */}
                <div className="relative flex justify-center lg:col-start-2">
                    <motion.span {...timelineDot} className={cn("relative z-10 mt-5 sm:mt-6 block size-4 rounded-full bg-primary", "ring-4 ring-background")} />
                    {/* Optional fade at the end */}
                    {isLast && (
                        <div className="pointer-events-none absolute bottom-0 left-1/2 h-10 w-6 -translate-x-1/2 bg-gradient-to-b from-transparent to-background" />
                    )}
                </div>

                {/* Content wrapper:
            - Mobile: stacked in col 2
            - Desktop: children become grid items */}
                <div className="space-y-4 lg:contents">
                    {/* Company card (always left column, pulled toward center line) */}
                    <div className="w-full lg:col-start-1 lg:max-w-md lg:justify-self-end">
                        <HoverCardCompany
                            icon={icon}
                            company={company}
                            period={period}
                            dir={isRTL ? "rtl" : "ltr"}
                        />
                    </div>

                    {/* Details card (always right column, pulled toward center line) */}
                    <div className="w-full lg:col-start-3 lg:max-w-md lg:justify-self-start">
                        <HoverCardDetails role={role} bullets={bullets} dir={isRTL ? "rtl" : "ltr"} />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function HoverCardCompany(props: {
    icon: string;
    company: string;
    period: string;
    dir: "rtl" | "ltr";
}) {
    const { icon, company, period, dir } = props;

    return (
        <motion.div initial="rest" animate="rest" whileHover="hover" className="w-full">
            <Card
                dir={dir}
                className={cn(
                    "group rounded-2xl border bg-card p-4 sm:p-5 shadow-sm transition-all",
                    "hover:-translate-y-1 hover:border-primary/60 hover:shadow-lg"
                )}
            >
                <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                        <div className="grid size-9 sm:size-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                            <Icon icon={icon} className="size-5 sm:size-6" />
                        </div>

                        <div className="min-w-0">
                            <div className="truncate text-sm sm:text-base font-semibold">{company}</div>
                            <div className="mt-1 text-xs sm:text-sm text-primary">{period}</div>
                        </div>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
}

function HoverCardDetails(props: {
    role: string;
    bullets: string[];
    dir: "rtl" | "ltr";
}) {
    const { role, bullets, dir } = props;

    return (
        <motion.div initial="rest" animate="rest" whileHover="hover" className="w-full">
            <Card
                dir={dir}
                className={cn(
                    "group rounded-2xl border bg-card p-4 sm:p-5 shadow-sm transition-all",
                    "hover:-translate-y-1 hover:border-primary/60 hover:shadow-lg"
                )}
            >
                <div className="text-sm sm:text-base font-semibold">{role}</div>

                {/* Flexible bullets: renders any amount (including 0) */}
                {bullets.length > 0 && (
                    <ul className="mt-3 space-y-2 text-sm text-muted-foreground sm:text-base">
                        {bullets.map((b, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <span className="mt-[9px] size-1.5 shrink-0 rounded-full bg-primary" />
                                <span className="leading-relaxed">{b}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </Card>
        </motion.div>
    );
}
