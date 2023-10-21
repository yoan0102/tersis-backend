import { describe, it, expect } from 'vitest'

import request from 'supertest'
import app from '../../app'

describe('[routes / tracks]', () => {
	it('should return a response with status 200', async () => {
		//Arrange
		const expected = 200
		//Act
		const { status: result } = await request(app).get('/api/v1/tracks')

		//Assert
		expect(result).toEqual(expected)
	})
	// it('should return a response all tracks', () => {})
})
