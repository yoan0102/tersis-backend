export interface User {
	name: string
	email: string
	password: string
	role?: 'Admin' | 'User'
	favorites: []
	isActive?: boolean
}
