import { useState, useEffect, type ReactNode } from 'react';
import ThemeContext from './ThemContext';

type Props = {
  children: ReactNode
}

const ThemeContextWrapper = ({ children }: Props) => {
  const persistedTheme: string | null = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
  const [theme, setTheme] = useState(persistedTheme || 'light');

  const changeCurrentTheme = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    if (theme === 'light') document.body.classList.remove('dark');
    else document.body.classList.add('dark');
  }, [theme]);

  return <ThemeContext.Provider value={{ currentTheme: theme, changeCurrentTheme }}>{children}</ThemeContext.Provider>;
};

export default ThemeContextWrapper;