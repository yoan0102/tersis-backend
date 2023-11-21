import mongoose from 'mongoose'
import config from '../config'
import { UserModel } from '../api/users/models/user.schema'
import { UserDTORegister } from '../api/users/dto'

async function createSuperUser() {
	await mongoose.connect(config.mongoUri || '')
	const userDto = new UserDTORegister({
		name: 'Admin',
		email: 'admin@admin.com',
		password: 'admin',
		favorites: [],
		role: 'Admin',
	})
	UserModel.create(userDto)
		.then(() => {
			console.log('Admin creted')
		})
		.catch((error) => {
			console.log(error)
			console.log('Seed executed')
		})
		.finally(() => {
			mongoose.connection.close()
		})
}

createSuperUser()
