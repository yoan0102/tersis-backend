import { Request, response, Response } from 'express'
import { responseJson, saveImage, saveTrack } from '../../utils'
import { TrackModel } from './models/track.schema'
import { File } from './interfaces/files.interface'
import { TrackDTOCreate } from './dto'

export class TrackController {
	async getItems(req: Request, res: Response) {
		const tracks = await TrackModel.find({})
		return responseJson(res, 200, tracks)
	}

	async getItem(req: Request, res: Response) {
		const id = req.params.id
		const track = await TrackModel.findById(id).where({ published: true })
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
			artitCNames: req.body.artistCName.split(','),
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

		const newPathTrack = saveTrack(files['track'][0])

		if (!newPathTrack) {
			const error: ErrorCustom = new Error('Track is required')
			error.status = 400
			throw error
		} else {
			track.cover = newPathTrack
		}

		if (files['cover'][0] === undefined) {
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
	//!TODO: Crear el update
	async updateItems(req: Request, res: Response) {
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
		const data = await TrackModel.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		})
	}

	async deleteItems(req: Request, res: Response) {
		const data = await TrackModel.findByIdAndDelete(req.params.id)
		if (!data) {
			const error: ErrorCustom = new Error('Track not found')
			error.status = 404
			throw error
		}
		return res.sendStatus(204).send('Track Deleted')
	}
}
