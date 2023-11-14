import mongoose, { Schema } from "mongoose";

export interface IInfluencerHistory {
  pk: number,
  datetime: Date,
  followers: number;
}

const influencerHistorySchema = new Schema<IInfluencerHistory>(
  {
    pk: {type: Number, required: true},
    datetime: {type: Date, required: true},
    followers: {type: Number, required: true},
  },
  {
    timeseries: {
      timeField: 'datetime',
      granularity: 'minutes'
    }
  }
);

const InfluencerHistory = mongoose.model('InfluencerHistory', influencerHistorySchema);

export default InfluencerHistory;
