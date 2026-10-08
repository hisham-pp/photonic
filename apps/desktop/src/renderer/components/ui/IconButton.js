import { jsx as _jsx } from "react/jsx-runtime";
import { IconButton as MuiIconButton, styled } from '@mui/material';
const StyledIconButton = styled(MuiIconButton)(({ theme }) => ({
    transition: 'all 0.2s ease',
    color: 'rgba(255,255,255,0.6)',
    '&:hover': {
        color: '#00e5ff',
        backgroundColor: 'rgba(0, 229, 255, 0.08)',
        transform: 'scale(1.05)',
    },
    '&:active': {
        transform: 'scale(0.95)',
    }
}));
export const IconButton = (props) => _jsx(StyledIconButton, { ...props });
