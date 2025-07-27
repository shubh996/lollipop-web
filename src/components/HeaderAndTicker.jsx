import React from 'react';
import { ThemeProvider, useTheme } from "../components/theme-provider";
import { MoonIcon, SunIcon, Smartphone } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import TickerTape from "../components/TickerTape";

function ThemeToggle({ onMobileClick }) {
  const { theme, setTheme } = useTheme();

  return (
    <div style={{ 
      position: 'absolute', 
      top: 10, 
      right: 10, 
      zIndex: 100,
      display: 'flex',
      gap: '8px'
    }}>
      <Toggle
        pressed={theme === 'dark'}
        onPressedChange={(pressed) => setTheme(pressed ? 'dark' : 'light')}
        style={{ 
          fontFamily: 'Uber Move',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          width: '35px',
          height: '35px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {theme === 'dark' ? <MoonIcon size={16} /> : <SunIcon size={16} />}
      </Toggle>
      <Toggle
        onClick={onMobileClick}
        style={{
          fontFamily: 'Uber Move',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          width: '35px',
          height: '35px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer'
        }}
      >
        <Smartphone size={16} />
      </Toggle>
    </div>
  );
}

function HeaderAndTicker({ onMobileClick }) {
  return (
    <ThemeProvider>
      <ThemeToggle onMobileClick={onMobileClick} />
      <TickerTape />
    </ThemeProvider>
  );
}

export default HeaderAndTicker;
