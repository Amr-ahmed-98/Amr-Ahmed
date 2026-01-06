"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";
import { SERVICES } from "@/assets/icons";
import { SectionHeading } from "@/components/shared/SectionHeading";

import {
    createStaggerContainer,
    itemFadeIn,
    flipCardConfig,
    flipCardVariants,
    flipCardLiftVariants,
    springTransitions,
    viewportConfig,
} from "@/components/animations/animations";


const container = createStaggerContainer(0.08, 0.45);


export default function ServicesSection() {
    const t = useTranslations("services");
    const locale = useLocale();
    const isRTL = locale === "ar";

    return (
        <section id="services" dir={isRTL ? "rtl" : "ltr"} className="py-16 sm:py-24" >
            <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
                {/* Heading */}
                <SectionHeading title={t("title")} subtitle={t("subtitle")} />

                {/* Cards */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={viewportConfig.loose}
                    className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
                >
                    {SERVICES.map((svc) => (
                        <motion.div key={svc.key} variants={itemFadeIn} className="h-full">
                            <FlipCard
                                icon={svc.icon}
                                title={t(`items.${svc.key}.title`)}
                                subtitle={t(`items.${svc.key}.subtitle`)}
                                description={t(`items.${svc.key}.description`)}
                            />
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}

function FlipCard(props: { icon: string; title: string; subtitle: string; description: string }) {
    return (
        <motion.div
            initial="rest"
            animate="rest"
            whileHover="hover"
            whileFocus="hover"
            className="relative h-64 w-full sm:h-72"
            data-cursor="card"
            data-cursor-text="Flip"
            style={{ perspective: flipCardConfig.perspective }}
        >
            <motion.div
                variants={flipCardLiftVariants}
                transition={springTransitions.default}
                className="h-full"
            >
                <motion.div
                    variants={flipCardVariants}
                    transition={flipCardConfig.flipTransition}
                    className="relative h-full w-full"
                    style={{ transformStyle: "preserve-3d" }}
                >


                    {/* Front */}
                    <div
                        className={cn(
                            "absolute inset-0 rounded-3xl border bg-card text-card-foreground shadow-sm",
                            "flex flex-col items-center justify-center px-6 text-center",
                            "transition-shadow hover:shadow-md"
                        )}
                        style={{ backfaceVisibility: "hidden" as const }}
                    >
                        <motion.div
                            variants={{ rest: { scale: 1 }, hover: { scale: 1.06, rotate: 4 } }}
                            transition={{ type: "spring", stiffness: 380, damping: 18 }}
                            className="grid size-16 place-items-center rounded-2xl bg-primary text-primary-foreground"
                        >
                            <Icon icon={props.icon} className="size-8" />
                        </motion.div>

                        <div className="mt-5 text-lg font-medium">{props.title}</div>
                        <div className="mt-2 text-sm text-muted-foreground sm:text-base">{props.subtitle}</div>
                    </div>

                    {/* Back */}
                    <div
                        className={cn(
                            "absolute inset-0 rounded-3xl border bg-primary text-primary-foreground shadow-sm",
                            "flex flex-col items-center justify-center px-6 text-center"
                        )}
                        style={{
                            backfaceVisibility: "hidden" as const,
                            transform: "rotateY(180deg)",
                        }}
                    >
                        <motion.div
                            variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }}
                            transition={{ type: "spring", stiffness: 380, damping: 18 }}
                            className="grid size-16 place-items-center rounded-2xl bg-primary-foreground/10"
                        >
                            <Icon icon={props.icon} className="size-8" />
                        </motion.div>

                        <p className="mt-5 max-w-[28ch] text-sm leading-relaxed sm:text-base">
                            {props.description}
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
