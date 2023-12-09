import 'dotenv/config';

const nodeEnv = process.env.NODE_ENV;

const config = {
  // GENERAL SERVER CONFIGS
  nodeEnv,
  isDevEnv: nodeEnv === 'development',
  isProdEnv: nodeEnv === 'production',
  isTestEnv: nodeEnv === 'test',
  appName: 'Doormot',
  databaseUrl: process.env.DATABASE_URL,
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  serverUrl: process.env.SERVER_URL,
  defaultLanguage: 'en',

  // EXPIRATION CONFIGS
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  emailJwtExpiryInSec: +process.env.EMAIL_JWT_EXPIRY_IN_SEC,
  verificationCodeExpiryInSec: +process.env.VERIFICATION_CODE_EXPIRY_IN_SEC,

  // MEDIA CONFIGS
  maxFileSize: 60 * 1000 * 1000, // 10MB in bytes

  // EMAILS CONFIGS
  emailHost: process.env.EMAIL_HOST,
  emailPort: +process.env.EMAIL_PORT,
  emailUser: process.env.EMAIL_USER,
  emailUserPassword: process.env.EMAIL_USER_PASSWORD,
};

const missingConfig = Object.keys(config).filter(
  (confKey) => typeof config[confKey] === 'undefined',
);

if (missingConfig.length) {
  console.error(`Missing configurations found: ${missingConfig}`);
}

export default config;
