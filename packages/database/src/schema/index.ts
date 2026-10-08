import { sqliteTable, text, integer, unique } from 'drizzle-orm/sqlite-core';

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
