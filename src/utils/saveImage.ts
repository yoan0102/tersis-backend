import fs from 'node:fs'
import config from '../config'

export const saveImage = (file: any) => {
	const name = file.originalname.split(' ').join('_').split('-').join('_')
	const newPath = `./uploads/images/${new Date()
		.toLocaleDateString('en-US')
		.split('/')
		.join('_')}_${name}`
	fs.renameSync(file.path, newPath)
	const extension = file.originalname.split('.').pop()
	const uriImage = newPath.split('.')[1]
	return config.publicUrl + uriImage + '.' + extension
}
