import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Argentina Passport",
  description:
    "Argentina Passport is a boutique citizenship by investment firm delivering discreet guidance for global investors.",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return children;
}
