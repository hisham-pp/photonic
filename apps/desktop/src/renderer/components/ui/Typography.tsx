import React from 'react';
import { Typography as MuiTypography, TypographyProps, styled } from '@mui/material';

const StyledTypography = styled(MuiTypography)(({ theme }) => ({
}));

export const Typography: React.FC<TypographyProps & { gradient?: boolean }> = ({ gradient, sx, ...props }) => {
  return (
    <StyledTypography 
      {...props} 
      sx={{
        ...(gradient && {
          background: 'linear-gradient(135deg, #fff 0%, #a0c0d0 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }),
        ...sx
      }}
    />
  );
};
