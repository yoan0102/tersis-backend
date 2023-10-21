import express, { Router } from 'express'
import supertest from 'supertest'

function testServer(Route: any) {
	const app = express()
	const route = new Route()
	route.getRoutes(app)
	return supertest(app)
}
export default testServer
