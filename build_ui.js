const fs = require('fs');
const path = require('path');

const files = {
  "apps/desktop/src/main/index.ts": `import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import { setupOAuthHandlers } from './oauth';

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    frame: false,
    titleBarStyle: 'hidden',
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      nodeIntegration: false,
    }
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, '../../dist/index.html'));
  }

  ipcMain.on('window-minimize', () => win.minimize());
  ipcMain.on('window-maximize', () => {
    if (win.isMaximized()) win.unmaximize();
    else win.maximize();
  });
  ipcMain.on('window-close', () => win.close());
}

app.whenReady().then(() => {
  setupOAuthHandlers();
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
`,
  "apps/desktop/src/preload/index.ts": `import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  windowMinimize: () => ipcRenderer.send('window-minimize'),
  windowMaximize: () => ipcRenderer.send('window-maximize'),
  windowClose: () => ipcRenderer.send('window-close'),
  login: () => ipcRenderer.invoke('auth:login')
});
`,
  "apps/desktop/src/renderer/index.tsx": `import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme';
import { AppShell } from './AppShell';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppShell />
    </ThemeProvider>
  );
}

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
`,
  "apps/desktop/src/renderer/theme.ts": `import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    background: {
      default: '#0a0a0a',
      paper: '#121212',
    },
    divider: 'rgba(255,255,255,0.05)'
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: \`
        * {
          box-sizing: border-box;
        }
        body {
          margin: 0;
          padding: 0;
          overflow: hidden;
        }
      \`
    }
  }
});
`,
  "apps/desktop/src/renderer/components/TitleBar.tsx": `import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MinimizeIcon from '@mui/icons-material/Minimize';
import CropSquareIcon from '@mui/icons-material/CropSquare';

export function TitleBar() {
  return (
    <Box sx={{
      height: '32px',
      WebkitAppRegion: 'drag',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      bgcolor: 'background.paper',
      borderBottom: '1px solid',
      borderColor: 'divider',
      pl: 2
    }}>
      <Typography variant="caption" sx={{ fontWeight: '600', color: 'text.secondary', letterSpacing: '0.5px' }}>
        PHOTONIC
      </Typography>
      <Box sx={{ WebkitAppRegion: 'no-drag', display: 'flex' }}>
        <IconButton size="small" onClick={() => (window as any).api.windowMinimize()} sx={{ borderRadius: 0, width: 46, height: 32, color: 'text.secondary' }}>
          <MinimizeIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" onClick={() => (window as any).api.windowMaximize()} sx={{ borderRadius: 0, width: 46, height: 32, color: 'text.secondary' }}>
          <CropSquareIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" onClick={() => (window as any).api.windowClose()} sx={{ borderRadius: 0, width: 46, height: 32, color: 'text.secondary', '&:hover': { bgcolor: '#d32f2f', color: 'white' } }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
}
`,
  "apps/desktop/src/renderer/components/Sidebar.tsx": `import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import PhotoIcon from '@mui/icons-material/Photo';
import PhotoAlbumIcon from '@mui/icons-material/PhotoAlbum';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SettingsIcon from '@mui/icons-material/Settings';

const menuItems = [
  { text: 'Photos', icon: <PhotoIcon />, active: true },
  { text: 'Albums', icon: <PhotoAlbumIcon />, active: false },
  { text: 'Favorites', icon: <FavoriteIcon />, active: false },
  { text: 'Downloads', icon: <CloudDownloadIcon />, active: false },
  { text: 'Uploads', icon: <CloudUploadIcon />, active: false },
];

export function Sidebar() {
  return (
    <Box sx={{
      width: 240,
      bgcolor: 'background.paper',
      borderRight: '1px solid',
      borderColor: 'divider',
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}>
      <Box sx={{ flexGrow: 1, pt: 2 }}>
        <Typography variant="overline" sx={{ px: 3, color: 'text.secondary', fontWeight: 'bold' }}>
          Library
        </Typography>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton sx={{ 
                py: 0.5, 
                px: 3,
                bgcolor: item.active ? 'rgba(144, 202, 249, 0.12)' : 'transparent',
                borderRight: item.active ? '3px solid' : '3px solid transparent',
                borderColor: 'primary.main',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' }
              }}>
                <ListItemIcon sx={{ minWidth: 40, color: item.active ? 'primary.main' : 'text.secondary' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{ 
                    variant: 'body2', 
                    fontWeight: item.active ? 600 : 400,
                    color: item.active ? 'primary.main' : 'text.primary'
                  }} 
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{ pb: 2 }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton sx={{ px: 3 }}>
              <ListItemIcon sx={{ minWidth: 40, color: 'text.secondary' }}><SettingsIcon /></ListItemIcon>
              <ListItemText primary="Settings" primaryTypographyProps={{ variant: 'body2' }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
}
`,
  "apps/desktop/src/renderer/AppShell.tsx": `import React from 'react';
import { Box } from '@mui/material';
import { TitleBar } from './components/TitleBar';
import { Sidebar } from './components/Sidebar';
import { PhotoGrid } from './features/photos/PhotoGrid';

export function AppShell() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: 'background.default' }}>
      <TitleBar />
      <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1, overflow: 'auto', position: 'relative' }}>
          <PhotoGrid />
        </Box>
      </Box>
    </Box>
  );
}
`,
  "apps/desktop/src/renderer/features/photos/PhotoGrid.tsx": `import React, { useState } from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import CloudSyncIcon from '@mui/icons-material/CloudSync';

export function PhotoGrid() {
  const [loading, setLoading] = useState(false);
  const [connected, setConnected] = useState(false);

  const handleConnect = async () => {
    setLoading(true);
    try {
      const res = await (window as any).api.login();
      if (res?.success) {
        setConnected(true);
      } else {
        console.error('Login failed', res?.error);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  if (!connected) {
    return (
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <CloudSyncIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h5" gutterBottom>
          Connect to Google Photos
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 400, textAlign: 'center' }}>
          Authenticate with your Google account to start syncing your photos locally.
        </Typography>
        <Button 
          variant="contained" 
          size="large" 
          onClick={handleConnect}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
        >
          {loading ? 'Connecting...' : 'Connect Account'}
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Photos
      </Typography>
      <Typography color="text.secondary">
        Your synced photos will appear here.
      </Typography>
    </Box>
  );
}
`
};

for (const [p, content] of Object.entries(files)) {
  const fullPath = path.join(__dirname, p);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content, 'utf8');
}
console.log('UI Scaffolding complete.');
