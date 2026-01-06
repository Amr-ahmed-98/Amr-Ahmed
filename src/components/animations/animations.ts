/**
 * Centralized animation configuration for framer-motion
 * This file contains reusable animation variants and configurations
 * to maintain consistency across the application and reduce code duplication.
 */

import { Variants } from "framer-motion";
import { easeInOut, easeOut } from "framer-motion";

// ============================================================================
// SECTION ANIMATIONS
// ============================================================================

/**
 * Section header fade-in animation
 * Used for main section titles and subtitles
 */
export const sectionHeaderAnimation = {
    initial: { opacity: 0, y: 10 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.35 },
    transition: { duration: 0.5 },
} as const;

/**
 * Page-level section transition variants
 * Used for AnimatePresence in main page layout
 */
export const pageSectionVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 20,
        scale: 0.98,
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94],
        },
    },
    exit: {
        opacity: 0,
        y: -20,
        scale: 0.98,
        transition: {
            duration: 0.2,
            ease: [0.25, 0.46, 0.45, 0.94],
        },
    },
};

// ============================================================================
// CONTAINER & LIST ANIMATIONS
// ============================================================================

/**
 * Container animation with stagger effect
 * Use for parent elements that contain multiple animated children
 * @param staggerDelay - Delay between each child animation (default: 0.08)
 * @param duration - Total animation duration (default: 0.5)
 */
export const createStaggerContainer = (
    staggerDelay: number = 0.08,
    duration: number = 0.5
): Variants => ({
    hidden: { opacity: 0, y: 18 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            staggerChildren: staggerDelay,
            duration,
            ease: easeInOut,
        },
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration,
            ease: easeInOut,
            staggerChildren: staggerDelay,
        },
    },
});

/**
 * Standard staggered container (most common use case)
 */
export const staggerContainer: Variants = createStaggerContainer();

/**
 * List container with stagger (no initial animation, just stagger children)
 */
export const staggerList: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
    visible: { transition: { staggerChildren: 0.12 } },
};

// ============================================================================
// ITEM/CARD ANIMATIONS
// ============================================================================

/**
 * Standard item/card fade-in animation
 * Used for cards, list items, and grid items
 */
export const itemFadeIn: Variants = {
    hidden: { opacity: 0, y: 14, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: easeInOut } },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: easeInOut } },
};

/**
 * Item fade-in with slightly less scale (for subtle animations)
 */
export const itemFadeInSubtle: Variants = {
    hidden: { opacity: 0, y: 14, scale: 0.99 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: easeInOut } },
};

/**
 * Simple fade and slide up for individual items
 * @param delay - Animation delay in seconds
 */
export const createItemAnimation = (delay: number = 0) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: {
        duration: 0.4,
        ease: easeOut,
        delay,
    },
});

// ============================================================================
// HOVER ANIMATIONS
// ============================================================================

/**
 * Standard hover lift animation
 * Lifts element up on hover with spring physics
 */
export const hoverLift = {
    whileHover: { y: -6 },
    transition: { type: "spring", stiffness: 320, damping: 22 },
} as const;

/**
 * Icon hover animation with rotation and scale
 * Creates a playful bouncy effect
 */
export const iconHover = {
    whileHover: { rotate: 6, scale: 1.06 },
    transition: { type: "spring", stiffness: 400, damping: 18 },
} as const;

/**
 * Alternative icon hover with less rotation
 */
export const iconHoverSubtle = {
    whileHover: { rotate: 4, scale: 1.06 },
    transition: { type: "spring", stiffness: 380, damping: 18 },
} as const;

/**
 * Card hover animation (for experience/company cards)
 */
export const cardHover = {
    initial: "rest",
    animate: "rest",
    whileHover: "hover",
} as const;

// ============================================================================
// 3D FLIP ANIMATIONS
// ============================================================================

/**
 * 3D card flip configuration
 * Use with perspective on parent element
 */
export const flipCardConfig = {
    perspective: 1200,
    transition: { type: "spring", stiffness: 300, damping: 25, mass: 0.8 },
    flipTransition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] },
} as const;

/**
 * 3D flip variants for card rotation
 */
export const flipCardVariants: Variants = {
    rest: { rotateY: 0 },
    hover: { rotateY: 180 },
};

/**
 * Flip card hover lift variants
 */
export const flipCardLiftVariants: Variants = {
    rest: { y: 0 },
    hover: { y: -6 },
};

/**
 * Flip card front/back face styles
 */
export const flipCardFaceStyle = {
    backfaceVisibility: "hidden" as const,
    transformStyle: "preserve-3d" as const,
};

// ============================================================================
// SPECIALTY ANIMATIONS
// ============================================================================

/**
 * Timeline dot scale animation
 * Used for experience section timeline dots
 */
export const timelineDot = {
    initial: { scale: 0.6, opacity: 0 },
    whileInView: { scale: 1, opacity: 1 },
    viewport: { once: true, amount: 0.6 },
    transition: { type: "spring", stiffness: 320, damping: 18 },
} as const;

/**
 * Icon wrapper scale variants (for service/skill cards)
 */
export const iconWrapperVariants: Variants = {
    rest: { scale: 1 },
    hover: { scale: 1.06, rotate: 4 },
};

/**
 * Alternative icon wrapper with more rotation
 */
export const iconWrapperVariantsPlayful: Variants = {
    rest: { scale: 1 },
    hover: { scale: 1.06, rotate: 6 },
};

// ============================================================================
// COMMON TRANSITIONS
// ============================================================================

/**
 * Spring transition configurations
 */
export const springTransitions = {
    default: { type: "spring", stiffness: 320, damping: 22 },
    stiff: { type: "spring", stiffness: 400, damping: 18 },
    smooth: { type: "spring", stiffness: 300, damping: 25 },
    bouncy: { type: "spring", stiffness: 380, damping: 18 },
} as const;

/**
 * Ease transition configurations
 */
export const easeTransitions = {
    default: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
    slow: { duration: 0.5, ease: "easeOut" },
    fast: { duration: 0.2, ease: "easeOut" },
} as const;

// ============================================================================
// VIEWPORT CONFIGURATIONS
// ============================================================================

/**
 * Common viewport configurations for whileInView
 */
export const viewportConfig = {
    default: { once: true, amount: 0.35 },
    strict: { once: true, amount: 0.6 },
    loose: { once: true, amount: 0.25 },
} as const;
