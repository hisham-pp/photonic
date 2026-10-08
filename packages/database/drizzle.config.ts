import type { Config } from 'drizzle-kit';

export default {
  schema: './src/schema/index.ts',
  out: './src/migrations',
  driver: 'better-sqlite',
  dbCredentials: {
    url: 'sqlite.db',
  }
} satisfies Config;
