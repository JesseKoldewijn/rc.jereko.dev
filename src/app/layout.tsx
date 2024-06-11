import type { Metadata } from "next";
import localFont from "next/font/local";

import "@/styles/tailwind.css";
import "@/styles/globals.css";
import { cookies } from "next/headers";
import { themeConfig } from "@/config/theme";
import ThemeToggle from "@/components/theme/ThemeToggle";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: {
    absolute: "RC Jereko",
    template: "%s | RC Jereko",
  },
  description:
    "RC Jereko - A Next.js application running on the Next.js 15 and React.js 19 Release Candidates",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieJar = cookies();
  const themeCookie = cookieJar.get(themeConfig.cookie.name);
  const theme = themeCookie ? themeCookie.value : "dark";

  return (
    <html lang="en" className={theme}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        <ThemeToggle
          className="fixed right-4 bottom-4 md:bottom-6 md:right-6"
          theme="dark"
        />
      </body>
    </html>
  );
}
