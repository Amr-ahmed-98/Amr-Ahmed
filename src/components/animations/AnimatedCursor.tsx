"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type CursorMode = "default" | "nav" | "card" | "link" | "button";

const MODE: Record<
    CursorMode,
    { ring: number; dot: number; ringOpacity: number; dotOpacity: number }
> = {
    default: { ring: 34, dot: 6, ringOpacity: 0.35, dotOpacity: 1 },
    nav: { ring: 46, dot: 4, ringOpacity: 0.55, dotOpacity: 1 },
    card: { ring: 70, dot: 6, ringOpacity: 0.25, dotOpacity: 1 },
    link: { ring: 42, dot: 4, ringOpacity: 0.6, dotOpacity: 1 },
    button: { ring: 40, dot: 4, ringOpacity: 0.6, dotOpacity: 1 },
};

export function AnimatedCursor() {
    const reduceMotion = useReducedMotion();

    // Only enable for real mouse devices (desktop/laptop)
    const [enabled, setEnabled] = useState(false);

    // Cursor state (changes only on hover/click, not per-move)
    const [mode, setMode] = useState<CursorMode>("default");
    const [down, setDown] = useState(false);
    const [label, setLabel] = useState<string | null>(null);

    // Track pointer position via MotionValues (no React re-render)
    const x = useMotionValue(-100);
    const y = useMotionValue(-100);

    // Smooth trailing ring
    const ringX = useSpring(x, { stiffness: 700, damping: 45, mass: 0.7 });
    const ringY = useSpring(y, { stiffness: 700, damping: 45, mass: 0.7 });

    // Throttle pointermove -> only 1 update per frame
    const raf = useRef<number | null>(null);
    const latest = useRef({ x: -100, y: -100 });

    useEffect(() => {
        const mql = window.matchMedia("(hover: hover) and (pointer: fine)");
        const update = () => setEnabled(mql.matches);
        update();
        mql.addEventListener?.("change", update);
        return () => mql.removeEventListener?.("change", update);
    }, []);

    useEffect(() => {
        if (!enabled) return;

        const onMove = (e: PointerEvent) => {
            if (e.pointerType !== "mouse") return;

            latest.current = { x: e.clientX, y: e.clientY };
            if (raf.current != null) return;

            raf.current = requestAnimationFrame(() => {
                x.set(latest.current.x);
                y.set(latest.current.y);
                raf.current = null;
            });
        };

        const onOver = (e: PointerEvent) => {
            const target = e.target as HTMLElement | null;
            const el = target?.closest?.("[data-cursor]") as HTMLElement | null;

            if (!el) {
                setMode("default");
                setLabel(null);
                return;
            }

            const nextMode = (el.getAttribute("data-cursor") as CursorMode) ?? "default";
            setMode(nextMode);

            const text = el.getAttribute("data-cursor-text");
            setLabel(text ? text : null);
        };

        const onOut = (e: PointerEvent) => {
            // If moving between children inside the same hoverable element, don’t reset.
            const target = e.target as HTMLElement | null;
            const related = e.relatedTarget as HTMLElement | null;

            const currentHoverEl = target?.closest?.("[data-cursor]") as HTMLElement | null;
            if (currentHoverEl && related && currentHoverEl.contains(related)) return;

            if (currentHoverEl) {
                setMode("default");
                setLabel(null);
            }
        };

        const onDown = () => setDown(true);
        const onUp = () => setDown(false);

        window.addEventListener("pointermove", onMove, { passive: true });
        document.addEventListener("pointerover", onOver, { passive: true });
        document.addEventListener("pointerout", onOut, { passive: true });
        window.addEventListener("pointerdown", onDown, { passive: true });
        window.addEventListener("pointerup", onUp, { passive: true });

        return () => {
            window.removeEventListener("pointermove", onMove);
            document.removeEventListener("pointerover", onOver);
            document.removeEventListener("pointerout", onOut);
            window.removeEventListener("pointerdown", onDown);
            window.removeEventListener("pointerup", onUp);
            if (raf.current != null) cancelAnimationFrame(raf.current);
        };
    }, [enabled, x, y]);

    if (!enabled) return null;

    // Respect prefers-reduced-motion: show only a tiny dot (optional)
    if (reduceMotion) {
        return (
            <motion.div
                aria-hidden="true"
                className="pointer-events-none fixed inset-0 z-[9999]"
            >
                <motion.div
                    className="absolute rounded-full bg-primary"
                    style={{ x, y }}
                    transformTemplate={(_, generated) => `${generated} translate(-50%, -50%)`}
                    animate={{ width: 6, height: 6, opacity: 1 }}
                />
            </motion.div>
        );
    }

    const cfg = MODE[mode];
    const ringSize = Math.round(cfg.ring * (down ? 0.92 : 1));
    const dotSize = Math.round(cfg.dot * (down ? 0.85 : 1));

    return (
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[9999]">
            {/* Trailing ring */}
            <motion.div
                className="absolute rounded-full border border-primary/50 bg-primary/10"
                style={{ x: ringX, y: ringY, willChange: "transform" }}
                transformTemplate={(_, generated) => `${generated} translate(-50%, -50%)`}
                animate={{
                    width: ringSize,
                    height: ringSize,
                    opacity: cfg.ringOpacity,
                }}
                transition={{ type: "spring", stiffness: 500, damping: 35, mass: 0.7 }}
            />

            {/* Dot */}
            <motion.div
                className="absolute rounded-full bg-primary"
                style={{ x, y, willChange: "transform" }}
                transformTemplate={(_, generated) => `${generated} translate(-50%, -50%)`}
                animate={{
                    width: dotSize,
                    height: dotSize,
                    opacity: cfg.dotOpacity,
                }}
                transition={{ type: "spring", stiffness: 900, damping: 40, mass: 0.5 }}
            />

            {/* Optional label (appears on hover if you set data-cursor-text) */}
            {label ? (
                <motion.div
                    className="absolute select-none rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground"
                    style={{ x, y }}
                    transformTemplate={(_, generated) => `${generated} translate(12px, 12px)`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                >
                    {label}
                </motion.div>
            ) : null}
        </div>
    );
}
