import React, { ReactNode } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { TaskProvider } from './context/TaskContext';

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <TaskProvider>{children}</TaskProvider>
    </ThemeProvider>
  );
};
