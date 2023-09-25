import jwt from 'jsonwebtoken';
import config from '../config';

export const generateToken = (payload: any) => {
	const token = jwt.sign(payload, config.jwtSecret, {
		expiresIn: '1d',
	});

	return { token };
};
