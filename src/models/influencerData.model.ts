import mongoose, { Schema } from "mongoose";

export interface IInfluencerData {
  pk: number;
  avgCount: number;
  currentCount: number;
  totalDataPoints: number;
}

const influencerDataSchema = new Schema<IInfluencerData>({
  pk: { type: Number, required: true, unique: true },
  avgCount: { type: Number, required: true },
  currentCount: { type: Number, required: true },
  totalDataPoints: { type: Number, required: true },
});

const InfluencerData = mongoose.model("InfluencerData", influencerDataSchema);

export default InfluencerData;
