import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

import { User } from './user.interface'

const UserSchema = new mongoose.Schema<User>(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
			trim: true,
		},
		favorites: [mongoose.Types.ObjectId],
		role: {
			type: String,
			enum: ['Admin', 'User'],
			default: `User`,
			trim: true,
		},
		isActive: {
			type: Boolean,
			default: true,
		},
	},
	{
		versionKey: false,
		timestamps: true,
	}
)

UserSchema.methods.toJSON = function () {
	const user = this.toObject()
	delete user.password
	return user
}

UserSchema.pre('save', async function (next): Promise<void> {
	try {
		if (!this.isModified('password')) {
			return next()
		}
		const hashPassword = await bcrypt.hash(this.password, 10)
		this.password = hashPassword
		next()
	} catch (error) {
		throw new Error('Error in hash password')
	}
})

export const UserModel = mongoose.model<User>('User', UserSchema)
