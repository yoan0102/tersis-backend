import { Router, Request, Response } from 'express';
import { UserController } from './controller';

export class UserRoutes {
	private router: Router = Router();
	private controller = new UserController();

	constructor() {}

	getRoutes(): Router {
		this.router.post('/login', this.controller.login);
		this.router.post('/register', this.controller.register);
		return this.router;
	}
}
