import { Router } from 'express'

import { upload } from '../../config/multer'
import { TrackController } from './controller'
import { isAuthtenticate } from '../../middlewares/isAuthtenticate.middleware'
import { isAdmin } from '../../middlewares/isAdmin.middleware'
export class TrackRoutes {
	private router: Router = Router()
	private controller = new TrackController()

	getRoutes(): Router {
		this.router
			.use(isAuthtenticate)
			.use(
				upload.fields([
					{ name: 'track', maxCount: 1 },
					{ name: 'cover', maxCount: 1 },
				])
			)
			.post('/', this.controller.createItem)
		this.router
			.use(
				upload.fields([
					{ name: 'track', maxCount: 1 },
					{ name: 'cover', maxCount: 1 },
				])
			)
			.use(isAuthtenticate)
			.post('/', this.controller.updateItems)
		this.router.get('/', this.controller.getItems)
		this.router.get('/:id', this.controller.getItem)
		this.router.patch('/:id', [isAuthtenticate], this.controller.updateItems)
		this.router.delete('/:id', [isAuthtenticate], this.controller.deleteItems)
		this.router.patch(
			'/published/:id',
			[isAuthtenticate, isAdmin],
			this.controller.publishItem
		)

		return this.router
	}
}
