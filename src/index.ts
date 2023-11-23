import config from './config'
import connectDB from './config/database/mongo'

import app from './app'
import fs from 'node:fs'

fs.mkdirSync('uploads/images/')
fs.mkdirSync('uploads/tracks/')

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
