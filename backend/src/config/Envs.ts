import { config } from 'dotenv';

config();

export default {
  port: process.env.PORT || 4000,
  dbAccessUrl: process.env.DATABASE_URL,
  bcryptSalt: process.env.BCRYPT_SALT || 12,
  jwtSecret: process.env.JWT_SECRET || 'jwtSecret'
} as const;
