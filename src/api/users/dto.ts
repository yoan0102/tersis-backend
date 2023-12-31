import { User } from './models/user.interface'

export class UserDTORegister {
	name: string
	email: string
	password: string
	role?: 'Admin' | 'User'
	constructor({ name, email, password, role }: User) {
		this.name = name
		this.email = email
		this.password = password
		this.role = role || 'User'
	}
}

export class UserDTOLogin {
	email: string
	password: string

	constructor({ email, password }: { email: string; password: string }) {
		this.email = email
		this.password = password
	}
}

export class UserDTOUpdate {
	email?: string
	password?: string
	name?: string
	role?: string

	constructor({
		email,
		password,
		name,
		role,
	}: {
		email: string
		password: string
		name: string
		role: string
	}) {
		this.email = email
		this.password = password
		this.name = name
		this.role = role
	}
}
