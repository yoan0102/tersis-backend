import { ObjectId } from 'mongoose'
import {
	Album,
	Artist,
	Duration,
	Gender,
	Track,
} from './models/track.interface'

export class TrackDTOCreate {
	public name: string
	public album: Album
	public artist: Artist
	public artitCNames: string[]
	public cover: string
	public duration: Duration
	public gender: Gender
	public release_date: Date
	public url: string
	public user_id: ObjectId
	constructor({
		name,
		album,
		artist,
		artitCNames,
		cover,
		duration,
		gender,
		release_date,
		url,
		user_id,
	}: Track) {
		this.name = name
		this.album = album
		this.artist = artist
		this.artitCNames = artitCNames
		this.cover = cover
		this.duration = duration
		this.gender = gender
		this.release_date = release_date
		this.url = url
		this.user_id = user_id
	}
}

// export class UserDTOLogin {
// 	email: string
// 	password: string

// 	constructor({ email, password }: { email: string; password: string }) {
// 		this.email = email
// 		this.password = password
// 	}
// }
