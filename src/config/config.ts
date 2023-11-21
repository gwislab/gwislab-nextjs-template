import 'dotenv/config';

const nodeEnv = process.env.NODE_ENV;

const config = {
  nodeEnv,
  isDevEnv: nodeEnv === 'development',
  isProdEnv: nodeEnv === 'production',
  isTestEnv: nodeEnv === 'test',
  databaseUrl: process.env.DATABASE_URL,
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  serverUrl: process.env.SERVER_URL,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  defaultLanguage: 'en',
  maxFileSize: 60 * 1000 * 1000, // 10MB in bytes
  maxVideoSize: 100 * 1000 * 1000, // 100MB in bytes
  streamChunkSize: 0.5 * 1000 * 1000, // 1MB in bytes
};

const missingConfig = Object.keys(config).filter(
  (confKey) => typeof config[confKey] === 'undefined',
);

if (missingConfig.length) {
  console.error(`Missing configurations found: ${missingConfig}`);
}

export default config;
