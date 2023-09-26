import express, { Application } from 'express'
import cors from 'cors'
import 'express-async-errors'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import helmet from 'helmet'

import { notFound } from './middlewares/notFound.middleware'
import { errorHandler } from './middlewares/errorHandler.middleware'
import { UserRoutes } from './api/users'
import { TrackRoutes } from './api/tracks'

const app: Application = express()

const WHITE_LIST = [process.env.ORIGIN]

app.use(
	cors({
		origin: function (origin, cab) {
			if (WHITE_LIST.includes(origin)) {
				return cab(null, origin)
			}

			return cab(
				new Error('Error de CORS origin: ' + origin + 'not authtorization')
			)
		},
	})
)

app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/users', new UserRoutes().getRoutes())
app.use('/api/v1/tracks', new TrackRoutes().getRoutes())

app.use(notFound)
app.use(errorHandler)

export default app
