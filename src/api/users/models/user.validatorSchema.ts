import { z } from 'zod'
import { ObjectId } from 'mongodb'

export const createUserSchema = z.object({
	body: z.object({
		name: z.string().trim().min(1),
		email: z.string().trim(),
		password: z.string().trim().min(6),
	}),
})

export const updateUserSchema = z.object({
	body: z.object({
		name: z.string().trim().min(1).optional(),
		email: z.string().trim().optional(),
		password: z.string().trim().min(6).optional(),
		favorites: z.instanceof(ObjectId),
	}),
	params: z.object({
		id: z.string().min(3).trim(),
	}),
})

export type CreateUserType = z.infer<typeof createUserSchema>['body']
export type UpdateUserBodyType = z.infer<typeof updateUserSchema>['body']
export type UpdateUserParamsType = z.infer<typeof updateUserSchema>['params']
