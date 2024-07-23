// models/TokenBlacklist.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface TokenBlacklistDocument extends Document {
  token: string;
  createdAt: Date;
}

const TokenBlacklistSchema: Schema = new Schema(
  {
    token: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
    expires: '7d', // Automatically remove documents after 7 days
  }
);

export const TokenBlacklist = mongoose.model<TokenBlacklistDocument>('TokenBlacklist', TokenBlacklistSchema);
