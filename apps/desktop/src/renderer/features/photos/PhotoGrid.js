import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
export function PhotoGrid() {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentDir, setCurrentDir] = useState(null);
    const selectDirectory = async () => {
        try {
            // @ts-ignore
            const dir = await window.api.selectDirectory();
            if (dir) {
                setCurrentDir(dir);
                scanDir(dir);
            }
        }
        catch (err) {
            console.error(err);
        }
    };
    const scanDir = async (dir) => {
        setLoading(true);
        try {
            // @ts-ignore
            const files = await window.api.scanDirectory(dir);
            setPhotos(files);
        }
        catch (err) {
            console.error(err);
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs(Box, { sx: {
            flexGrow: 1,
            backgroundColor: 'rgba(21, 23, 29, 0.95)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '16px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
        }, children: [_jsxs(Box, { sx: { p: 2, borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }, children: [_jsxs(Box, { children: [_jsx(Typography, { sx: { fontSize: 13, fontWeight: 600, color: '#fff' }, children: "Timeline View" }), _jsxs(Typography, { sx: { fontSize: 11, color: '#7e8294' }, children: [photos.length, " photos found"] })] }), _jsx(Button, { variant: "contained", onClick: selectDirectory, startIcon: _jsx(FolderOpenIcon, {}), sx: {
                            bgcolor: 'rgba(99, 102, 241, 0.2)',
                            color: '#c0c1ff',
                            border: '1px solid rgba(99, 102, 241, 0.3)',
                            boxShadow: 'none',
                            textTransform: 'none',
                            fontSize: 12,
                            borderRadius: '8px',
                            '&:hover': { bgcolor: 'rgba(99, 102, 241, 0.3)' }
                        }, children: "Select Folder" })] }), _jsx(Box, { sx: { flexGrow: 1, overflowY: 'auto', p: 3 }, children: loading ? (_jsx(Typography, { sx: { color: '#7e8294' }, children: "Scanning local files..." })) : photos.length === 0 ? (_jsx(Box, { sx: { display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }, children: _jsx(Typography, { sx: { color: '#7e8294', mb: 2 }, children: "No photos selected." }) })) : (_jsx(Box, { sx: {
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                        gap: 2
                    }, children: photos.map((item, idx) => (_jsxs(Box, { sx: {
                            aspectRatio: '16/10',
                            bgcolor: '#181a20',
                            borderRadius: '12px',
                            border: '1px solid rgba(255,255,255,0.1)',
                            overflow: 'hidden',
                            position: 'relative'
                        }, children: [_jsx(Box, { sx: { width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#000' }, children: _jsx(Typography, { sx: { color: '#444', fontSize: 10 }, children: "IMAGE PREVIEW" }) }), _jsxs(Box, { sx: { position: 'absolute', bottom: 0, left: 0, right: 0, p: 1, bgcolor: 'rgba(25, 27, 34, 0.9)', borderTop: '1px solid rgba(255,255,255,0.05)' }, children: [_jsx(Typography, { noWrap: true, sx: { fontSize: 11, color: '#fff' }, children: item.filename }), _jsxs(Typography, { sx: { fontSize: 10, color: '#7e8294' }, children: [(item.size / 1024 / 1024).toFixed(1), " MB"] })] })] }, idx))) })) })] }));
}
