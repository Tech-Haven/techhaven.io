declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AUTHENTIK_ID: string;
      AUTHENTIK_SECRET: string;
      AUTHENTIK_ISSUER: string;
      JWT_SECRET: string;
      WEBHOOK_URL: string;
    }
  }
}

export {};
