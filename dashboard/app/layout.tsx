import type { Metadata, Viewport } from 'next';
import { cookies } from 'next/headers';
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

// Utils
import { getTheme } from '@/lib/utils/updateColorScheme';

// Themes
import { colors } from '@/ui/themes/bases';

// Constants
import { THEMES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Envato Market - Manage users and transactions on every purchase',
  description:
    'Envato Market will receive all transactions from furniture purchase and show users in the system.',
  icons: {
    icon: '/icons/logo-mini-light.svg',
  },
};

const cookieStore = cookies();
const colorMode = cookieStore
  .getAll()
  .find((cookie) => cookie.name === 'colormode');

export const viewport: Viewport = {
  themeColor:
    colorMode && colorMode.value === THEMES.DARK
      ? colors['background']['body']['primary']['_dark']
      : colors['primary']['200'],
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
        <script dangerouslySetInnerHTML={{ __html: getTheme }}></script>
        <MetadataMemorize />
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
