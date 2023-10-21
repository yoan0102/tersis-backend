import { Request } from 'express'

declare global {
	namespace Express {
		export interface Request extends Request {
			user: JwtPayload
		}
	}
	export interface ErrorCustom extends Error {
		status?: number
		message: string
	}
}
