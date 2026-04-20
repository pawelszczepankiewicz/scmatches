export interface EnvironmentVariables {
  PORT: number;
  CORS_ORIGIN: string;
  FIREBASE_PROJECT_ID: string;
}

export function validateEnv(config: Record<string, unknown>): EnvironmentVariables {
  return {
    PORT: Number(config.PORT) || 3000,
    CORS_ORIGIN: String(config.CORS_ORIGIN || 'http://localhost:5173'),
    FIREBASE_PROJECT_ID: String(config.FIREBASE_PROJECT_ID || 'statscoreapp'),
  };
}
