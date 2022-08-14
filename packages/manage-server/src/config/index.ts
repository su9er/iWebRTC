import * as Joi from '@hapi/joi';
import { ConfigModule } from '@nestjs/config';
export function configGenerator() {
  const mode = process.env.NODE_ENV || 'development';
  let envFilePath;
  switch (mode) {
    case 'development':
      envFilePath = ['.env.development.local', '.env.development', '.env'];
      break;
    case 'testing':
      envFilePath = ['.env.test.local', '.env.test', '.env'];
      break;
    case 'production':
      envFilePath = ['.env.production.local', '.env.production', '.env'];
      break;
    default:
      break;
  }

  return ConfigModule.forRoot({
    validationSchema: Joi.object({
      NODE_ENV: Joi.string()
        .valid('development', 'production', 'testing')
        .default('development'),
      // Database configuration
      DB_HOST: Joi.string().required(),
      DB_PORT: Joi.number().required(),
      DATABASE: Joi.string().required(),
      DB_USER: Joi.string(),
      DB_PASSWORD: Joi.string(),
      // RabbitMQ rpc configuration
      RMQ_HOST: Joi.string().required(),
      RMQ_PORT: Joi.number().required(),
      MANAGE_QUEUE: Joi.string().required(),
      RMQ_USER: Joi.string(),
      RMQ_PASSWORD: Joi.string(),
    }),
    envFilePath,
  });
}
