import { NextFunction, Request, Response } from 'express'
import { UserModel } from '../api/users/models/user.schema'

export const isAdmin = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const id = req.user.id
	const user = await UserModel.findById(id)
	console.log({ user })
	if (!user) {
		const error: ErrorCustom = new Error('User not found')
		error.status = 404
		throw error
	}

	if (user.role !== 'Admin') {
		const error: ErrorCustom = new Error('User unauthorized')
		error.status = 401
		throw error
	}

	next()
}
