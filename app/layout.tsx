import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from '@vercel/analytics/next';
// import { NextSeo } from 'next-seo'
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://gokulbarath.vercel.app'),
  title: "Gokulbarath - Robotics & AI Developer",
  description: "Portfolio of Gokulbarath - A passionate Robotics, AI, and ML developer building the future of automation and intelligent systems.",
  verification: {
    google: 'rBRuGO1Cm1PRYSWNaunCsSkoMd84Tetqw914_NKfV1Q',
  },
};

// const config = {
//   title: "Gokulbarath - Robotics & AI Developer",
//   description: "Portfolio of Gokulbarath - A passionate Robotics, AI, and ML developer building the future of automation and intelligent systems. Explore my projects in robotics, deep learning, and automation.",
//   canonical: "https://gokulbarath.vercel.app",
//   openGraph: {
//     type: 'website',
//     locale: 'en_IE',
//     url: 'https://gokulbarath.vercel.app',
//     siteName: 'Gokulbarath Portfolio',
//     title: 'Gokulbarath - Robotics & AI Developer',
//     description: 'Portfolio of Gokulbarath - Robotics, AI, and ML developer',
//     images: [
//       {
//         url: 'https://avatars.githubusercontent.com/u/64578167?v=4',
//         width: 800,
//         height: 600,
//         alt: 'Gokulbarath Profile',
//       }
//     ],
//   },
//   twitter: {
//     handle: '@yourtwitterhandle',
//     site: '@yourtwitterhandle',
//     cardType: 'summary_large_image',
//   },
//   additionalMetaTags: [
//     {
//       name: 'keywords',
//       content: 'robotics, AI, machine learning, python, automation, deep learning, computer vision, developer, portfolio'
//     },
//     {
//       name: 'author',
//       content: 'Gokulbarath'
//     }
//   ]
// }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* <NextSeo {...config} /> */}
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
