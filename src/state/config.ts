export interface AppConfig {
  DEBUG: boolean;
  API_BASE: string;
  KEYCLOAK_CLIENT_ID: string;
  KEYCLOAK_REALM: string;
  KEYCLOAK_URL: string;
}

/* global CONFIGURATION_SOURCE */
declare global {
  const CONFIGURATION_SOURCE: string;
  const CONFIGURATION_API_BASE: string | null;
  const CONFIGURATION_KEYCLOAK_CLIENT_ID: string | null;
  const CONFIGURATION_KEYCLOAK_REALM: string | null;
  const CONFIGURATION_KEYCLOAK_URL: string | null;
}

let CONFIG: AppConfig;

switch (CONFIGURATION_SOURCE) {
  case 'Caddy':
    CONFIG = {
      DEBUG: false,
      API_BASE: '{{env "API_BASE"}}',
      KEYCLOAK_CLIENT_ID: '{{env "KEYCLOAK_CLIENT_ID"}}',
      KEYCLOAK_REALM: '{{env "KEYCLOAK_REALM"}}',
      KEYCLOAK_URL: '{{env "KEYCLOAK_URL"}}',
    };
    break;
  case 'Hardcoded':
  default:
    CONFIG = {
      DEBUG: true,
      API_BASE: 'http://localhost:6005',
      KEYCLOAK_CLIENT_ID: 'wildlife-health-information-system-1618',
      KEYCLOAK_REALM: 'onestopauth',
      KEYCLOAK_URL: 'https://dev.oidc.gov.bc.ca/auth'
    };
    break;
  case 'Webpack':
    CONFIG = {
      DEBUG: true,
      API_BASE: CONFIGURATION_API_BASE,
      KEYCLOAK_CLIENT_ID: CONFIGURATION_KEYCLOAK_CLIENT_ID,
      KEYCLOAK_REALM: CONFIGURATION_KEYCLOAK_REALM,
      KEYCLOAK_URL: CONFIGURATION_KEYCLOAK_URL
    };
    break;
}

export {CONFIG};
