import React from 'react';
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
