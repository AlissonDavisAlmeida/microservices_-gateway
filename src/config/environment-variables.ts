import dotenv from 'dotenv';

dotenv.config();

export const environmentVariables = {
  authBaseUrl: process.env.AUTH_BASE_URL,
  clientUrl: process.env.CLIENT_URL,
  elasticApmSecretToken: process.env.ELASTIC_APM_SECRET_TOKEN,
  elasticApmServerUrl: process.env.ELASTIC_APM_SERVER_URL,
  elasticSearchUrl: process.env.ELASTIC_SEARCH_URL,
  gatewayJwtToken: process.env.GATEWAY_JWT_TOKEN,
  gigsBaseUrl: process.env.GIGS_BASE_URL,
  jwtToken: process.env.JWT_TOKEN ?? 'secret',
  messagesBaseUrl: process.env.MESSAGES_BASE_URL,
  nodeEnv: process.env.NODE_ENV,
  orderBaseUrl: process.env.ORDER_BASE_URL,
  redisHost: process.env.REDIS_HOST,
  reviewBaseUrl: process.env.REVIEW_BASE_URL,
  secretKeyOne: process.env.SECRET_KEY_ONE,
  secretKeyTwo: process.env.SECRET_KEY_TWO,
  serverPort: process.env.SERVER_PORT,
  usersBaseUrl: process.env.USERS_BASE_URL
};
