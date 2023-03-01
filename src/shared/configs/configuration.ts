export default (): any => ({
  env: process.env.APP_ENV,
  port: process.env.APP_PORT,
  apiKey: process.env.API_KEY,
  database: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : 6379,
  },
  jwt: {
    publicKey: Buffer.from(
      process.env.JWT_PUBLIC_KEY_BASE64,
      'base64',
    ).toString('utf8'),
    privateKey: Buffer.from(
      process.env.JWT_PRIVATE_KEY_BASE64,
      'base64',
    ).toString('utf8'),
    accessTokenExpiresInSec: parseInt(
      process.env.JWT_ACCESS_TOKEN_EXP_IN_SEC,
      10,
    ),
    refreshTokenExpiresInSec: parseInt(
      process.env.JWT_REFRESH_TOKEN_EXP_IN_SEC,
      10,
    ),
  },
  basicAuth: {
    username: process.env.BASIC_AUTH_USERNAME,
    password: process.env.BASIC_AUTH_PASSWORD,
  },
  cache: {
    ttl: parseInt(process.env.CACHE_TTL, 10),
    enable: process.env.CACHE_ENABLE === 'true',
  },
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    bucketName: process.env.AWS_BUCKET_NAME,
  },
  fallbackLanguage: process.env.FALLBACK_LANGUAGE,
  bull: {
    prefix: process.env.QUEUE_PREFIX,
    limiter: {
      max: process.env.QUEUE_LIMITER_MAX
        ? parseInt(process.env.QUEUE_LIMITER_MAX, 10)
        : 1e5,
      duration: process.env.QUEUE_LIMITER_DURATION,
    },
    defaultOptions: {
      attempts: process.env.QUEUE_DEFAULT_JOB_ATTEMPTS,
      removeOnComplete: process.env.QUEUE_DEFAULT_JOB_REMOVE_ON_COMPLETE,
      removeOnFail: process.env.QUEUE_DEFAULT_JOB_REMOVE_ON_FAIL,
    },
  },
  health: {
    api: {
      url: process.env.HEALTH_API_URL,
    },
  },
});
