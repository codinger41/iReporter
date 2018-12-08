import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// eslint-disable-next-line import/prefer-default-export
export const generateToken = payload => jwt.sign(payload, process.env.JWT_SECRET);
