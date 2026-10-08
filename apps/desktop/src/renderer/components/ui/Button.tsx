import React from 'react';
import { Button as MuiButton, ButtonProps, styled } from '@mui/material';

const StyledButton = styled(MuiButton)(({ theme, variant }) => ({
  textTransform: 'none',
  fontWeight: 600,
  borderRadius: '10px',
  padding: '8px 20px',
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  fontFamily: '"Outfit", sans-serif',
  ...(variant === 'contained' && {
    background: 'linear-gradient(135deg, #00e5ff 0%, #0076ff 100%)',
    color: '#fff',
    border: '1px solid rgba(255,255,255,0.1)',
    boxShadow: '0 4px 14px 0 rgba(0, 118, 255, 0.3)',
    '&:hover': {
      transform: 'translateY(-1px)',
      boxShadow: '0 6px 20px rgba(0, 118, 255, 0.4)',
    },
    '&:active': {
      transform: 'translateY(1px)',
    }
  }),
  ...(variant === 'outlined' && {
    borderColor: 'rgba(255,255,255,0.15)',
    color: '#fff',
    backdropFilter: 'blur(10px)',
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.05)',
      borderColor: 'rgba(255,255,255,0.3)',
    }
  }),
  ...(variant === 'text' && {
    color: 'rgba(255,255,255,0.7)',
    '&:hover': {
      color: '#fff',
      backgroundColor: 'rgba(255,255,255,0.05)',
    }
  })
}));

export const Button: React.FC<ButtonProps> = (props) => <StyledButton disableElevation {...props} />;
