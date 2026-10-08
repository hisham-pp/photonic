import React from 'react';
import { Typography as MuiTypography, TypographyProps } from '@mui/material';

export const Typography: React.FC<TypographyProps & { gradient?: boolean }> = ({ gradient, ...props }) => {
  return (
    <MuiTypography 
      {...props} 
      sx={{
        color: props.color || (gradient ? '#FAFAFA' : undefined), // Removed glow/gradient
        ...props.sx
      }}
    />
  );
};
