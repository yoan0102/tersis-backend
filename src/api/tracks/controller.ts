import { Request, response, Response } from 'express'
import { responseJson, saveImage, saveTrack } from '../../utils'
import { TrackModel } from './models/track.schema'
import { File } from './interfaces/files.interface'
import { TrackDTOCreate, TrackDTOUpdate } from './dto'

export class TrackController {
	async getItems(req: Request, res: Response) {
		const tracks = await TrackModel.find({ published: true, isActive: true })
		return responseJson(res, 200, tracks)
	}

	async getItemsAll(req: Request, res: Response) {
		const tracks = await TrackModel.find({ isActive: true })
		return responseJson(res, 200, tracks)
	}

	async getItem(req: Request, res: Response) {
		const id = req.params.id
		const track = await TrackModel.find({ id, published: true, isActive: true })
		if (!track) {
			const error: ErrorCustom = new Error('Track not Found')
			error.status = 404
			throw error
		}
		return responseJson(res, 200, track)
	}

	async createItem(req: Request, res: Response) {
		const files = req.files as { [fieldname: string]: File[] }
		if (!req.files) {
			const error: ErrorCustom = new Error('Track and Cover  is required')
			error.status = 400
			throw error
		}

		const track = new TrackDTOCreate({
			name: req.body.name,
			album: { name: req.body.album },
			artist: {
				name: req.body.artistName,
				nationality: req.body.nationality,
				nickname: req.body.nickname,
			},
			artitCNames: req.body.artistCName,
			duration: {
				start: Number(req.body.durationStart),
				end: Number(req.body.durationEnd),
			},
			gender: { name: req.body.gender },
			release_date: new Date(req.body.release_date),
			user_id: req.body.userId,
			cover: '',
			url: '',
		})

		if (!files['track']) {
			const error: ErrorCustom = new Error('Track is required')
			error.status = 400
			throw error
		}

		const newPathTrack = saveTrack(files['track'][0])
		track.url = newPathTrack

		if (!files['cover']) {
			track.cover = ''
		} else {
			const newPathCover = saveImage(files['cover'][0])
			track.cover = newPathCover
		}

		const trackCreated = await TrackModel.create(track)

		return res.status(201).json({
			data: trackCreated,
			error: false,
		})
	}

	async updateItems(req: Request, res: Response) {
		const id = req.params.id

		const files = req.files as { [fieldname: string]: File[] }

		const trackDb = await TrackModel.findById(id)

		if (!trackDb) {
			const error: ErrorCustom = new Error('Track not found')
			error.status = 404
			throw error
		}

		const trackDto = new TrackDTOUpdate(req.body)

		if (files) {
			const newPathTrack = saveTrack(files['track'][0])
			trackDto.url = newPathTrack
			const newPathCover = saveImage(files['cover'][0])
			trackDto.cover = newPathCover
		}

		const track = await TrackModel.findByIdAndUpdate(req.params.id, trackDto, {
			new: true,
		})

		return res.json({
			ok: true,
			data: {
				track,
			},
			error: false,
		})
	}

	async deleteItems(req: Request, res: Response) {
		const data = await TrackModel.findByIdAndUpdate(req.params.id, {
			isActive: false,
		})
		if (!data) {
			const error: ErrorCustom = new Error('Track not found')
			error.status = 404
			throw error
		}

		return res.sendStatus(204).send('Track Deleted')
	}

	async publishItem(req: Request, res: Response) {
		const id = req.params.id
		const published = req.body.isPublished

		const trackDb = await TrackModel.find({ id, isActive: true })

		if (!trackDb) {
			const error: ErrorCustom = new Error('Track not found')
			error.status = 404
			throw error
		}

		const track = await TrackModel.findByIdAndUpdate(
			id,
			{ published },
			{ new: true }
		)
		if (!track) {
			const error: ErrorCustom = new Error('Track not published')
			error.status = 404
			throw error
		}

		return res.json({
			ok: true,
			data: {
				track,
			},
			error: false,
		})
	}
}
