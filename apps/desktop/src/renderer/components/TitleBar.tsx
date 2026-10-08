import React from 'react';
import { Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MinimizeIcon from '@mui/icons-material/Minimize';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import { Typography } from './ui';

export function TitleBar() {
  return (
    <Box sx={{
      height: '38px',
      WebkitAppRegion: 'drag',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: 'linear-gradient(180deg, rgba(15,15,20,0.8) 0%, rgba(15,15,20,0.4) 100%)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255,255,255,0.02)',
      pl: 2,
      zIndex: 1000
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box sx={{ width: 12, height: 12, borderRadius: '50%', background: 'linear-gradient(135deg, #00e5ff, #0076ff)', boxShadow: '0 0 10px rgba(0, 229, 255, 0.5)' }} />
        <Typography variant="caption" sx={{ fontWeight: '700', letterSpacing: '1.5px', color: 'rgba(255,255,255,0.7)', fontFamily: '"Outfit", sans-serif' }}>
          PHOTONIC
        </Typography>
      </Box>
      <Box sx={{ WebkitAppRegion: 'no-drag', display: 'flex', height: '100%' }}>
        <Box onClick={() => (window as any).api.windowMinimize()} sx={{ width: 46, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', transition: 'all 0.1s', '&:hover': { bgcolor: 'rgba(255,255,255,0.05)', color: '#fff' } }}>
          <MinimizeIcon fontSize="small" sx={{ fontSize: 16 }} />
        </Box>
        <Box onClick={() => (window as any).api.windowMaximize()} sx={{ width: 46, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', transition: 'all 0.1s', '&:hover': { bgcolor: 'rgba(255,255,255,0.05)', color: '#fff' } }}>
          <CropSquareIcon fontSize="small" sx={{ fontSize: 14 }} />
        </Box>
        <Box onClick={() => (window as any).api.windowClose()} sx={{ width: 46, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', transition: 'all 0.1s', '&:hover': { bgcolor: '#e81123', color: '#fff' } }}>
          <CloseIcon fontSize="small" sx={{ fontSize: 16 }} />
        </Box>
      </Box>
    </Box>
  );
}
