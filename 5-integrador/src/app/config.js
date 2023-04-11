import dotenv from 'dotenv';

dotenv.config();

export const ENV_CONFIG_PROCES = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI
};