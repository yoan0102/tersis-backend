import { UserModel } from '../api/users/models/user.schema'
import { UserDTORegister } from '../api/users/dto'

const userDto = new UserDTORegister({
	name: 'Admin',
	email: 'admin@admin.com',
	password: 'admin',
	favorites: [],
	role: 'Admin',
})
async function createSuperUser() {
	await UserModel.create(userDto)
}

export default createSuperUser
