import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : false;
  });

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    if (isDark) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  const theme = {
    isDark,
    toggleTheme,
    colors: {
      // Background gradients
      bgGradient: isDark 
        ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)'
        : 'linear-gradient(135deg, #0891b2 0%, #06b6d4 50%, #22d3ee 100%)',
      
      // Card backgrounds
      cardBg: isDark ? '#1e293b' : 'white',
      cardBgHover: isDark ? '#334155' : '#f7fafc',
      
      // Text colors
      textPrimary: isDark ? '#f1f5f9' : '#1a202c',
      textSecondary: isDark ? '#cbd5e1' : '#718096',
      textMuted: isDark ? '#94a3b8' : '#a0aec0',
      
      // Border colors
      border: isDark ? '#334155' : '#e2e8f0',
      borderHover: isDark ? '#475569' : '#0891b2',
      
      // Primary color
      primary: '#0891b2',
      primaryHover: '#06b6d4',
      
      // Input backgrounds
      inputBg: isDark ? '#0f172a' : 'white',
      inputBorder: isDark ? '#475569' : '#e2e8f0',
      
      // Nav
      navBg: isDark ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.95)',
      
      // Shadows
      shadow: isDark ? '0 4px 6px rgba(0, 0, 0, 0.3)' : '0 4px 6px rgba(0, 0, 0, 0.07)',
      shadowHover: isDark ? '0 8px 16px rgba(0, 0, 0, 0.4)' : '0 8px 16px rgba(0, 0, 0, 0.1)',
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};