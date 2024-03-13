// libs
import {useCallback, useContext, useState} from 'react';

// Context
import ThemeContext from '@app/context/ThemeContext/ThemContext';

// Components
import DarkIcon from '@app/components/icons/Dark/index.tsx';
import LightIcon from '@app/components/icons/Light/index.tsx';
import Button from '../Button';

const SwitchTheme = () => {
  const [ currentTheme, changeCurrentTheme ] = useState('light');

  console.log('currentTheme', currentTheme);
  const handleChange = useCallback(() => {
  console.log('currentTheme', currentTheme);

    changeCurrentTheme(currentTheme === 'light' ? 'dark' : 'light');
  }, [currentTheme]);
  return (
    <>
      <Button onClick={handleChange} style={{ background: 'red'}}>
        {currentTheme === 'light' ? <DarkIcon /> : <LightIcon />}
      </Button>
    </>
  );
};
export default SwitchTheme;