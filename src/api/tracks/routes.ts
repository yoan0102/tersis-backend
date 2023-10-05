import { Router } from 'express'

import { upload } from '../../config/multer'
import { TrackController } from './controller'
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
			.post('/', this.controller.createItem)
		this.router.get('/', this.controller.getItems)

		return this.router
	}
}
