const fs = require('fs');
const path = require('path');

const dirs = [
  'apps/desktop/src/main/windows',
  'apps/desktop/src/main/ipc',
  'apps/desktop/src/main/oauth',
  'apps/desktop/src/main/services',
  'apps/desktop/src/main/workers',
  'apps/desktop/src/main/menu',
  'apps/desktop/src/renderer/features/auth',
  'apps/desktop/src/renderer/features/photos',
  'apps/desktop/src/renderer/features/albums',
  'apps/desktop/src/renderer/features/search',
  'apps/desktop/src/renderer/features/timeline',
  'apps/desktop/src/renderer/features/viewer',
  'apps/desktop/src/renderer/features/uploads',
  'apps/desktop/src/renderer/features/downloads',
  'apps/desktop/src/renderer/features/settings',
  'apps/desktop/src/renderer/hooks',
  'apps/desktop/src/renderer/stores',
  'apps/desktop/src/renderer/api',
  'apps/desktop/src/renderer/routes',
  'apps/desktop/src/renderer/theme',
  'apps/desktop/src/renderer/utils',
  'apps/desktop/resources',
  'apps/website/app/download',
  'apps/website/app/docs/getting-started',
  'apps/website/app/docs/google-auth',
  'apps/website/app/docs/sync',
  'apps/website/app/docs/albums',
  'apps/website/app/docs/uploads',
  'apps/website/app/docs/downloads',
  'apps/website/app/docs/privacy',
  'apps/website/app/docs/troubleshooting',
  'apps/website/app/privacy',
  'apps/website/app/terms',
  'apps/website/app/security',
  'apps/website/app/contributing',
  'apps/website/app/api',
  'apps/website/components',
  'apps/website/content',
  'apps/website/public',
  'packages/core/src/models',
  'packages/core/src/repositories',
  'packages/core/src/services',
  'packages/core/src/sync',
  'packages/core/src/search',
  'packages/core/src/errors',
  'packages/database/src/schema',
  'packages/database/src/migrations',
  'packages/database/src/repositories',
  'packages/google-photos/src/auth',
  'packages/google-photos/src/client',
  'packages/google-photos/src/media',
  'packages/google-photos/src/albums',
  'packages/google-photos/src/uploads',
  'packages/google-photos/src/pagination',
  'packages/google-photos/src/rate-limit',
  'packages/google-photos/src/types',
  'packages/shared/src/types',
  'packages/shared/src/constants',
  'packages/shared/src/validation',
  'packages/shared/src/ipc',
  'packages/ui/src/components',
  'packages/ui/src/theme',
  'packages/ui/src/icons',
  'docs',
  '.github/workflows',
  '.github/ISSUE_TEMPLATE'
];

for (const d of dirs) {
  fs.mkdirSync(path.join(__dirname, d), { recursive: true });
}

