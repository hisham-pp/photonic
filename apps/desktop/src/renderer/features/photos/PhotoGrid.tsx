import React, { useState } from 'react';
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
