// Libs
import React, { useContext } from 'react';
// Components
import DarkIcon from '@app/components/icons/Dark/index.tsx';
import LightIcon from '@app/components/icons/Light/index.tsx';

// Themes 
import { ThemeContext } from '@app/components/SwitchTheme/themContext';

const SwitchTheme = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <div>
      {
        theme === 'light' ? (<button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}><DarkIcon /></button>) : (<button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}><LightIcon /></button>)
      }
    </div>
  );
};
export default SwitchTheme;