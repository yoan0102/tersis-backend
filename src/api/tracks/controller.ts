import { Model } from 'mongoose'
import { Track } from './models/track.interface'
import { Request, Response } from 'express'

export class TrackController {
	private model: Model<Track>

	constructor() {}

	async create(req: Request, res: Response) {}
}
