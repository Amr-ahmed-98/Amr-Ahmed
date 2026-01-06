"use client";

import { motion } from "framer-motion";
import { sectionHeaderAnimation } from "@/components/animations/animations";

export function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
    return (
        <motion.div {...sectionHeaderAnimation} className="text-center">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
            {subtitle ? <p className="mt-2 text-sm text-muted-foreground sm:text-base">{subtitle}</p> : null}
        </motion.div>
    );
}
