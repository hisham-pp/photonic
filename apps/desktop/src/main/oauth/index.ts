import { ipcMain } from 'electron';
import { GoogleOAuthProvider } from '@photonic/google-photos/src/auth/GoogleOAuthProvider';

// We would typically load these from an encrypted store or environment variables
const clientId = process.env.GOOGLE_CLIENT_ID || 'YOUR_CLIENT_ID';
const clientSecret = process.env.GOOGLE_CLIENT_SECRET || 'YOUR_CLIENT_SECRET';

const provider = new GoogleOAuthProvider({
  clientId,
  clientSecret,
  redirectUri: 'http://127.0.0.1:3100/callback',
  scopes: [
    'https://www.googleapis.com/auth/photoslibrary.readonly',
    'https://www.googleapis.com/auth/photoslibrary.appendonly',
  ]
});

export function setupOAuthHandlers() {
  ipcMain.handle('auth:login', async () => {
    try {
      const tokens = await provider.authenticate();
      
      // TODO: Encrypt and store tokens in the SQLite database here using @photonic/database
      // e.g., await db.insert(oauthAccounts).values({...})
      
      // Never return the actual tokens to the renderer!
      // Only return a success boolean or basic user profile info
      return { success: true };
    } catch (error: any) {
      console.error('OAuth Login Error:', error);
      return { success: false, error: error.message };
    }
  });
}
