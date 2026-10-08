import React from 'react';
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
