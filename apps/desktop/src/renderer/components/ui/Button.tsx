import React from 'react';
import { Button as MuiButton, ButtonProps, styled } from '@mui/material';

const StyledButton = styled(MuiButton)(({ theme, variant }) => ({
  textTransform: 'none',
  fontWeight: 500,
  borderRadius: '6px',
  padding: '6px 16px',
  fontFamily: '"Inter", sans-serif',
  boxShadow: 'none',
  transition: 'background-color 0.15s ease',
  ...(variant === 'contained' && {
    backgroundColor: '#0A84FF',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#0070E0',
      boxShadow: 'none',
    },
    '&:active': {
      backgroundColor: '#0060C0',
    }
  }),
  ...(variant === 'outlined' && {
    borderColor: 'rgba(255,255,255,0.2)',
    color: '#E0E0E0',
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.05)',
      borderColor: 'rgba(255,255,255,0.3)',
    }
  }),
}));

export const Button: React.FC<ButtonProps> = (props) => <StyledButton disableRipple {...props} />;
