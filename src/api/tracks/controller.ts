import { Request, Response } from 'express'
import { Model } from 'mongoose'

import { Track } from './models/track.interface'
import { saveImage } from '../../utils/saveImage'

export class TrackController {
	// private model: Model<Track>

	constructor() {}

	async create(req: Request, res: Response) {
		console.log(req.file)
		saveImage(req.file)
		res.send('Crack')
	}
}
