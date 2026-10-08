// Provider interfaces
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
