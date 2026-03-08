export const ERROR_CODES = {
  DEFAULT: {
    statusCode: 1000,
    message: 'Error',
  },
  INTERNAL: {
    statusCode: 1001,
    message: 'Internal Server Error',
  },
  INPUT: {
    statusCode: 1002,
    message: 'Invalid input format',
  },
  AUTH_ERROR: {
    statusCode: 1003,
    message: 'Authentication error',
  },
  NOT_FOUND: {
    statusCode: 1004,
    message: 'Resource not found',
  },
  FORBIDDEN: {
    statusCode: 1005,
    message: 'This request cannot be fulfilled',
  },
  REQUEST_BODY_LARGE: {
    statusCode: 1006,
    message: 'Request body too large',
  },
  INVALID_ACCESS_TOKEN: {
    statusCode: 1007,
    message: 'Invalid access token',
  },
  INVALID_REFRESH_TOKEN: {
    statusCode: 1008,
    message: 'Invalid refresh token',
  },
  NO_AUTH_TOKEN: {
    statusCode: 1009,
    message: 'No auth token',
  },
  MAX_LOGIN_LIMIT: {
    statusCode: 1010,
    message: 'Maximum login limit reached',
  },
  REQUEST_BODY_EMPTY: {
    statusCode: 1011,
    message: 'Request body is empty',
  },
  REQUIRED_FIELD: {
    statusCode: 1012,
    message: 'Field is required',
  },
  CSV_FILE_UPLOAD_MAX_LIMIT: {
    statusCode: 1013,
    message: 'CSV file rows are more than the max upload limit',
  },
};
