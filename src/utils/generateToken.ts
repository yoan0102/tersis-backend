import jwt from 'jsonwebtoken';
import config from '../config';

export const generateToken = (payload: any) => {
	const expiresIn: number = 60 * 60 * 24;
	const token = jwt.sign(payload, config.jwtSecret, {
		expiresIn,
	});

	return { token, expiresIn };
};
