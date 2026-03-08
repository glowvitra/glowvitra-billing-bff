import * as Joi from 'joi';
import * as K from '../common/constants';

export default Joi.object({
  NODE_ENV: Joi.string()
    .valid(...K.NODE_ENVIRONMENTS)
    .default(K.NODE_ENVIRONMENTS[0]),
  PORT: Joi.number().required(),
  LOG_LEVEL: Joi.string()
    .valid(...K.LOGGER_LEVELS)
    .default(K.LOGGER_LEVELS[0]),
  PRETTY_PRINT_LOG: Joi.string().default('false'),
  SWAGGER_ENABLED: Joi.string().valid('true', 'false').default('false'),
  SWAGGER_USER: Joi.string().when('SWAGGER_ENABLED', {
    is: 'true',
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
  SWAGGER_PASSWORD: Joi.string().when('SWAGGER_ENABLED', {
    is: 'true',
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
});
