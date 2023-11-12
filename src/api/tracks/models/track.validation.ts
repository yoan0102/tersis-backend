import { ObjectId } from 'mongodb'

import { z } from 'zod'

const userId = z.custom<ObjectId>().transform((value) => new ObjectId(value))
type userId = z.infer<typeof userId>
const CreateTrackSchema = z.object({
	body: z.object({
		name: z.string(),
		album: z.string(),
		rating: z.number().int().nonnegative().max(5).optional(),
		artitCNames: z.array(z.string()),
		published: z.boolean().optional(),
		release_date: z.string(),
		gender: z.string(),
		user_id: userId,
		artist: z.object({
			name: z.string(),
			nationality: z.string(),
			nickname: z.string(),
		}),
		duration: z.object({
			start: z.number().nonnegative(),
			end: z.number().nonnegative(),
		}),
	}),
})

export default CreateTrackSchema
