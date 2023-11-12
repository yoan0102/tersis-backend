import { Router } from 'express'
import { UserController } from './controller'
import { isAuthtenticate } from '../../middlewares/isAuthtenticate.middleware'
import { isAdmin } from '../../middlewares/isAdmin.middleware'

export class UserRoutes {
	private router: Router = Router()
	private controller = new UserController()

	constructor() {}

	getRoutes(): Router {
		this.router.post('/login', this.controller.login)
		this.router.post('/register', this.controller.register)
		this.router.get('/', [isAuthtenticate, isAdmin], this.controller.getAll)
		this.router.get('/:id', [isAuthtenticate], this.controller.profile)
		this.router.patch('/:id', [isAuthtenticate], this.controller.update)
		this.router.delete('/:id', [isAuthtenticate], this.controller.destroy)
		this.router.patch(
			'/favorites/:id',
			[isAuthtenticate],
			this.controller.favoriteUpdate
		)

		this.router.get('/refresh', this.controller.refreshToken)

		this.router.get(
			'/favorites/:id',
			[isAuthtenticate],
			this.controller.favorites
		)

		return this.router
	}
}
