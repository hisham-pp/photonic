import { createTheme } from '@mui/material/styles';

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
      styleOverrides: `
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
      `
    }
  }
});
