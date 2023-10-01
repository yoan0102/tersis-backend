import { Request, response, Response } from 'express'
import { Model } from 'mongoose'
import { responseJson } from '../../utils'
import { Track } from './models/track.interface'
import { saveImage } from '../../utils/saveImage'
import { TrackModel } from './models/track.schema'

export class TrackController {
	private model: Model<Track>

	constructor() {
		this.model = TrackModel
	}

	async getItems(req: Request, res: Response) {
		const tracks = await this.model.find({})
		return responseJson(res, 200, tracks)
	}

	async getItem(req: Request, res: Response) {
		const id = req.params.id
		const track = await this.model.findById(id)
		return responseJson(res, 200, track)
	}

	async createItem(req: Request, res: Response) {
		console.log(req.file)
		const newPath = saveImage(req.file)
		res.send('Crack')
	}

	async updateItems(req: Request, res: Response) {
		const data = await this.model.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		})
	}

	async deleteItems(req: Request, res: Response) {
		const data = await this.model.findByIdAndUpdate(req.params.id, {
			isActivate: false,
		})
		if (!data) {
			const error: ErrorCustom = new Error('Track not found')
			error.status = 404
			throw error
		}
		return res.status(204)
	}
}
