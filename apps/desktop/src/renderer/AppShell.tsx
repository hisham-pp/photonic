import React from 'react';
import { Box } from '@mui/material';
import { TitleBar } from './components/TitleBar';
import { Sidebar } from './components/Sidebar';
import { PhotoGrid } from './features/photos/PhotoGrid';

export function AppShell() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw' }}>
      <TitleBar />
      <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden', position: 'relative' }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1, overflow: 'auto', position: 'relative', zIndex: 1 }}>
          <PhotoGrid />
        </Box>
      </Box>
    </Box>
  );
}
