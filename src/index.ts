import config from './config'
import connectDB from './config/database/mongo'

import app from './app'
import fs from 'node:fs'

if (!fs.readdirSync('uploads')) {
	console.log('se creo el uploads')
	fs.mkdirSync('uploads')
}

async function bootstrap() {
	try {
		await connectDB()
		app.listen(config.port, () => {
			console.log(`Server runningon port ${3000}🦾🦾🦾🚀🚀`)
		})
	} catch (error) {
		console.log(error)
	}
}

bootstrap()
