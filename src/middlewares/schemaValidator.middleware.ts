import { NextFunction, Request, Response } from 'express'
import { AnyZodObject, ZodError } from 'zod'

export const schemaValitation =
	(schema: AnyZodObject) =>
	(req: Request, res: Response, next: NextFunction) => {
		try {
			schema.parse({
				body: req.body,
				query: req.query,
				params: req.params,
			})
			next()
		} catch (error) {
			if (error instanceof ZodError) {
				return res.status(400).json(
					error.issues.map((issue) => ({
						path: issue.path,
						message: issue.message,
					}))
				)
			}
		}
	}
