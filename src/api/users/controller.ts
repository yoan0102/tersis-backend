import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { Model } from 'mongoose'
import jwt from 'jsonwebtoken'

import { User } from './models/user.interface'
import config from '../../config'
import { UserModel } from './models/user.schema'
import { UserDTOLogin, UserDTORegister } from './dto'
import { generateRefreshToken, generateToken } from '../../utils/generateToken'

export class UserController {
	async login(req: Request, res: Response) {
		const userDto = new UserDTOLogin(req.body)
		const user = await UserModel.findOne({ email: userDto.email })

		// if (!user) return res.status(400).json({ error: 'User not exist' });
		if (!user) {
			const error: ErrorCustom = new Error('User not Exist')
			error.status = 400
			throw error
		}

		const validatePassword = await bcrypt.compare(
			userDto.password,
			user.password
		)
		if (!validatePassword)
			return res.status(400).json({ error: 'Password is not valid' })

		const token = generateToken({
			id: user.id,
		})
		const { refreshToken, expiresIn } = generateRefreshToken({
			id: user.id,
		})
		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			// secure: !(config.modo === 'developer'),
			expires: new Date(Date.now() + expiresIn * 1000),
		})
		return res.json({ user, token })
	}
	async register(req: Request, res: Response) {
		const userDto = new UserDTORegister(req.body)

		const user = await UserModel.create(userDto)
		const token = generateToken({
			id: user.id,
		})
		const { refreshToken, expiresIn } = generateRefreshToken({
			id: user.id,
		})

		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			secure: !(config.modo === 'developer'),
			expires: new Date(Date.now() + expiresIn * 1000),
		})

		res.json({ ok: true, user, token })
	}

	async profile(req: Request, res: Response) {
		const { id } = req.user
		const user = await UserModel.findById(id).lean()
		if (!user)
			return res.status(403).json({ error: 'Forbidden not authorization' })
		res.json({ ok: true, user })
	}

	async refreshToken(req: Request, res: Response) {
		const refreshToken = req.cookies.refreshToken

		if (!refreshToken) {
			const error: ErrorCustom = new Error('Should exists token Bearer')
			error.status = 400
			throw error
		}
		const payload = jwt.verify(refreshToken, config.jwtSecretRefresh)
		if (!payload) {
			const error: ErrorCustom = new Error('JWT expire')
			error.status = 401
			throw error
		}

		const token = generateToken(payload)
		return res.json({ ok: true, token })
	}

	async logout(req: Request, res: Response) {
		res.clearCookie('refreshToken')
		res.json({ ok: true })
	}
}
