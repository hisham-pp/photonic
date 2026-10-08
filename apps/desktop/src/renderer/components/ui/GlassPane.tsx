import React from 'react';
import { Box, BoxProps, styled } from '@mui/material';

const StyledBox = styled(Box)(({ theme }) => ({
  background: 'rgba(15, 15, 20, 0.4)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.03)',
}));

export const GlassPane: React.FC<BoxProps> = (props) => <StyledBox {...props} />;
