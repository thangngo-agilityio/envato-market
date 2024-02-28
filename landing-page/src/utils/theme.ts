// Themes
import { type TTheme } from '@app/themes/components';

// Constants
import { DARK_KEY, DARK_PREFIX, LIGHT_KEY, LIGHT_PREFIX } from '@app/constants';

export const getStyles = (objStyle?: TTheme): string => {
  const baseStyle: string = Object.entries(objStyle ?? {})
    .map(([styleKey, styleValue]) => {
      const convertStyle = (prefix: string): string =>
        `${prefix}${Object.values(styleValue).join(` ${prefix}`)}`;

      if (typeof styleValue === 'object') {
        const styleByMode = {
          [LIGHT_KEY]: convertStyle(LIGHT_PREFIX),
          [DARK_KEY]: convertStyle(DARK_PREFIX),
        };

        return styleByMode[styleKey as keyof typeof styleByMode] ?? '';
      }

      return styleValue;
    })
    .join(' ');

  return baseStyle;
};
