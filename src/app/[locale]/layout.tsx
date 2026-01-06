// app/[locale]/layout.tsx
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Providers } from "@/components/layout/providers";
import "@/app/globals.css";
import { Sidebar } from "@/components/layout/Sidebar";

import type { Metadata } from "next";

function getBaseUrl() {
  // 1) Your explicit URL (best)
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;

  // 2) If later you deploy on Vercel, this exists automatically
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;

  // 3) Local fallback
  return "http://localhost:3000";
}

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = await getBaseUrl();

  return {
    metadataBase: new URL(baseUrl),
    title: "Amr Ahmed | Frontend Developer",
    description: "Frontend developer portfolio: projects, services, and experience.",
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", ar: "/ar" },
    },
    openGraph: {
      title: "Amr Ahmed | Frontend Developer",
      description: "Frontend developer portfolio: projects, services, and experience.",
      url: `/${locale}`,
      siteName: "Amr Ahmed",
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Amr Ahmed | Frontend Developer",
      description: "Frontend developer portfolio: projects, services, and experience.",
    },
  };
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) notFound();

  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} suppressHydrationWarning>
      <body suppressHydrationWarning className="use-custom-cursor min-h-[100dvh] overflow-x-hidden">
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <div className="flex min-h-[100dvh] flex-col lg:flex-row">
              <Sidebar />
              <main className="w-full flex-1 min-w-0 pt-14 lg:pt-0">{children}</main>
            </div>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
