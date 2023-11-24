import { ObjectId } from 'mongoose'
export interface Track {
	name: string
	album: Album
	cover: string
	url: string
	rating?: number
	artitCNames: Array<string>
	published?: boolean
	release_date: Date
	gender: Gender
	user_id: ObjectId
	artist: Artist
	duration: Duration
	isActive?: boolean
}

export interface Album {
	id?: string
	name: string
}

export interface Gender {
	id?: string
	name: string
}

export interface Artist {
	name: string
	nickname: string
	nationality: string
}

export interface Duration {
	start: number
	end: number
}
