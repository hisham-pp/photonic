import React from 'react';
import { Box } from '@mui/material';
import { TitleBar } from './components/TitleBar';
import { Sidebar } from './components/Sidebar';
import { Inspector } from './components/Inspector';
import { PhotoGrid } from './features/photos/PhotoGrid';

export function AppShell() {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh', 
      width: '100vw',
      backgroundColor: '#0f1013',
      backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)',
      backgroundSize: '22px 22px',
      overflow: 'hidden'
    }}>
      <TitleBar />
      <Box sx={{ 
        display: 'flex', 
        flexGrow: 1, 
        overflow: 'hidden', 
        position: 'relative',
        p: 2,
        gap: 2
      }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1, overflow: 'hidden', position: 'relative', zIndex: 1, display: 'flex' }}>
          <PhotoGrid />
        </Box>
        <Inspector />
      </Box>
    </Box>
  );
}
