import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: Number(process.env.PORT) || 3000,
  TELEGRAM: {
    API_ID: Number(process.env.TELEGRAM_API_ID),
    API_HASH: process.env.TELEGRAM_API_HASH || "",
    SESSION: process.env.TELEGRAM_SESSION || "",
  },
  JARVIS: {
    JARVIS_URL: process.env.JARVIS_URL || "http://localhost:3000/jarvis",
    USER_JID: process.env.USER_JID || "",
    JARVIS_ADMIN_KEY: process.env.JARVIS_ADMIN_KEY
  },
};

if (!env.TELEGRAM.API_ID || isNaN(env.TELEGRAM.API_ID)) {
  throw new Error("TELEGRAM_API_ID should be a valid number in the environment variables.");
}

if (!env.TELEGRAM.API_HASH.trim()) {
  throw new Error("TELEGRAM_API_HASH should be provided in the environment variables.");
}

if (!env.JARVIS.USER_JID.trim()) {
  throw new Error("USER_JID should be provided in the environment variables.");
}

if (!env.JARVIS.JARVIS_ADMIN_KEY) {
  throw new Error("JARVIS_ADMIN_KEY should be provided in the environment variables.");
}