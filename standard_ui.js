const fs = require('fs');
const path = require('path');

// 1. Fix the GoogleOAuthProvider import error in the main process
const oauthPath = path.join(__dirname, 'apps/desktop/src/main/oauth/index.ts');
let oauthContent = fs.readFileSync(oauthPath, 'utf8');
oauthContent = oauthContent.replace(
  "from '@photonic/google-photos/auth/GoogleOAuthProvider'", 
  "from '@photonic/google-photos/src/auth/GoogleOAuthProvider'"
);
fs.writeFileSync(oauthPath, oauthContent, 'utf8');

// 2. Refine the UI to a "standard, premium, attractive" look without excessive glow/gradients
const files = {
  "apps/desktop/src/renderer/theme.ts": `import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0A84FF', // Standard Apple-like premium blue
    },
    background: {
      default: '#121212',
      paper: '#1C1C1E',
    },
    divider: 'rgba(255, 255, 255, 0.1)'
  },
  typography: {
    fontFamily: '"Inter", "SF Pro Text", "Segoe UI", sans-serif',
    h4: { fontWeight: 600, letterSpacing: '-0.02em' },
    h5: { fontWeight: 500, letterSpacing: '-0.01em' },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: \`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
        * {
          box-sizing: border-box;
        }
        body {
          margin: 0;
          padding: 0;
          overflow: hidden;
          background-color: #121212;
          color: #FAFAFA;
        }
        *::-webkit-scrollbar { width: 6px; height: 6px; }
        *::-webkit-scrollbar-track { background: transparent; }
        *::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 3px; }
        *::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.25); }
      \`
    }
  }
});
`,
  "apps/desktop/src/renderer/components/ui/Button.tsx": `import React from 'react';
import { Button as MuiButton, ButtonProps, styled } from '@mui/material';

const StyledButton = styled(MuiButton)(({ theme, variant }) => ({
  textTransform: 'none',
  fontWeight: 500,
  borderRadius: '6px',
  padding: '6px 16px',
  fontFamily: '"Inter", sans-serif',
  boxShadow: 'none',
  transition: 'background-color 0.15s ease',
  ...(variant === 'contained' && {
    backgroundColor: '#0A84FF',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#0070E0',
      boxShadow: 'none',
    },
    '&:active': {
      backgroundColor: '#0060C0',
    }
  }),
  ...(variant === 'outlined' && {
    borderColor: 'rgba(255,255,255,0.2)',
    color: '#E0E0E0',
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.05)',
      borderColor: 'rgba(255,255,255,0.3)',
    }
  }),
}));

export const Button: React.FC<ButtonProps> = (props) => <StyledButton disableRipple {...props} />;
`,
  "apps/desktop/src/renderer/components/ui/GlassPane.tsx": `import React from 'react';
import { Box, BoxProps, styled } from '@mui/material';

// Standard clean pane, no excessive blurring/glow
const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#1C1C1E',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '8px',
}));

export const GlassPane: React.FC<BoxProps> = (props) => <StyledBox {...props} />;
`,
  "apps/desktop/src/renderer/components/ui/Typography.tsx": `import React from 'react';
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
      height: '36px',
      WebkitAppRegion: 'drag',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#121212',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      pl: 2,
      zIndex: 1000
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box sx={{ width: 14, height: 14, borderRadius: '4px', backgroundColor: '#0A84FF' }} />
        <Typography variant="body2" sx={{ fontWeight: '600', color: '#E0E0E0' }}>
          Photonic
        </Typography>
      </Box>
      <Box sx={{ WebkitAppRegion: 'no-drag', display: 'flex', height: '100%' }}>
        <Box onClick={() => (window as any).api.windowMinimize()} sx={{ width: 46, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', cursor: 'pointer', transition: 'background-color 0.1s', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)', color: '#fff' } }}>
          <MinimizeIcon fontSize="small" sx={{ fontSize: 18 }} />
        </Box>
        <Box onClick={() => (window as any).api.windowMaximize()} sx={{ width: 46, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', cursor: 'pointer', transition: 'background-color 0.1s', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)', color: '#fff' } }}>
          <CropSquareIcon fontSize="small" sx={{ fontSize: 16 }} />
        </Box>
        <Box onClick={() => (window as any).api.windowClose()} sx={{ width: 46, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', cursor: 'pointer', transition: 'background-color 0.1s', '&:hover': { bgcolor: '#E81123', color: '#fff' } }}>
          <CloseIcon fontSize="small" sx={{ fontSize: 18 }} />
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
import { Typography } from './ui';

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
      width: 250,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      backgroundColor: '#1C1C1E',
      borderRight: '1px solid rgba(255,255,255,0.08)',
    }}>
      <Box sx={{ flexGrow: 1, pt: 3, px: 1.5 }}>
        <Typography variant="caption" sx={{ px: 2, color: '#888', fontWeight: '600', letterSpacing: '0.5px' }}>
          LIBRARY
        </Typography>
        <List sx={{ mt: 1 }}>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.25 }}>
              <ListItemButton sx={{ 
                py: 0.75, 
                px: 2,
                borderRadius: '6px',
                bgcolor: item.active ? 'rgba(10, 132, 255, 0.15)' : 'transparent',
                '&:hover': { 
                  bgcolor: item.active ? 'rgba(10, 132, 255, 0.15)' : 'rgba(255,255,255,0.05)',
                }
              }}>
                <ListItemIcon sx={{ minWidth: 32, color: item.active ? '#0A84FF' : '#888' }}>
                  {React.cloneElement(item.icon, { sx: { fontSize: 20 } })}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{ 
                    variant: 'body2', 
                    fontWeight: item.active ? 600 : 400,
                    color: item.active ? '#0A84FF' : '#E0E0E0',
                  }} 
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{ pb: 3, px: 1.5 }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton sx={{ px: 2, borderRadius: '6px', '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' } }}>
              <ListItemIcon sx={{ minWidth: 32, color: '#888' }}><SettingsIcon sx={{ fontSize: 20 }} /></ListItemIcon>
              <ListItemText primary="Settings" primaryTypographyProps={{ variant: 'body2', color: '#E0E0E0', fontWeight: 400 }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
}
`,
  "apps/desktop/src/renderer/features/photos/PhotoGrid.tsx": `import React, { useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import { Button, Typography, GlassPane } from '../../components/ui';

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
        <GlassPane sx={{ 
          p: 6, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          maxWidth: 440,
          textAlign: 'center'
        }}>
          <CloudSyncIcon sx={{ fontSize: 56, color: '#0A84FF', mb: 3 }} />
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: '#FAFAFA' }}>
            Connect to Google Photos
          </Typography>
          <Typography variant="body2" sx={{ color: '#888', mb: 4, lineHeight: 1.5 }}>
            Authenticate with your Google account to start syncing your photos to a secure, fast local index.
          </Typography>
          <Button 
            variant="contained" 
            fullWidth
            size="large" 
            onClick={handleConnect}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={16} sx={{ color: '#fff' }} /> : null}
          >
            {loading ? 'Authenticating...' : 'Connect Account'}
          </Button>
        </GlassPane>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#FAFAFA' }}>
        Photos
      </Typography>
      <Typography variant="body2" sx={{ color: '#888' }}>
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
console.log('Standard UI applied and OAuth import fixed.');