const files = {
  "pnpm-workspace.yaml": `packages:
  - 'apps/*'
  - 'packages/*'
`,
  "package.json": JSON.stringify({
    name: "photonic",
    version: "0.1.0",
    private: true,
    scripts: {
      "dev": "pnpm --filter @photonic/desktop dev & pnpm --filter @photonic/website dev",
      "build": "pnpm -r build",
      "test": "vitest",
      "lint": "eslint ."
    },
    devDependencies: {
      "typescript": "^5.4.0",
      "eslint": "^8.57.0",
      "prettier": "^3.2.0",
      "vitest": "^1.4.0"
    }
  }, null, 2),
  "tsconfig.json": JSON.stringify({
    compilerOptions: {
      target: "ES2022",
      module: "ESNext",
      lib: ["ES2022", "DOM", "DOM.Iterable"],
      moduleResolution: "bundler",
      strict: true,
      esModuleInterop: true,
      skipLibCheck: true,
      forceConsistentCasingInFileNames: true
    }
  }, null, 2),
  "apps/desktop/package.json": JSON.stringify({
    name: "@photonic/desktop",
    version: "0.1.0",
    private: true,
    main: "dist-electron/main/index.js",
    scripts: {
      "dev": "vite",
      "build": "tsc && vite build && electron-builder",
      "start": "electron ."
    },
    dependencies: {
      "@photonic/shared": "workspace:*",
      "@photonic/core": "workspace:*",
      "@photonic/database": "workspace:*",
      "@photonic/google-photos": "workspace:*",
      "@photonic/ui": "workspace:*",
      "@mui/material": "^5.15.0",
      "@mui/icons-material": "^5.15.0",
      "@emotion/react": "^11.11.0",
      "@emotion/styled": "^11.11.0",
      "@tanstack/react-query": "^5.28.0",
      "react-router-dom": "^6.22.0",
      "zustand": "^4.5.0",
      "react": "^18.2.0",
      "react-dom": "^18.2.0",
      "better-sqlite3": "^9.4.0",
      "zod": "^3.22.0"
    },
    devDependencies: {
      "@types/react": "^18.2.0",
      "@types/react-dom": "^18.2.0",
      "@types/better-sqlite3": "^7.6.9",
      "@vitejs/plugin-react": "^4.2.0",
      "electron": "^29.1.0",
      "electron-builder": "^24.13.0",
      "vite": "^5.2.0",
      "vite-plugin-electron": "^0.28.0"
    }
  }, null, 2),
  "apps/desktop/vite.config.ts": `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import electron from 'vite-plugin-electron/simple';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    electron({
      main: {
        entry: 'src/main/index.ts',
      },
      preload: {
        input: 'src/preload/index.ts',
      }
    })
  ],
  server: {
    port: 5173
  }
});
`,
  "apps/desktop/tsconfig.json": JSON.stringify({
    extends: "../../tsconfig.json",
    compilerOptions: {
      jsx: "react-jsx",
      baseUrl: ".",
      paths: {
        "@/*": ["src/*"]
      }
    },
    include: ["src"]
  }, null, 2),
  "apps/desktop/src/main/index.ts": `import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.mjs'),
      contextIsolation: true,
      nodeIntegration: false,
    }
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, '../../dist/index.html'));
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.handle('ping', () => 'pong');
`,
  "apps/desktop/src/preload/index.ts": `import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  ping: () => ipcRenderer.invoke('ping')
});
`,
  "apps/desktop/index.html": `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Photonic</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/renderer/index.tsx"></script>
  </body>
</html>
`,
  "apps/desktop/src/renderer/index.tsx": `import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    }
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ padding: '20px' }}>
        <h1>Photonic Desktop Client</h1>
        <p>A beautiful, privacy-conscious desktop client for Google Photos.</p>
      </div>
    </ThemeProvider>
  );
}

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
`,
  "apps/desktop/electron-builder.yml": `appId: com.photonic.desktop
productName: Photonic
directories:
  output: release/\${version}
files:
  - dist
  - dist-electron
mac:
  target: dmg
win:
  target: nsis
linux:
  target: AppImage
`,
  "apps/website/package.json": JSON.stringify({
    name: "@photonic/website",
    version: "0.1.0",
    private: true,
    scripts: {
      "dev": "next dev -p 3000",
      "build": "next build",
      "start": "next start",
      "lint": "next lint"
    },
    dependencies: {
      "next": "^14.1.0",
      "react": "^18.2.0",
      "react-dom": "^18.2.0",
      "@mui/material": "^5.15.0",
      "@emotion/react": "^11.11.0",
      "@emotion/styled": "^11.11.0"
    },
    devDependencies: {
      "@types/node": "^20.11.0",
      "@types/react": "^18.2.0",
      "@types/react-dom": "^18.2.0",
      "typescript": "^5.4.0"
    }
  }, null, 2),
  "apps/website/tsconfig.json": JSON.stringify({
    extends: "../../tsconfig.json",
    compilerOptions: {
      jsx: "preserve",
      lib: ["dom", "dom.iterable", "esnext"],
      allowJs: true,
      skipLibCheck: true,
      strict: true,
      forceConsistentCasingInFileNames: true,
      noEmit: true,
      esModuleInterop: true,
      module: "esnext",
      moduleResolution: "bundler",
      resolveJsonModule: true,
      isolatedModules: true,
      plugins: [
        {
          name: "next"
        }
      ]
    },
    include: ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
    exclude: ["node_modules"]
  }, null, 2),
  "apps/website/app/layout.tsx": `import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../theme';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
`,
  "apps/website/app/page.tsx": `import React from 'react';
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
`,
  "apps/website/theme.ts": `'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
  },
});

export default theme;
`,
  "packages/database/package.json": JSON.stringify({
    name: "@photonic/database",
    version: "0.1.0",
    private: true,
    main: "dist/index.js",
    types: "dist/index.d.ts",
    scripts: {
      "build": "tsc",
      "generate": "drizzle-kit generate:sqlite"
    },
    dependencies: {
      "drizzle-orm": "^0.30.0",
      "better-sqlite3": "^9.4.0"
    },
    devDependencies: {
      "drizzle-kit": "^0.20.14",
      "typescript": "^5.4.0",
      "@types/better-sqlite3": "^7.6.9"
    }
  }, null, 2),
  "packages/database/tsconfig.json": JSON.stringify({
    extends: "../../tsconfig.json",
    compilerOptions: {
      outDir: "dist"
    },
    include: ["src"]
  }, null, 2),
  "packages/database/src/schema/index.ts": `import { sqliteTable, text, integer, unique } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  provider: text('provider').notNull(),
  providerUserId: text('provider_user_id').notNull(),
  email: text('email'),
  displayName: text('display_name'),
  createdAt: integer('created_at', { mode: 'timestamp' }),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
});

export const oauthAccounts = sqliteTable('oauth_accounts', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  provider: text('provider').notNull(),
  accessTokenEncrypted: text('access_token_encrypted').notNull(),
  refreshTokenEncrypted: text('refresh_token_encrypted'),
  tokenExpiresAt: integer('token_expires_at', { mode: 'timestamp' }),
  scopes: text('scopes'),
  createdAt: integer('created_at', { mode: 'timestamp' }),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
});

export const mediaItems = sqliteTable('media_items', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  provider: text('provider').notNull(),
  providerMediaId: text('provider_media_id').notNull(),
  filename: text('filename'),
  description: text('description'),
  mimeType: text('mime_type'),
  mediaType: text('media_type'),
  creationTime: integer('creation_time', { mode: 'timestamp' }),
  width: integer('width'),
  height: integer('height'),
  durationMs: integer('duration_ms'),
  cameraMake: text('camera_make'),
  cameraModel: text('camera_model'),
  lens: text('lens'),
  iso: integer('iso'),
  aperture: text('aperture'), 
  focalLength: text('focal_length'),
  exposureTime: text('exposure_time'),
  latitude: text('latitude'),
  longitude: text('longitude'),
  productUrl: text('product_url'),
  isFavorite: integer('is_favorite', { mode: 'boolean' }).default(false),
  isArchived: integer('is_archived', { mode: 'boolean' }).default(false),
  videoProcessingStatus: text('video_processing_status'),
  createdAt: integer('created_at', { mode: 'timestamp' }),
  updatedAt: integer('updated_at', { mode: 'timestamp' }),
  lastSyncedAt: integer('last_synced_at', { mode: 'timestamp' })
}, (t) => ({
  unq: unique().on(t.userId, t.provider, t.providerMediaId)
}));

export const albums = sqliteTable('albums', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  provider: text('provider').notNull(),
  providerAlbumId: text('provider_album_id').notNull(),
  title: text('title'),
  isWriteable: integer('is_writeable', { mode: 'boolean' }).default(false),
  isShared: integer('is_shared', { mode: 'boolean' }).default(false),
  coverMediaId: text('cover_media_id'),
  mediaCount: integer('media_count'),
  createdAt: integer('created_at', { mode: 'timestamp' }),
  updatedAt: integer('updated_at', { mode: 'timestamp' }),
  lastSyncedAt: integer('last_synced_at', { mode: 'timestamp' })
});

export const albumMedia = sqliteTable('album_media', {
  albumId: text('album_id').notNull().references(() => albums.id),
  mediaId: text('media_id').notNull().references(() => mediaItems.id),
  position: integer('position'),
  createdAt: integer('created_at', { mode: 'timestamp' })
}, (t) => ({
  pk: unique().on(t.albumId, t.mediaId)
}));

export const syncState = sqliteTable('sync_state', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  provider: text('provider').notNull(),
  resource: text('resource').notNull(),
  cursor: text('cursor'),
  lastSyncAt: integer('last_sync_at', { mode: 'timestamp' }),
  syncStatus: text('sync_status'),
  errorMessage: text('error_message'),
  createdAt: integer('created_at', { mode: 'timestamp' }),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
});

export const syncJobs = sqliteTable('sync_jobs', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  jobType: text('job_type'),
  status: text('status'),
  totalItems: integer('total_items'),
  processedItems: integer('processed_items'),
  failedItems: integer('failed_items'),
  startedAt: integer('started_at', { mode: 'timestamp' }),
  completedAt: integer('completed_at', { mode: 'timestamp' }),
  errorMessage: text('error_message')
});

export const downloadJobs = sqliteTable('download_jobs', {
  id: text('id').primaryKey(),
  mediaId: text('media_id').notNull().references(() => mediaItems.id),
  destination: text('destination'),
  status: text('status'),
  progress: integer('progress'),
  errorMessage: text('error_message'),
  createdAt: integer('created_at', { mode: 'timestamp' }),
  completedAt: integer('completed_at', { mode: 'timestamp' })
});

export const uploadJobs = sqliteTable('upload_jobs', {
  id: text('id').primaryKey(),
  localPath: text('local_path').notNull(),
  albumId: text('album_id'),
  status: text('status'),
  progress: integer('progress'),
  uploadToken: text('upload_token'),
  providerMediaId: text('provider_media_id'),
  errorMessage: text('error_message'),
  createdAt: integer('created_at', { mode: 'timestamp' }),
  completedAt: integer('completed_at', { mode: 'timestamp' })
});

export const localFiles = sqliteTable('local_files', {
  id: text('id').primaryKey(),
  mediaId: text('media_id').notNull().references(() => mediaItems.id),
  path: text('path').notNull(),
  filename: text('filename'),
  sizeBytes: integer('size_bytes'),
  sha256: text('sha256'),
  createdAt: integer('created_at', { mode: 'timestamp' }),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
});

export const appSettings = sqliteTable('app_settings', {
  key: text('key').primaryKey(),
  value: text('value'),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
});

export const searchHistory = sqliteTable('search_history', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  query: text('query').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' })
});
`,
  "packages/database/drizzle.config.ts": `import type { Config } from 'drizzle-kit';

export default {
  schema: './src/schema/index.ts',
  out: './src/migrations',
  driver: 'better-sqlite',
  dbCredentials: {
    url: 'sqlite.db',
  }
} satisfies Config;
`,
  "packages/google-photos/package.json": JSON.stringify({
    name: "@photonic/google-photos",
    version: "0.1.0",
    private: true,
    main: "dist/index.js",
    types: "dist/index.d.ts",
    scripts: {
      "build": "tsc"
    },
    dependencies: {
      "axios": "^1.6.8",
      "zod": "^3.22.0"
    },
    devDependencies: {
      "typescript": "^5.4.0"
    }
  }, null, 2),
  "packages/google-photos/tsconfig.json": JSON.stringify({
    extends: "../../tsconfig.json",
    compilerOptions: {
      outDir: "dist"
    },
    include: ["src"]
  }, null, 2),
  "packages/google-photos/src/index.ts": `// Provider interfaces
export interface AuthResult {
  accessToken: string;
  refreshToken?: string;
  expiresAt: number;
}

export interface PaginatedResult<T> {
  items: T[];
  nextPageToken?: string;
}

export interface PhotoProvider {
  authenticate(): Promise<AuthResult>;
  revokeAccess(): Promise<void>;
  // ... other methods
}
`,
  "packages/core/package.json": JSON.stringify({
    name: "@photonic/core",
    version: "0.1.0",
    private: true,
    main: "dist/index.js",
    types: "dist/index.d.ts",
    scripts: {
      "build": "tsc"
    },
    dependencies: {
      "@photonic/database": "workspace:*",
      "@photonic/google-photos": "workspace:*"
    },
    devDependencies: {
      "typescript": "^5.4.0"
    }
  }, null, 2),
  "packages/core/tsconfig.json": JSON.stringify({
    extends: "../../tsconfig.json",
    compilerOptions: {
      outDir: "dist"
    },
    include: ["src"]
  }, null, 2),
  "packages/core/src/index.ts": `export const CORE_VERSION = '0.1.0';\n`,
  "packages/shared/package.json": JSON.stringify({
    name: "@photonic/shared",
    version: "0.1.0",
    private: true,
    main: "dist/index.js",
    types: "dist/index.d.ts",
    scripts: {
      "build": "tsc"
    },
    dependencies: {
      "zod": "^3.22.0"
    },
    devDependencies: {
      "typescript": "^5.4.0"
    }
  }, null, 2),
  "packages/shared/tsconfig.json": JSON.stringify({
    extends: "../../tsconfig.json",
    compilerOptions: {
      outDir: "dist"
    },
    include: ["src"]
  }, null, 2),
  "packages/shared/src/index.ts": `export * from './constants';\n`,
  "packages/shared/src/constants.ts": `export const APP_NAME = 'Photonic';\n`,
  "packages/ui/package.json": JSON.stringify({
    name: "@photonic/ui",
    version: "0.1.0",
    private: true,
    main: "dist/index.js",
    types: "dist/index.d.ts",
    scripts: {
      "build": "tsc"
    },
    dependencies: {
      "react": "^18.2.0",
      "@mui/material": "^5.15.0"
    },
    devDependencies: {
      "typescript": "^5.4.0",
      "@types/react": "^18.2.0"
    }
  }, null, 2),
  "packages/ui/tsconfig.json": JSON.stringify({
    extends: "../../tsconfig.json",
    compilerOptions: {
      jsx: "react-jsx",
      outDir: "dist"
    },
    include: ["src"]
  }, null, 2),
  "packages/ui/src/index.ts": `export const ui = true;\n`,
  "LICENSE": `                                 Apache License
                           Version 2.0, January 2004
                        http://www.apache.org/licenses/
`,
  "NOTICE": `Photonic
Copyright 2026 Photonic Contributors

This product includes software developed at
The Apache Software Foundation (http://www.apache.org/).
`,
  ".env.example": `GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
`,
  "README.md": `# Photonic
A beautiful, privacy-conscious desktop client for Google Photos with a local-first SQLite metadata/index layer.
`,
  ".gitignore": `node_modules/
dist/
dist-electron/
release/
.next/
*.db
*.db-journal
.env
`,
  ".github/workflows/ci.yml": `name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - name: Use Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '20'
    - uses: pnpm/action-setup@v3
      with:
        version: 8
    - run: pnpm install
    - run: pnpm run typecheck
    - run: pnpm run lint
    - run: pnpm run test
    - run: pnpm run build
`,
  ".github/workflows/release.yml": `name: Release

on:
  release:
    types: [published]

jobs:
  build:
    runs-on: \${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: '20'
    - uses: pnpm/action-setup@v3
      with:
        version: 8
    - run: pnpm install
    - run: pnpm run build --filter @photonic/desktop
    - name: Build Electron
      run: pnpm --filter @photonic/desktop exec electron-builder --\${{ matrix.os == 'windows-latest' && 'win' || matrix.os == 'macos-latest' && 'mac' || 'linux' }}
      env:
        GH_TOKEN: \${{ secrets.GITHUB_TOKEN }}
`,
  ".github/workflows/website.yml": `name: Website

on:
  push:
    branches: [ main ]
    paths:
      - 'apps/website/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: '20'
    - uses: pnpm/action-setup@v3
      with:
        version: 8
    - run: pnpm install
    - run: pnpm run build --filter @photonic/website
`,
  "docs/architecture.md": `# Architecture
UI -> App Services -> Core/Domain -> Provider -> Google API
`,
  "docs/google-photos-api.md": `# Google Photos API Support Matrix
| Feature | Google API support | Required scope | Implementation | Limitations |
|---------|--------------------|----------------|----------------|-------------|
`
};

for (const [p, content] of Object.entries(files)) {
  const fullPath = path.join(__dirname, p);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content, 'utf8');
}
console.log('Scaffolding complete.');
