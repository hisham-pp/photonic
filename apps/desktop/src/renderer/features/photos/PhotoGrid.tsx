import React, { useState } from 'react';
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
