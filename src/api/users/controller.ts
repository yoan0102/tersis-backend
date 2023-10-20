import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import config from '../../config'
import { UserModel } from './models/user.schema'
import { UserDTOLogin, UserDTORegister } from './dto'
import { generateRefreshToken, generateToken } from '../../utils/generateToken'

export class UserController {
	async getAll(req: Request, res: Response) {
		const users = await UserModel.find({})
		return res.json({
			ok: true,
			error: false,
			data: users,
		})
	}
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
		const refreshToken = generateRefreshToken({
			id: user.id,
		})

		return res.json({
			ok: true,
			error: false,
			data: {
				user,
				token,
				refreshToken,
			},
		})
	}
	async register(req: Request, res: Response) {
		const userDto = new UserDTORegister(req.body)

		const user = await UserModel.create(userDto)
		const token = generateToken({
			id: user.id,
		})
		const refresToken = generateRefreshToken({
			id: user.id,
		})

		res.json({
			ok: true,
			error: false,
			data: { user, token, refresToken },
		})
	}

	async profile(req: Request, res: Response) {
		const { id } = req.params
		const user = await UserModel.findById(id).lean()
		if (!user)
			return res.status(403).json({ error: 'Forbidden not authorization' })
		res.json({
			ok: true,
			data: {
				user,
			},
		})
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
		return res.json({
			ok: true,
			data: {
				token,
			},
		})
	}

	async favoriteUpdate(req: Request, res: Response) {
		const id = req.params.id
		const userDb = await UserModel.findById(id)
		if (!userDb) {
			const error: ErrorCustom = new Error('User not found')
			error.status = 404
			throw error
		}
		const user = await UserModel.findByIdAndUpdate(
			id,
			{ favorites: [...userDb.favorites, req.body.favorites] },
			{ new: true }
		)

		return res.json({
			ok: true,
			data: {
				user,
			},
			error: false,
		})
	}
}
