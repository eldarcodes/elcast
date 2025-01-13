import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { ApolloClientProvider } from '@/providers/apollo-client-provider';

import '@/styles/globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://elcast.eldarcodes.com'),
  title: {
    default: 'Elcast',
    template: '%s | Elcast',
  },
  description: 'A streaming platform offering interactive live content.',
  openGraph: {
    title: 'Elcast',
    description: 'A streaming platform offering interactive live content.',
    url: 'https://elcast.eldarcodes.com',
    siteName: 'Elcast',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: 'Elcast',
    card: 'summary_large_image',
  },

  // @TODO: Add verification keys
  // verification: {
  //   google: "",
  //   yandex: "",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ApolloClientProvider>{children}</ApolloClientProvider>
      </body>
    </html>
  );
}
