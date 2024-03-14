import { createContext, useState, type ReactNode, useEffect } from 'react';

interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
}

interface AppProps {
  children: ReactNode;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
} as ThemeContextType);

const ThemeProvider = ({ children }: AppProps) => {
  const currentTheme =
    typeof window !== 'undefined' ? localStorage.getItem('theme') : null;

  const [theme, setTheme] = useState<string>(currentTheme || 'dark');

  const changeCurrentTheme = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    if (theme === 'light') document.body.classList.remove('dark');
    else document.body.classList.add('dark');
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: changeCurrentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
