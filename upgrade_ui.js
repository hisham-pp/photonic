const fs = require('fs');
const path = require('path');

const files = {
  "apps/desktop/src/renderer/theme.ts": `import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00e5ff',
    },
    secondary: {
      main: '#b0bec5',
    },
    background: {
      default: '#050507',
      paper: 'rgba(20, 20, 25, 0.6)',
    },
    divider: 'rgba(255, 255, 255, 0.08)'
  },
  typography: {
    fontFamily: '"Inter", "Outfit", "Roboto", sans-serif',
    h4: { fontWeight: 700, letterSpacing: '-0.5px' },
    h5: { fontWeight: 600, letterSpacing: '-0.3px' },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: \`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@400;500;600;700&display=swap');
        * {
          box-sizing: border-box;
        }
        body {
          margin: 0;
          padding: 0;
          overflow: hidden;
          background: radial-gradient(circle at top right, #131320 0%, #050507 100%);
          color: #ffffff;
        }
        *::-webkit-scrollbar { width: 8px; height: 8px; }
        *::-webkit-scrollbar-track { background: transparent; }
        *::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
        *::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
      \`
    }
  }
});
`,
  "apps/desktop/src/renderer/components/ui/Button.tsx": `import React from 'react';
import { Button as MuiButton, ButtonProps, styled } from '@mui/material';

const StyledButton = styled(MuiButton)(({ theme, variant }) => ({
  textTransform: 'none',
  fontWeight: 600,
  borderRadius: '10px',
  padding: '8px 20px',
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  fontFamily: '"Outfit", sans-serif',
  ...(variant === 'contained' && {
    background: 'linear-gradient(135deg, #00e5ff 0%, #0076ff 100%)',
    color: '#fff',
    border: '1px solid rgba(255,255,255,0.1)',
    boxShadow: '0 4px 14px 0 rgba(0, 118, 255, 0.3)',
    '&:hover': {
      transform: 'translateY(-1px)',
      boxShadow: '0 6px 20px rgba(0, 118, 255, 0.4)',
    },
    '&:active': {
      transform: 'translateY(1px)',
    }
  }),
  ...(variant === 'outlined' && {
    borderColor: 'rgba(255,255,255,0.15)',
    color: '#fff',
    backdropFilter: 'blur(10px)',
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.05)',
      borderColor: 'rgba(255,255,255,0.3)',
    }
  }),
  ...(variant === 'text' && {
    color: 'rgba(255,255,255,0.7)',
    '&:hover': {
      color: '#fff',
      backgroundColor: 'rgba(255,255,255,0.05)',
    }
  })
}));

export const Button: React.FC<ButtonProps> = (props) => <StyledButton disableElevation {...props} />;
`,
  "apps/desktop/src/renderer/components/ui/IconButton.tsx": `import React from 'react';
import { IconButton as MuiIconButton, IconButtonProps, styled } from '@mui/material';

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

export const IconButton: React.FC<IconButtonProps> = (props) => <StyledIconButton {...props} />;
`,
  "apps/desktop/src/renderer/components/ui/Typography.tsx": `import React from 'react';
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
`,
  "apps/desktop/src/renderer/components/ui/GlassPane.tsx": `import React from 'react';
import { Box, BoxProps, styled } from '@mui/material';

const StyledBox = styled(Box)(({ theme }) => ({
  background: 'rgba(15, 15, 20, 0.4)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.03)',
}));

export const GlassPane: React.FC<BoxProps> = (props) => <StyledBox {...props} />;
`,
  "apps/desktop/src/renderer/components/ui/index.ts": `export * from './Button';
export * from './IconButton';
export * from './Typography';
export * from './GlassPane';
`,
  "apps/desktop/src/renderer/components/TitleBar.tsx": `import React from 'react';
import { Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MinimizeIcon from '@mui/icons-material/Minimize';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import { Typography } from './ui';

export function TitleBar() {
  return (
    <Box sx={{
      height: '38px',
      WebkitAppRegion: 'drag',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: 'linear-gradient(180deg, rgba(15,15,20,0.8) 0%, rgba(15,15,20,0.4) 100%)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255,255,255,0.02)',
      pl: 2,
      zIndex: 1000
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box sx={{ width: 12, height: 12, borderRadius: '50%', background: 'linear-gradient(135deg, #00e5ff, #0076ff)', boxShadow: '0 0 10px rgba(0, 229, 255, 0.5)' }} />
        <Typography variant="caption" sx={{ fontWeight: '700', letterSpacing: '1.5px', color: 'rgba(255,255,255,0.7)', fontFamily: '"Outfit", sans-serif' }}>
          PHOTONIC
        </Typography>
      </Box>
      <Box sx={{ WebkitAppRegion: 'no-drag', display: 'flex', height: '100%' }}>
        <Box onClick={() => (window as any).api.windowMinimize()} sx={{ width: 46, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', transition: 'all 0.1s', '&:hover': { bgcolor: 'rgba(255,255,255,0.05)', color: '#fff' } }}>
          <MinimizeIcon fontSize="small" sx={{ fontSize: 16 }} />
        </Box>
        <Box onClick={() => (window as any).api.windowMaximize()} sx={{ width: 46, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', transition: 'all 0.1s', '&:hover': { bgcolor: 'rgba(255,255,255,0.05)', color: '#fff' } }}>
          <CropSquareIcon fontSize="small" sx={{ fontSize: 14 }} />
        </Box>
        <Box onClick={() => (window as any).api.windowClose()} sx={{ width: 46, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', transition: 'all 0.1s', '&:hover': { bgcolor: '#e81123', color: '#fff' } }}>
          <CloseIcon fontSize="small" sx={{ fontSize: 16 }} />
        </Box>
      </Box>
    </Box>
  );
}
`,
  "apps/desktop/src/renderer/components/Sidebar.tsx": `import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import PhotoIcon from '@mui/icons-material/Photo';
import PhotoAlbumIcon from '@mui/icons-material/PhotoAlbum';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SettingsIcon from '@mui/icons-material/Settings';
import { Typography, GlassPane } from './ui';

const menuItems = [
  { text: 'Photos', icon: <PhotoIcon />, active: true },
  { text: 'Albums', icon: <PhotoAlbumIcon />, active: false },
  { text: 'Favorites', icon: <FavoriteIcon />, active: false },
  { text: 'Downloads', icon: <CloudDownloadIcon />, active: false },
  { text: 'Uploads', icon: <CloudUploadIcon />, active: false },
];

export function Sidebar() {
  return (
    <GlassPane sx={{
      width: 260,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      borderRight: '1px solid rgba(255,255,255,0.03)',
      boxShadow: '10px 0 30px rgba(0,0,0,0.2)'
    }}>
      <Box sx={{ flexGrow: 1, pt: 4, px: 2 }}>
        <Typography variant="overline" sx={{ px: 2, color: 'rgba(255,255,255,0.4)', fontWeight: '700', letterSpacing: '1px', fontFamily: '"Outfit", sans-serif' }}>
          LIBRARY
        </Typography>
        <List sx={{ mt: 1 }}>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton sx={{ 
                py: 1, 
                px: 2,
                borderRadius: '8px',
                transition: 'all 0.2s',
                bgcolor: item.active ? 'rgba(0, 229, 255, 0.1)' : 'transparent',
                '&:hover': { 
                  bgcolor: item.active ? 'rgba(0, 229, 255, 0.15)' : 'rgba(255,255,255,0.03)',
                  transform: 'translateX(2px)'
                }
              }}>
                <ListItemIcon sx={{ minWidth: 36, color: item.active ? '#00e5ff' : 'rgba(255,255,255,0.5)' }}>
                  {React.cloneElement(item.icon, { fontSize: 'small' })}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{ 
                    variant: 'body2', 
                    fontWeight: item.active ? 600 : 500,
                    color: item.active ? '#fff' : 'rgba(255,255,255,0.7)',
                    fontFamily: '"Inter", sans-serif'
                  }} 
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{ pb: 3, px: 2 }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton sx={{ px: 2, borderRadius: '8px', '&:hover': { bgcolor: 'rgba(255,255,255,0.03)' } }}>
              <ListItemIcon sx={{ minWidth: 36, color: 'rgba(255,255,255,0.5)' }}><SettingsIcon fontSize="small" /></ListItemIcon>
              <ListItemText primary="Settings" primaryTypographyProps={{ variant: 'body2', color: 'rgba(255,255,255,0.7)', fontWeight: 500 }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </GlassPane>
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
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw' }}>
      <TitleBar />
      <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden', position: 'relative' }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1, overflow: 'auto', position: 'relative', zIndex: 1 }}>
          <PhotoGrid />
        </Box>
      </Box>
    </Box>
  );
}
`,
  "apps/desktop/src/renderer/features/photos/PhotoGrid.tsx": `import React, { useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import { Button, Typography } from '../../components/ui';

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
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 4 }}>
        <Box sx={{ 
          width: 100, height: 100, borderRadius: '50%', 
          background: 'radial-gradient(circle, rgba(0,229,255,0.15) 0%, rgba(0,0,0,0) 70%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3
        }}>
          <CloudSyncIcon sx={{ fontSize: 48, color: '#00e5ff', filter: 'drop-shadow(0 0 8px rgba(0,229,255,0.5))' }} />
        </Box>
        <Typography variant="h4" gradient gutterBottom align="center">
          Connect to Google Photos
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.5)', mb: 5, maxWidth: 420, textAlign: 'center', lineHeight: 1.6 }}>
          Securely authenticate with your Google account to build a lightning-fast local index of your entire photo library.
        </Typography>
        <Button 
          variant="contained" 
          size="large" 
          onClick={handleConnect}
          disabled={loading}
          sx={{ py: 1.5, px: 4, fontSize: '1.05rem' }}
          startIcon={loading ? <CircularProgress size={20} sx={{ color: '#fff' }} /> : null}
        >
          {loading ? 'Authenticating...' : 'Connect Account'}
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 5 }}>
      <Typography variant="h3" gradient gutterBottom sx={{ fontFamily: '"Outfit", sans-serif', mb: 1 }}>
        Photos
      </Typography>
      <Typography sx={{ color: 'rgba(255,255,255,0.5)' }}>
        Your synced timeline will appear here.
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
console.log('UI Upgrade complete.');
