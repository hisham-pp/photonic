import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Typography, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
export function Inspector() {
    return (_jsxs(Box, { sx: {
            width: 320,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            backgroundColor: 'rgba(24, 26, 32, 0.95)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '16px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            p: 2,
            flexShrink: 0
        }, children: [_jsxs(Box, { sx: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 2, borderBottom: '1px solid rgba(255,255,255,0.1)' }, children: [_jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1 }, children: [_jsx(InfoIcon, { sx: { color: '#c0c1ff', fontSize: 18 } }), _jsx(Typography, { sx: { fontSize: 13, fontWeight: 600, color: '#fff' }, children: "Inspector" })] }), _jsx(IconButton, { size: "small", sx: { color: '#7e8294' }, children: _jsx(CloseIcon, { sx: { fontSize: 16 } }) })] }), _jsx(Box, { sx: { flexGrow: 1, overflowY: 'auto', pt: 2 }, children: _jsxs(Box, { sx: { p: 2, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }, children: [_jsx(Typography, { sx: { fontSize: 12, fontWeight: 600, color: '#fff', mb: 0.5 }, children: "No photo selected" }), _jsx(Typography, { sx: { fontSize: 11, color: '#7e8294' }, children: "Select a photo from the timeline to view EXIF data, location, and histograms." })] }) })] }));
}
