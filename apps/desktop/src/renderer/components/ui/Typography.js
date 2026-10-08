import { jsx as _jsx } from "react/jsx-runtime";
import { Typography as MuiTypography } from '@mui/material';
export const Typography = ({ gradient, ...props }) => {
    return (_jsx(MuiTypography, { ...props, sx: {
            color: props.color || (gradient ? '#FAFAFA' : undefined), // Removed glow/gradient
            ...props.sx
        } }));
};
