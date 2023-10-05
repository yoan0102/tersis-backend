import fs from 'node:fs'

export const saveTrack = (file: any) => {
	const newPath = `./uploads/tracks/${new Date()
		.toLocaleDateString('en-US')
		.split('/')
		.join('_')}_${file.originalname}`
	fs.renameSync(file.path, newPath)

	return newPath
}
