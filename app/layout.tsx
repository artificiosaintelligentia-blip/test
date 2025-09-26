import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TopMediumVisie - Spirituele Adviseurs & Mediums',
  description: 'Verbind met ervaren mediums, helderzienden en life coaches. Betaal per minuut voor calls, chat of berichten.',
  keywords: 'medium, helderziend, life coach, spiritueel adviseur, tarot, reiki, paranormaal',
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'https://topmediumvisie.com'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}