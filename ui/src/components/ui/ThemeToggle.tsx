import { useTheme } from '@/hooks/use-theme-provider';
import { Button } from '@/components/ui/Button';
import { MoonIcon, SunIcon, PersonIcon } from '@radix-ui/react-icons';
import TooltipDecorator from '@/components/utilities/TooltipDecorator';
import React from 'react';

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  const switchTheme = () => {
    setTheme(theme === 'system' ? 'dark' : theme === 'dark' ? 'light' : 'system');
  };

  return (
    <TooltipDecorator tooltipText={`Current theme is ${theme}`} placement="right">
      <Button variant="secondary" onClick={switchTheme}>
        {theme === 'dark' && <MoonIcon />}
        {theme === 'light' && <SunIcon />}
        {theme === 'system' && <PersonIcon />}
      </Button>
    </TooltipDecorator>
  );
}
