import { env } from "./env.mjs";

const DEFAULT_LOCAL_API_URL = "http://127.0.0.1:5000"

export const API_URL = env.NEXT_PUBLIC_API_URL ?? DEFAULT_LOCAL_API_URL;
