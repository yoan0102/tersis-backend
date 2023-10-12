import express, { Application, Response } from 'express'
import cors from 'cors'
import 'express-async-errors'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import helmet from 'helmet'

import { notFound } from './middlewares/notFound.middleware'
import { errorHandler } from './middlewares/errorHandler.middleware'
import { UserRoutes } from './api/users'
import { TrackRoutes } from './api/tracks'
import config from './config'

const app: Application = express()

const WHITE_LIST = [config.origin]

app.use(
	cors()
	// cors({
	// 	origin: function (origin, cab) {
	// 		if (WHITE_LIST.includes(origin)) {
	// 			return cab(null, origin)
	// 		}
	// 		return cab(
	// 			new Error('Error de CORS origin: ' + origin + 'not authtorization')
	// 		)
	// 	},
	// 	credentials: true,
	// })
)

app.use('/uploads', express.static('uploads'))
app.use(cookieParser())
app.use(compression())
app.use(express.json())
app.use(helmet())
app.use('/api/v1/tracks', new TrackRoutes().getRoutes())
app.use('/api/v1/users', new UserRoutes().getRoutes())

app.use(notFound)
app.use(errorHandler)

export default app
