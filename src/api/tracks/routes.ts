import { Router } from 'express'

export class TrackRoutes {
	private router: Router = Router()
	// private controller -

	getRoutes(): Router {
		this.router.route('/').post((req, res) => {
			return res.send('crerar track')
		})

		return this.router
	}
}
