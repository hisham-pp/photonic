import { randomBytes, createHash } from 'crypto';
import { createServer, Server } from 'http';
import { shell } from 'electron';
import axios from 'axios';
import { AuthResult } from '../index';

export interface OAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scopes: string[];
}

export class GoogleOAuthProvider {
  private config: OAuthConfig;
  private server: Server | null = null;

  constructor(config: OAuthConfig) {
    this.config = config;
  }

  // Generates PKCE Challenge
  private generatePKCE() {
    const verifier = randomBytes(32).toString('base64url');
    const challenge = createHash('sha256').update(verifier).digest('base64url');
    return { verifier, challenge };
  }

  // Starts the local server, opens the browser, and waits for the callback
  public async authenticate(): Promise<AuthResult> {
    return new Promise((resolve, reject) => {
      const { verifier, challenge } = this.generatePKCE();
      const state = randomBytes(16).toString('hex');

      const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
      authUrl.searchParams.append('client_id', this.config.clientId);
      authUrl.searchParams.append('redirect_uri', this.config.redirectUri);
      authUrl.searchParams.append('response_type', 'code');
      authUrl.searchParams.append('scope', this.config.scopes.join(' '));
      authUrl.searchParams.append('access_type', 'offline');
      authUrl.searchParams.append('prompt', 'consent');
      authUrl.searchParams.append('state', state);
      authUrl.searchParams.append('code_challenge', challenge);
      authUrl.searchParams.append('code_challenge_method', 'S256');

      // Start temporary local HTTP server to catch the redirect
      this.server = createServer(async (req, res) => {
        try {
          const url = new URL(req.url || '', \`http://\${req.headers.host}\`);
          if (url.pathname === '/callback') {
            const code = url.searchParams.get('code');
            const returnedState = url.searchParams.get('state');

            if (returnedState !== state) {
              throw new Error('Invalid state parameter');
            }

            if (code) {
              res.writeHead(200, { 'Content-Type': 'text/html' });
              res.end('<h1>Authentication successful!</h1><p>You can close this tab and return to Photonic.</p><script>window.close()</script>');
              
              // Exchange code for tokens
              const tokens = await this.exchangeCodeForTokens(code, verifier);
              resolve(tokens);
            } else {
              const error = url.searchParams.get('error');
              res.writeHead(400, { 'Content-Type': 'text/html' });
              res.end(\`<h1>Authentication Failed</h1><p>\${error}</p>\`);
              reject(new Error(error || 'Failed to get authorization code'));
            }

            this.closeServer();
          }
        } catch (err) {
          reject(err);
          this.closeServer();
        }
      });

      // Parse the port from redirectUri (e.g., http://127.0.0.1:3100/callback)
      const port = new URL(this.config.redirectUri).port || 3100;
      
      this.server.listen(port, () => {
        // Open the system default browser
        shell.openExternal(authUrl.toString());
      });

      // Timeout after 5 minutes
      setTimeout(() => {
        this.closeServer();
        reject(new Error('Authentication timeout'));
      }, 5 * 60 * 1000);
    });
  }

  private async exchangeCodeForTokens(code: string, verifier: string): Promise<AuthResult> {
    const response = await axios.post('https://oauth2.googleapis.com/token', {
      client_id: this.config.clientId,
      client_secret: this.config.clientSecret,
      code,
      redirect_uri: this.config.redirectUri,
      grant_type: 'authorization_code',
      code_verifier: verifier,
    });

    return {
      accessToken: response.data.access_token,
      refreshToken: response.data.refresh_token,
      expiresAt: Date.now() + response.data.expires_in * 1000,
    };
  }

  private closeServer() {
    if (this.server) {
      this.server.close();
      this.server = null;
    }
  }
}
