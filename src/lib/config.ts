const dev = process.env.NODE_ENV !== "production";

export const SERVER_URL = dev
  ? "http://localhost:8080"
  : process.env.NEXT_PUBLIC_SERVER_URL;

export const FRONTEND_SERVER_URL = dev
  ? "http://localhost:3000"
  : "https://fmhy.ml";
