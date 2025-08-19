import mongoose, { Schema, Document } from "mongoose";

export interface IUrl extends Document {
  shortId: string;
  longUrl: string;
  clicks: number;
  createdAt: Date;
}

const UrlSchema = new Schema<IUrl>({
  shortId: { type: String, required: true, unique: true },
  longUrl: { type: String, required: true },
  clicks: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Url || mongoose.model<IUrl>("Url", UrlSchema);
