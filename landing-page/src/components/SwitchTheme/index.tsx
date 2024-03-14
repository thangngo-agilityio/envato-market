// libs
import { useContext } from 'react';

// Components
import DarkIcon from '@app/components/icons/Dark/index.tsx';
import LightIcon from '@app/components/icons/Light/index.tsx';
import Button from '../Button';
import { ThemeContext } from '@app/context/ThemeContext';

const SwitchTheme = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleChange = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      <Button onClick={handleChange}>
        {theme === 'light' ? <DarkIcon /> : <LightIcon />}
      </Button>
    </>
  );
};
export default SwitchTheme;
