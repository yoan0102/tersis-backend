export interface Track {
	name: string
	album: Album
	cover: string
	url: string
	rating: number
	artitCNames: Array<string>
	published: boolean
	release_date: Date
	gender: Gender
	user_id: string
	artist: Artist
	duration: Duration
}

export interface Album {
	id: string
	name: string
	tracks: Array<string>
}

export interface Gender {
	id: string
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
