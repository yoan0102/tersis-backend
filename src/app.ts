import express, { Application, Response } from 'express'
import cors from 'cors'
import 'express-async-errors'
import compression from 'compression'
import helmet from 'helmet'

import { notFound } from './middlewares/notFound.middleware'
import { errorHandler } from './middlewares/errorHandler.middleware'
import { UserRoutes } from './api/users'
import { TrackRoutes } from './api/tracks'
import config from './config'

const app: Application = express()

app.use(
	cors({
		origin: config.origin,
	})
)

app.use('/uploads', express.static('uploads'))

app.use(compression())
app.use(express.json())
app.use(helmet())

app.use('/api/v1/tracks', new TrackRoutes().getRoutes())
app.use('/api/v1/users', new UserRoutes().getRoutes())

app.use(notFound)
app.use(errorHandler)

export default app
