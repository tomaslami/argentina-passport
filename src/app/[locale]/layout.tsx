import type { ReactNode } from "react";
import localFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { routing } from "@/i18n/routing";

const helveticaNeue = localFont({
  src: [
    {
      path: "../../../public/fonts/helvetica-light-587ebe5a59211.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../../public/fonts/helvetica-light-587ebe5a59211.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Helvetica.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Helvetica.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Helvetica-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-helvetica-neue",
  display: "swap",
});

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  if (!locale || !routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages({ locale });
  const textDirection = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={textDirection} className={helveticaNeue.variable}>
      <body className="bg-navy-900 text-cream-50 antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
