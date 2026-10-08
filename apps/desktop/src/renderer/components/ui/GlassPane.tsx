import React from 'react';
import { Box, BoxProps, styled } from '@mui/material';

// Standard clean pane, no excessive blurring/glow
const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#1C1C1E',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '8px',
}));

export const GlassPane: React.FC<BoxProps> = (props) => <StyledBox {...props} />;
