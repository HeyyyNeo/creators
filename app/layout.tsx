import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Best Birthday Party Place in Noida | Fat Tiger Sector 135",
  description:
    "Looking for birthday party venues in Noida? Fat Tiger offers momos, burgers, boba & full party setups in Sector 135. Book now!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        rel="stylesheet"
        precedence="default"
      ></link>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <body className="min-h-full flex flex-col">{children}</body>
      <script src="https://cdn.tailwindcss.com" async></script>
    </html>
  );
}
