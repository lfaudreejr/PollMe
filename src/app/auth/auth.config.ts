import { ENV } from "./../core/env.config";

interface AuthConfig {
  CLIENT_ID: string;
  CLIENT_DOMAIN: string;
  AUDIENCE: string;
  REDIRECT: string;
  SCOPE: string;
}

export const AUTH_CONFIG: AuthConfig = {
  CLIENT_ID: "sEdVSrIuQuXkImtPotuDlNzTiSHSapxf",
  CLIENT_DOMAIN: "lfaudreejr.auth0.com",
  AUDIENCE: "http://localhost:8080/api",
  REDIRECT: `${ENV.BASE_URI}/callback`,
  SCOPE: "openid profile"
};
