import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';

export default function Home() {
  return (
    <Container maxWidth="md" sx={{ mt: 8, textAlign: 'center' }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Your Google Photos. Your desktop.
      </Typography>
      <Typography variant="h5" color="text.secondary" paragraph>
        A fast, open-source desktop client for browsing, organizing and managing your Google Photos library.
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Button variant="contained" size="large" href="/download" sx={{ mr: 2 }}>
          Download
        </Button>
        <Button variant="outlined" size="large" href="https://github.com/hisham-pp/photonic">
          View on GitHub
        </Button>
      </Box>
      <Box sx={{ mt: 8 }}>
        <Typography variant="body2" color="text.secondary">
          Photonic is an independent open-source project and is not affiliated with Google.
        </Typography>
      </Box>
    </Container>
  );
}
