import { Router } from 'express'
import { UserController } from './controller'
import { isAuthtenticate } from '../../middlewares/isAuthtenticate.middleware'

import { schemaValitation } from '../../middlewares/schemaValidator.middleware'

export class UserRoutes {
	private router: Router = Router()
	private controller = new UserController()

	constructor() {}

	getRoutes(): Router {
		this.router.post('/login', this.controller.login)
		this.router.post(
			'/register',

			this.controller.register
		)
		this.router.patch('/favorites/:id', this.controller.favoriteUpdate)
		this.router.get('/all', this.controller.getAll)
		this.router.get('/profile/:id', this.controller.profile)
		this.router.get('/refresh', this.controller.refreshToken)

		return this.router
	}
}
