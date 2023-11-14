import mongoose, { Schema } from 'mongoose';

export interface IInfluencer {
  pk: number,
  username: string
}

const influencerSchema = new Schema<IInfluencer>(
  {
    pk: {type: Number, required: true, unique: true},
    username: {type: String, required: true},
  }
);

const Influencer = mongoose.model('Influencer', influencerSchema);

export default Influencer;
