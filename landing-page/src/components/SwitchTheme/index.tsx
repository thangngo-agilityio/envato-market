// libs
import {useContext} from 'react';

// Context
import ThemeContext from '@app/context/ThemeContext/ThemContext';

// Components
import DarkIcon from '@app/components/icons/Dark/index.tsx';
import LightIcon from '@app/components/icons/Light/index.tsx';

const SwitchTheme = () => {
  const { currentTheme, changeCurrentTheme } = useContext(ThemeContext);
  return (
    <>
      {
       currentTheme === 'light' ? (<button onClick={() => changeCurrentTheme(currentTheme === 'light' ? 'dark' : 'light')}>
        <LightIcon />
      </button>) :
      (<button onClick={() => changeCurrentTheme(currentTheme === 'light' ? 'dark' : 'light')}>
        <DarkIcon />
      </button>)
      }
     
    </>
  );
};
export default SwitchTheme;