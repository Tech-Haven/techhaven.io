declare global {
  namespace NodeJS {
    interface ProcessEnv {
      KEYCLOAK_ID: string;
      KEYCLOAK_SECRET: string;
      KEYCLOAK_ISSUER: string;
      JWT_SECRET: string;
    }
  }
}

export {};
