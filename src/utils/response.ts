import { Response } from 'express'

export default function responseJson(
	res: Response,
	statusCode: number,
	payload: any
) {
	res.status(statusCode).json({
		error: false,
		data: payload,
	})
}
