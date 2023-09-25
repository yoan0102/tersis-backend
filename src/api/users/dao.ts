import { Model } from 'mongoose';
import { User } from './models/user.interface';
import { UserModel } from './models/user.schema';

class UserDAO {
	private model: Model<User>;

	constructor() {
		this.model = UserModel;
	}
}
