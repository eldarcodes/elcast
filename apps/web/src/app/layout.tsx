import { GoogleAnalytics } from '@next/third-parties/google';
import 'leaflet/dist/leaflet.css';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { Geist, Geist_Mono } from 'next/font/google';

import {
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
} from '@/libs/constants/seo.constants';
import { APP_URL } from '@/libs/constants/url.constants';

import { ApolloClientProvider } from '@/providers/apollo-client-provider';
import { ThemeProvider } from '@/providers/theme-provider';
import { ToastProvider } from '@/providers/toast-provider';

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
  applicationName: SITE_NAME,
  metadataBase: new URL(APP_URL),
  title: {
    absolute: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  authors: {
    name: 'Eldar Mirzabekov',
    url: 'https://eldarcodes.com',
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  generator: 'Next.js',
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: new URL(APP_URL),
    siteName: SITE_NAME,
    locale: 'en_US',
    type: 'website',
    emails: ['info@eldarcodes.com'],
    images: [
      {
        url: '/images/logo.png',
        width: 200,
        height: 200,
        alt: SITE_NAME,
      },
    ],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/touch-icons/256x256.png',
    other: {
      rel: 'touch-icons',
      url: '/touch-icons/256x256.png',
      sizes: '256x256',
      type: 'image/png',
    },
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
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    card: 'summary',
    images: [
      {
        url: '/images/logo.png',
        width: 200,
        height: 200,
        alt: SITE_NAME,
      },
    ],
  },

  // @TODO: Add verification keys
  // verification: {
  //   google: "",
  //   yandex: "",
  // },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ApolloClientProvider>
          <NextIntlClientProvider messages={messages}>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              disableTransitionOnChange
            >
              <ToastProvider />

              {children}
            </ThemeProvider>
          </NextIntlClientProvider>
        </ApolloClientProvider>
      </body>

      <GoogleAnalytics gaId="G-L48J56DCW8" />
    </html>
  );
}
