import fs from 'node:fs'

export const saveTrack = (file: any) => {
	const newPath = `./uploads/images/${file.originalname}`
	fs.renameSync(file.path, newPath)

	return newPath
}
