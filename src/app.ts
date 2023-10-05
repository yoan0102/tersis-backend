import express, { Application, Response } from 'express'
console.log('dirname', __dirname)
import cors from 'cors'
import 'express-async-errors'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import helmet from 'helmet'
import pino from 'pino-http'

import { notFound } from './middlewares/notFound.middleware'
import { errorHandler } from './middlewares/errorHandler.middleware'
import { UserRoutes } from './api/users'
import { TrackRoutes } from './api/tracks'
import config from './config'

const app: Application = express()

const WHITE_LIST = [config.origin, '*']

// app.use(
// 	cors({
// 		origin: function (origin, cab) {
// 			if (WHITE_LIST.includes(origin)) {
// 				return cab(null, origin)
// 			}

// 			return cab(
// 				new Error('Error de CORS origin: ' + origin + 'not authtorization')
// 			)
// 		},
// 		credentials: true,
// 	})
// )

// app.use(cors())

// app.use(pino())
app.use(cookieParser())
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.static(__dirname + 'uploads'))
app.get('/cookie', (req, res: Response) => {
	console.log('Llego la peticion')
	res.cookie('12', '12').send('cookie')
})

app.use('/api/v1/tracks', new TrackRoutes().getRoutes())
app.use('/api/v1/users', new UserRoutes().getRoutes())

app.use(notFound)
app.use(errorHandler)

export default app
