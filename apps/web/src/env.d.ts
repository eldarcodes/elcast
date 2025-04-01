/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    CLOUDFLARE_TURNSTILE_SITE_KEY: string;
  }
}
