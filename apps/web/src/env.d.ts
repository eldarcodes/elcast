/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY: string;
  }
}
