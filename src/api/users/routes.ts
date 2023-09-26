import { Router } from 'express'
import { UserController } from './controller'
import { isAuthtenticate } from '../../middlewares/isAuthtenticate.middleware'

export class UserRoutes {
	private router: Router = Router()
	private controller = new UserController()

	constructor() {}

	getRoutes(): Router {
		this.router.post('/login', this.controller.login)
		this.router.post('/register', this.controller.register)
		this.router.get('/profile', [isAuthtenticate], this.controller.profile)
		this.router.get('/refresh', this.controller.refreshToken)
		this.router.get('/logout', this.controller.logout)

		return this.router
	}
}
