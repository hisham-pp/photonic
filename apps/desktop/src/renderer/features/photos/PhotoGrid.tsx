import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

export function PhotoGrid() {
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentDir, setCurrentDir] = useState<string | null>(null);

  const selectDirectory = async () => {
    try {
      // @ts-ignore
      const dir = await window.api.selectDirectory();
      if (dir) {
        setCurrentDir(dir);
        scanDir(dir);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const scanDir = async (dir: string) => {
    setLoading(true);
    try {
      // @ts-ignore
      const files = await window.api.scanDirectory(dir);
      setPhotos(files);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{
      flexGrow: 1,
      backgroundColor: 'rgba(21, 23, 29, 0.95)',
      backdropFilter: 'blur(24px)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '16px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* Top Toolbar inside Grid */}
      <Box sx={{ p: 2, borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>Timeline View</Typography>
          <Typography sx={{ fontSize: 11, color: '#7e8294' }}>{photos.length} photos found</Typography>
        </Box>
        <Button 
          variant="contained" 
          onClick={selectDirectory}
          startIcon={<FolderOpenIcon />}
          sx={{ 
            bgcolor: 'rgba(99, 102, 241, 0.2)', 
            color: '#c0c1ff', 
            border: '1px solid rgba(99, 102, 241, 0.3)',
            boxShadow: 'none',
            textTransform: 'none',
            fontSize: 12,
            borderRadius: '8px',
            '&:hover': { bgcolor: 'rgba(99, 102, 241, 0.3)' } 
          }}
        >
          Select Folder
        </Button>
      </Box>

      {/* Grid Content */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 3 }}>
        {loading ? (
          <Typography sx={{ color: '#7e8294' }}>Scanning local files...</Typography>
        ) : photos.length === 0 ? (
          <Box sx={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
             <Typography sx={{ color: '#7e8294', mb: 2 }}>No photos selected.</Typography>
          </Box>
        ) : (
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
            gap: 2 
          }}>
            {photos.map((item, idx) => (
              <Box key={idx} sx={{ 
                aspectRatio: '16/10',
                bgcolor: '#181a20',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.1)',
                overflow: 'hidden',
                position: 'relative'
              }}>
                {/* Normally we would load thumbnails here using file protocol or custom protocol */}
                <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#000' }}>
                  <Typography sx={{ color: '#444', fontSize: 10 }}>IMAGE PREVIEW</Typography>
                </Box>
                <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: 1, bgcolor: 'rgba(25, 27, 34, 0.9)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <Typography noWrap sx={{ fontSize: 11, color: '#fff' }}>
                    {item.filename}
                  </Typography>
                  <Typography sx={{ fontSize: 10, color: '#7e8294' }}>
                    {(item.size / 1024 / 1024).toFixed(1)} MB
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}
