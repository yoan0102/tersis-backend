import fs from 'node:fs'

export const saveImage = (file: any) => {
	const newPath = `./uploads/images/${file.originalname}`
	fs.renameSync(file.path, newPath)
	return newPath
}
