import { HexclaveClientApp } from "@hexclave/next";

export const hexclaveClientApp = new HexclaveClientApp({
  projectId: process.env.NEXT_PUBLIC_HEXCLAVE_PROJECT_ID,
  ...(process.env.NEXT_PUBLIC_HEXCLAVE_PUBLISHABLE_CLIENT_KEY
    ? {
        publishableClientKey:
          process.env.NEXT_PUBLIC_HEXCLAVE_PUBLISHABLE_CLIENT_KEY,
      }
    : {}),
  tokenStore: "nextjs-cookie",

  urls: {
    signIn: {
      type: "custom",
      url: "/signin",
      version: 1,
    },

    default: {
      type: "hosted",
    },
  },
});