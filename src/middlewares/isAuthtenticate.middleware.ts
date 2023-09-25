import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
export const isAuthtenticate = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const autorization = req.headers?.authorization;
	if (!autorization) {
		const error: ErrorCustom = new Error('Should exists token Bearer');
		error.status = 400;
		throw error;
	}
	const token = autorization.split(' ')[1];
	const payload = jwt.verify(token, config.jwtSecret);
	req.user = payload;
	next();
};
