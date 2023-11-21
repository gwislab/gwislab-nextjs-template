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
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  defaultLanguage: 'en',
};

const missingConfig = Object.keys(config).filter(
  (confKey) => typeof config[confKey] === 'undefined',
);

if (missingConfig.length) {
  console.error(`Missing configurations found: ${missingConfig}`);
}

export default config;
