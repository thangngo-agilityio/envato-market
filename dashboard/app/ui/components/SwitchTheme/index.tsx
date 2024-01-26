'use client';

import { ReactElement, memo } from 'react';
import { ColorMode, useColorMode } from '@chakra-ui/react';

// Components
import { IconButton } from '@/ui/components';

// Icons
import { DarkTheme, LightTheme } from '@/ui/components/Icons';

// Themes
import { colors } from '@/ui/themes/bases';

const SwitchThemeComponent = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const icons: Record<ColorMode, ReactElement> = {
    light: <LightTheme color={colors.text.primary.default} />,
    dark: <DarkTheme color={colors.common.white} />,
  };

  return (
    <IconButton ariaLabel="switch-theme" onClick={toggleColorMode}>
      {icons[colorMode]}
    </IconButton>
  );
};

const SwitchTheme = memo(SwitchThemeComponent);

export default SwitchTheme;
