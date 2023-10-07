import jwt from 'jsonwebtoken'
import config from '../config'

export const generateToken = (payload: { id: string }) => {
	const expiresIn: number = 60 * 60 * 24
	const token = jwt.sign({ id: payload.id }, config.jwtSecret, {
		expiresIn,
	})

	return { token, expiresIn }
}

export const generateRefreshToken = (payload: any) => {
	const expiresIn: number = 60 * 60 * 24 * 30
	const refreshToken = jwt.sign(payload, config.jwtSecretRefresh, {
		expiresIn,
	})
	return { refreshToken, expiresIn }
}
