import { Router } from 'express'

import { upload } from '../../config/multer'
import { TrackController } from './controller'
export class TrackRoutes {
	private router: Router = Router()
	private controller = new TrackController()

	getRoutes(): Router {
		this.router
			.use(upload.single('track'))
			.route('/')
			.post(this.controller.create)

		return this.router
	}
}
