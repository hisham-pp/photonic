import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box } from '@mui/material';
import { TitleBar } from './components/TitleBar';
import { Sidebar } from './components/Sidebar';
import { Inspector } from './components/Inspector';
import { PhotoGrid } from './features/photos/PhotoGrid';
export function AppShell() {
    return (_jsxs(Box, { sx: {
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            width: '100vw',
            backgroundColor: '#0f1013',
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)',
            backgroundSize: '22px 22px',
            overflow: 'hidden'
        }, children: [_jsx(TitleBar, {}), _jsxs(Box, { sx: {
                    display: 'flex',
                    flexGrow: 1,
                    overflow: 'hidden',
                    position: 'relative',
                    p: 2,
                    gap: 2
                }, children: [_jsx(Sidebar, {}), _jsx(Box, { sx: { flexGrow: 1, overflow: 'hidden', position: 'relative', zIndex: 1, display: 'flex' }, children: _jsx(PhotoGrid, {}) }), _jsx(Inspector, {})] })] }));
}
