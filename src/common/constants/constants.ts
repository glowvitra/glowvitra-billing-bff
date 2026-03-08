export const API_GLOBAL_PREFIX = '/api/';

export const DEFAULT_PORT = 3575;

export const NODE_ENVIRONMENT = {
  LOCAL: 'local',
  TEST: 'test',
  DEVELOPMENT: 'develop',
  STAGING: 'staging',
  PRODUCTION: 'production',
};

export const NODE_ENVIRONMENTS = Object.values(NODE_ENVIRONMENT);

export const LOGGER_LEVELS = ['log', 'error', 'warn', 'debug'];

export const CONTENT_TYPE = {
  JSON: 'application/json',
  FORM_URL_ENCODED: 'application/x-www-form-urlencoded',
};

export const FASTIFY_ERR_BODY_TOO_LARGE = 'FST_ERR_CTP_BODY_TOO_LARGE';

export const MAX_JSON_REQUEST_SIZE = 10485760;

export const JWT_ALGORITHM = 'HS512';
export const JWT_STRATEGY = { DEFAULT: 'jwt' };

export const PUBLIC_METADATA = 'isPublic';
