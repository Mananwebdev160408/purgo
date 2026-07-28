import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Purgo — Intelligent Developer Disk Manager for Windows',
  description: 'Open-source developer disk manager for Windows. Discover and clean recreatable build artifacts (node_modules, target/, venv), global toolchain caches, large files, and stale repos safely with 30-day Purgo Trash.',
  openGraph: {
    title: 'Purgo — Intelligent Developer Disk Manager for Windows',
    description: 'Reclaim tens of gigabytes from node_modules, Rust target/, build caches, and stale git repos safely with 30-day Purgo Trash.',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/logo.png', type: 'image/png' },
    ],
    shortcut: '/logo.png',
    apple: [
      { url: '/logo.png', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased bg-[#080a11] text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-200`}
      >
        {children}
      </body>
    </html>
  );
}
