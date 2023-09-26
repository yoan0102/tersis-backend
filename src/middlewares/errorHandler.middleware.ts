import { Request, Response, NextFunction } from 'express'

export const errorHandler = (
	err: ErrorCustom,
	req: Request,
	resp: Response,
	next: NextFunction
) => {
	const httpStatus = err.status || 500
	resp.status(httpStatus).json({ error: err.message || 'Internal Error' })
}
