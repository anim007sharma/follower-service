import Influencer from "../models/influencer.model";

export class InfluencerRepository {
  async getInfluencerById(pk: number) {
    return Influencer.findOne({ pk: pk });
  }
}
