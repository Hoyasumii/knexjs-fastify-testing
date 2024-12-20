declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: "development" | "test" | "production";
    PORT: string;
    DB_PATH: string;
    COOKIES_SECRET: string;
  }
}
