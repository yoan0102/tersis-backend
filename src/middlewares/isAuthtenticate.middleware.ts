import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../config'
import { UserModel } from '../api/users/models/user.schema'

export const isAuthtenticate = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const autorization = req.headers?.authorization
	if (!autorization) {
		const error: ErrorCustom = new Error('Should exists token Bearer')
		error.status = 400
		throw error
	}

	const token = autorization.split(' ')[1]
	if (!token) {
		const error: ErrorCustom = new Error('Should exists token Bearer')
		error.status = 400
		throw error
	}

	const payload = jwt.verify(token, config.jwtSecret)
	req.user = payload

	next()
}
