import { Request, response, Response } from 'express'
import { Model } from 'mongoose'
import { responseJson, saveImage, saveTrack } from '../../utils'
import { Album, Track } from './models/track.interface'
import { TrackModel } from './models/track.schema'
import { File } from './interfaces/files.interface'
import { TrackDTOCreate } from './dto'

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
		const files = req.files as { [fieldname: string]: File[] }
		if (!req.files) {
			const error: ErrorCustom = new Error('Track and Cover  is required')
			error.status = 400
			throw error
		}
		const newPathTrack = saveTrack(files['track'][0])
		const newPathCover = saveImage(files['cover'][0])

		const track = new TrackDTOCreate({
			name: req.body.name,
			album: { name: req.body.album },
			artist: {
				name: req.body.artistName,
				nationality: req.body.nationality,
				nickname: req.body.nickname,
			},
			artitCNames: req.body.artistCName.split(','),
			duration: {
				start: Number(req.body.durationStart),
				end: Number(req.body.durationEnd),
			},
			gender: { name: req.body.gender },
			release_date: new Date(req.body.release_date),
			user_id: req.body.userId,
			cover: newPathCover,
			url: newPathTrack,
		})
		// console.log('Track', track)
		const trackCreated = new TrackModel(track)
		trackCreated.save()

		return res.status(201).json({
			data: trackCreated,
			error: false,
		})
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
