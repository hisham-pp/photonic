import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MinimizeIcon from '@mui/icons-material/Minimize';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import { Typography } from './ui';
export function TitleBar() {
    return (_jsxs(Box, { sx: {
            height: '36px',
            WebkitAppRegion: 'drag',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#121212',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            pl: 2,
            zIndex: 1000
        }, children: [_jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1 }, children: [_jsx(Box, { sx: { width: 14, height: 14, borderRadius: '4px', backgroundColor: '#0A84FF' } }), _jsx(Typography, { variant: "body2", sx: { fontWeight: '600', color: '#E0E0E0' }, children: "Photonic" })] }), _jsxs(Box, { sx: { WebkitAppRegion: 'no-drag', display: 'flex', height: '100%' }, children: [_jsx(Box, { onClick: () => window.api.windowMinimize(), sx: { width: 46, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', cursor: 'pointer', transition: 'background-color 0.1s', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)', color: '#fff' } }, children: _jsx(MinimizeIcon, { fontSize: "small", sx: { fontSize: 18 } }) }), _jsx(Box, { onClick: () => window.api.windowMaximize(), sx: { width: 46, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', cursor: 'pointer', transition: 'background-color 0.1s', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)', color: '#fff' } }, children: _jsx(CropSquareIcon, { fontSize: "small", sx: { fontSize: 16 } }) }), _jsx(Box, { onClick: () => window.api.windowClose(), sx: { width: 46, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', cursor: 'pointer', transition: 'background-color 0.1s', '&:hover': { bgcolor: '#E81123', color: '#fff' } }, children: _jsx(CloseIcon, { fontSize: "small", sx: { fontSize: 18 } }) })] })] }));
}
