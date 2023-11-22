import { Router } from 'express'

import { upload } from '../../config/multer'
import { TrackController } from './controller'
import { isAuthtenticate } from '../../middlewares/isAuthtenticate.middleware'
import { isAdmin } from '../../middlewares/isAdmin.middleware'
import validate from '../../middlewares/validate.middleware'
import CreateTrackSchema from './models/track.validation'
export class TrackRoutes {
	private router: Router = Router()
	private controller = new TrackController()

	getRoutes(): Router {
		this.router
			.use(
				upload.fields([
					{ name: 'track', maxCount: 1 },
					{ name: 'cover', maxCount: 1 },
				])
			)
			.post('/', [isAuthtenticate], this.controller.createItem)
		this.router
			.use(
				upload.fields([
					{ name: 'track', maxCount: 1 },
					{ name: 'cover', maxCount: 1 },
				])
			)

			.put('/', [isAuthtenticate], this.controller.updateItems)
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
