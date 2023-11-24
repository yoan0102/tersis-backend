import mongoose, { Schema } from 'mongoose'

import { Album, Artist, Gender, Track } from './track.interface'

const TrackSchema = new mongoose.Schema<Track>(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
		},
		album: new Schema<Album>({
			name: {
				type: String,
				required: true,
			},
		}),
		artist: new Schema<Artist>({
			name: {
				type: String,
				required: true,
			},
			nationality: {
				type: String,
			},
			nickname: {
				type: String,
			},
		}),
		artitCNames: [String],
		cover: {
			type: String,
		},
		duration: {
			start: {
				type: Number,
				required: true,
			},
			end: {
				type: Number,
				required: true,
			},
		},
		gender: new Schema<Gender>({
			name: {
				type: String,
			},
		}),
		published: {
			type: Boolean,
			default: false,
		},
		rating: {
			type: Number,
			default: 0,
		},
		release_date: {
			type: Date,
		},
		url: {
			type: String,
			required: true,
		},
		user_id: {
			type: Schema.Types.ObjectId,
			ref: 'User',
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

// UserSchema.methods.toJSON = function () {
// 	const user = this.toObject()
// 	delete user.password
// 	return user
// }

export const TrackModel = mongoose.model<Track>('Track', TrackSchema)
