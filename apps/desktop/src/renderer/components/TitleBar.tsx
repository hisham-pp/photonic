import React from 'react';
import { Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MinimizeIcon from '@mui/icons-material/Minimize';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import { Typography } from './ui';

export function TitleBar() {
  return (
    <Box sx={{
      height: '36px',
      WebkitAppRegion: 'drag',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#121212',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      pl: 2,
      zIndex: 1000
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box sx={{ width: 14, height: 14, borderRadius: '4px', backgroundColor: '#0A84FF' }} />
        <Typography variant="body2" sx={{ fontWeight: '600', color: '#E0E0E0' }}>
          Photonic
        </Typography>
      </Box>
      <Box sx={{ WebkitAppRegion: 'no-drag', display: 'flex', height: '100%' }}>
        <Box onClick={() => (window as any).api.windowMinimize()} sx={{ width: 46, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', cursor: 'pointer', transition: 'background-color 0.1s', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)', color: '#fff' } }}>
          <MinimizeIcon fontSize="small" sx={{ fontSize: 18 }} />
        </Box>
        <Box onClick={() => (window as any).api.windowMaximize()} sx={{ width: 46, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', cursor: 'pointer', transition: 'background-color 0.1s', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)', color: '#fff' } }}>
          <CropSquareIcon fontSize="small" sx={{ fontSize: 16 }} />
        </Box>
        <Box onClick={() => (window as any).api.windowClose()} sx={{ width: 46, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', cursor: 'pointer', transition: 'background-color 0.1s', '&:hover': { bgcolor: '#E81123', color: '#fff' } }}>
          <CloseIcon fontSize="small" sx={{ fontSize: 18 }} />
        </Box>
      </Box>
    </Box>
  );
}
