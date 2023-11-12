import type { ZodError, ZodSchema } from 'zod'
import { NextFunction, Request, Response } from 'express'

const validate =
	(schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
		console.log(req.body)
		try {
			schema.parse({
				body: req.body,
				query: req.query,
				params: req.params,
			})

			next()
		} catch (err: any) {
			return res.status(400).send(err.errors)
		}
	}

export default validate
