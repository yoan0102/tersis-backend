import { Request, Response, NextFunction } from 'express';
export const notFound = (req: Request, resp: Response, next: NextFunction) =>
	resp.status(404).json({ error: 'Resource not Found' });
