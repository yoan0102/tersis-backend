import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { User } from './models/user.interface';
import { UserModel } from './models/user.schema';
import { UserDTOLogin, UserDTORegister } from './dto';

export class UserController {
	private model: Model<User>;

	constructor() {
		this.model = UserModel;
	}

	async login(req: Request, res: Response) {
		const userDto = new UserDTOLogin(req.body);
		const user = await UserModel.findOne({ email: userDto.email });
		if (!user) return res.status(400).json({ error: 'User not exist' });
		res.json({ ok: true, user });
	}
	async register(req: Request, res: Response) {
		const userDto = new UserDTORegister(req.body);

		const user = await UserModel.create(userDto);
		res.json({ ok: true, user });
	}
}
