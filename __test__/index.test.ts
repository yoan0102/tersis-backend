import { describe, it, expect } from 'vitest'
import supertest from 'supertest'
import app from '../src/app'

const request = supertest(app)

describe('http', () => {
	it('tracks', () => {
		// request.get()

		expect(4).toBe(4)
	})
})
