import type { Metadata } from 'next';
import './globals.css';

// Providers
import {
  ChakraProvider,
  CheckAuthenticationProvider,
  QueryProvider,
} from '@/ui/providers';

// Fonts
import { fontFamilies } from '@/ui/themes/bases';

export const metadata: Metadata = {
  title: 'Envato Dashboard ',
  description: 'Envato Dashboard',
  icons: {
    icon: '/icons/logo-mini-light.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fontFamilies.urbanist.variable} ${fontFamilies.poppins.variable}`}
    >
      <head>
        <meta
          name="description"
          content="Envato Market will receive all transactions from furniture purchase and show users in the system."
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="628" />
        <meta
          property="og:title"
          content="Envato Market will receive all transactions from furniture purchase and show users in the system"
        />
        <meta
          property="og:url"
          content="https://envato-market-one.vercel.app/"
        />
        <meta name="theme-color" content="rgb(34, 197, 94)" />
        <meta
          property="og:image"
          content=" https://envato-market-one.vercel.app/icons/signup.svgg"
        />
      </head>
      <body>
        <QueryProvider>
          <ChakraProvider>
            <CheckAuthenticationProvider>
              {children}
            </CheckAuthenticationProvider>
          </ChakraProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
