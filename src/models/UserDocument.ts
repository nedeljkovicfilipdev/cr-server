import mongoose, { Document } from 'mongoose';

export interface UserDocument extends Document {
    username: string,
	name: string;
	email: string;
	password: string;
}

const userSchema = new mongoose.Schema<UserDocument>({
    username: { type: String },
	name: { type: String },
	email: { type: String },
	password: { type: String },
}, {timestamps: true});

export const UserModel = mongoose.model<UserDocument>('User', userSchema);
