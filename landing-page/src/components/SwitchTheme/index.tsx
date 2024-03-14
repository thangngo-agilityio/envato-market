// libs
import { useContext, useMemo } from 'react';

// Components
import DarkIcon from '@app/components/icons/Dark/index.tsx';
import LightIcon from '@app/components/icons/Light/index.tsx';
import Button from '@app/components/Button/index';
import { ThemeContext } from '@app/context/ThemeContext';

const SwitchTheme = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  // Assigning variable to determine if the theme is dark or light
  const isDarkTheme = theme === 'dark';
  const isLightTheme = theme === 'light';

  // UseMemo is used to prevent unnecessary re-renders
  const icon = useMemo(() => {
    return isLightTheme ? <DarkIcon /> : <LightIcon />;
  }, [theme]);

  // Handle theme change when clicked 
  const handleChange = () => {
    setTheme(isDarkTheme ? 'light' : 'dark');
  };

  return (
      <Button className="!p-0 bg-transparent" onClick={handleChange} aria-label="Switch Theme">
        {icon}
      </Button>
  );
};
export default SwitchTheme;
