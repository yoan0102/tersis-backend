import fs from 'node:fs'
import config from '..//config'

export const saveTrack = (file: any) => {
	const name = file.originalname.split(' ').join('_')
	const newPath = `./uploads/tracks/${new Date()
		.toLocaleDateString('en-US')
		.split('/')
		.join('_')}_${name}`
	fs.renameSync(file.path, newPath)
	const extension = file.originalname.split('.').pop()
	const uriTrack = newPath.split('.')[1]
	return config.publicUrl + uriTrack + '.' + extension
}
