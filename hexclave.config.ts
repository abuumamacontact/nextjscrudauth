import type { HexclaveConfig } from "@hexclave/next";

export const config: HexclaveConfig = {
  emails: {
    selectedThemeId: "a0172b5d-cff0-463b-83bb-85124697373a",
  },
  auth: {
    allowSignUp: true,
    password: {
      allowSignIn: true,
    },
    otp: {
      allowSignIn: true,
    },
    oauth: {
      providers: {
        google: {
          type: "google",
          allowSignIn: true,
          allowConnectedAccounts: true,
        },
        github: {
          type: "github",
          allowSignIn: true,
          allowConnectedAccounts: true,
        },
      },
    },
  },
  apps: {
    installed: {
      authentication: {
        enabled: true,
      },
      payments: {
        enabled: true,
      },
      emails: {
        enabled: true,
      },
      analytics: {
        enabled: true,
      },
    },
  },
};