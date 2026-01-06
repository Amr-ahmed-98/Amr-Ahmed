// components/sections/Hero.tsx
"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export function HeroSection() {
    const t = useTranslations("hero");

    const handleDownloadResume = () => {
        // Create a temporary link element to trigger download
        const link = document.createElement("a");
        link.href = "/Resume/AmrAhmed.pdf"; // Path to your PDF in the public folder
        link.download = "AmrAhmed.pdf"; // Name of the downloaded file
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleHireMe = () => {
        // Replace with your actual email address
        const email = "amrahmedwork@hotmail.com";
        const subject = "Job Opportunity";
        const body = "Hello, I would like to discuss a potential opportunity with you.";

        // Create mailto link with subject and body
        window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    return (
        <section id="hero" className="relative overflow-hidden min-h-[calc(100vh-3.5rem)] lg:min-h-screen flex items-center">
            <div className="pointer-events-none absolute inset-0 hidden dark:block">
                <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
                <div className="absolute right-0 top-24 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
            </div>


            <div className="relative mx-auto max-w-6xl px-4 py-12 lg:py-16">
                <div className="grid items-center gap-10 lg:grid-cols-2">
                    {/* Text */}
                    <div className="space-y-5">
                        <p className="text-muted-foreground">{t("intro")}</p>

                        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                            {t("name")}
                        </h1>

                        <p className="text-primary font-medium">{t("title")}</p>

                        <p className="max-w-xl text-muted-foreground leading-relaxed">
                            {t("description")}
                        </p>

                        <div className="flex flex-wrap gap-3 pt-3">
                            <Button onClick={handleDownloadResume} aria-label="Dawnload Resume" data-cursor="link" data-cursor-text="Dawnload">{t("download")}</Button>
                            <Button variant="outline" onClick={handleHireMe} aria-label="Hire Me" data-cursor="link" data-cursor-text="GO">{t("hire")}</Button>
                        </div>
                    </div>

                    {/* Image */}
                    <div className="flex justify-center lg:justify-end">
                        <div className="relative h-64 w-64 sm:h-80 sm:w-80">
                            <div className="absolute inset-0 hidden rounded-full bg-primary/10 blur-2xl dark:block" />
                            <div className="relative overflow-hidden rounded-full border border-border bg-card shadow-xl">
                                <Image
                                    src="/images/myImage.webp"
                                    alt={t("photoAlt")}
                                    width={640}
                                    height={640}
                                    className="h-full w-full object-cover"
                                    priority
                                    sizes="(max-width: 640px) 256px, 320px"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}