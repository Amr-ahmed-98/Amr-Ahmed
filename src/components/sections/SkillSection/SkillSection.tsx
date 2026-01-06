"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Icon } from "@iconify/react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { SKILLS } from "@/assets/icons";
import { SectionHeading } from "@/components/shared/SectionHeading";
import {
    staggerContainer,
    itemFadeIn,
    hoverLift,
    iconHover,
    viewportConfig,
} from "@/components/animations/animations";


export default function SkillSection() {
    const t = useTranslations("skills");
    const locale = useLocale();
    const isRTL = locale === "ar";

    return (
        <section id="skills" dir={isRTL ? "rtl" : "ltr"} className="py-16 sm:py-24">
            <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
                {/* Heading */}
                <SectionHeading title={t("title")} subtitle={t("subtitle")} />
                {/* Grid */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportConfig.loose}
                    className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
                >

                    {SKILLS.map((skill) => (
                        <motion.div
                            key={skill.key}
                            variants={itemFadeIn}
                            {...hoverLift}
                            className="h-full"
                        >
                            <Card
                                className={cn(
                                    "group h-full rounded-2xl border bg-card p-6 shadow-sm transition-shadow",
                                    "hover:shadow-md"
                                )}
                            >
                                <div className="flex flex-col items-center text-center">
                                    <motion.div {...iconHover} className={cn("grid size-16 place-items-center rounded-2xl", skill.iconWrapClassName)}>
                                        <Icon icon={skill.icon} className="size-8" />
                                    </motion.div>

                                    <div className="mt-5 text-base font-medium">
                                        {t(`items.${skill.key}`)}
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section >
    );
}
