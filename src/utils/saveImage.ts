import fs from 'node:fs'

export const saveImage = (file: any) => {
	const newPath = `./uploads/images/${new Date()
		.toLocaleDateString('en-US')
		.split('/')
		.join('_')}_${file.originalname}`
	fs.renameSync(file.path, newPath)
	return newPath
}
