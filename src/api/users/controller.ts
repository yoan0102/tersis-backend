import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { Model } from 'mongoose';

import { User } from './models/user.interface';
import { UserModel } from './models/user.schema';
import { UserDTOLogin, UserDTORegister } from './dto';
import { generateToken } from '../../utils/generateToken';

export class UserController {
	private model: Model<User>;

	constructor() {
		this.model = UserModel;
	}

	async login(req: Request, res: Response) {
		const userDto = new UserDTOLogin(req.body);
		const user = await UserModel.findOne({ email: userDto.email });

		if (!user) return res.status(400).json({ error: 'User not exist' });

		const validatePassword = await bcrypt.compare(
			userDto.password,
			user.password
		);
		if (!validatePassword)
			return res.status(400).json({ error: 'Password is not valid' });

		const token = generateToken({
			id: user.id,
		});

		return res.json({ ok: true, user, token });
	}
	async register(req: Request, res: Response) {
		const userDto = new UserDTORegister(req.body);

		const user = await UserModel.create(userDto);
		res.json({ ok: true, user });
	}

	async profile(req: Request, res: Response) {
		const { id } = req.user;
		const user = await UserModel.findById(id).lean();
		if (!user)
			return res.status(403).json({ error: 'Forbidden not authorization' });
		res.json({ ok: true, user });
	}
}
