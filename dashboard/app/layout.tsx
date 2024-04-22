import type { Metadata, Viewport } from 'next';
import './globals.css';

// Providers
import {
  ChakraProvider,
  CheckAuthenticationProvider,
  QueryProvider,
} from '@/ui/providers';

// Fonts
import { fontFamilies } from '@/ui/themes/bases';
import MetadataMemorize from './metadata';

export const metadata: Metadata = {
  title: 'Envato Market - Manage users and transactions on every purchase',
  description:
    'Envato Market will receive all transactions from furniture purchase and show users in the system.',
  icons: {
    icon: '/icons/logo-mini-light.svg',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#5cd95b' },
    { media: '(prefers-color-scheme: dark)', color: '#ffff00' },
  ],
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
      <MetadataMemorize />
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
