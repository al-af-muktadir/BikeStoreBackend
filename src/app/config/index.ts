import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  port: process.env.PORT,
  node_env: process.env.NODE_ENV,
  database_url: process.env.DATABASE_URL,
  saltrounds: process.env.SALT_ROUNDS,
  access_token_secret: process.env.JWT_SECRET,
  access_token_expiresin: process.env.JWT_EXPIRATION,
  refresh_token_secret: process.env.JWT_REFRESH_SECRET,
  sp: {
    sp_endpoint: process.env.SP_ENDPOINT,
    sp_username: process.env.SP_USERNAME,
    sp_password: process.env.SP_PASSWORD,
    sp_prefix: process.env.SP_PREFIX,
    sp_return_url: process.env.SP_RETURN_URL,
  },
};
