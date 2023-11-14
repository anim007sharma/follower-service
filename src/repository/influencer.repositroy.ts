import Influencer from "../models/influencer.model";

export class InfluencerRepository {
  async getInfluencerById(pk: number) {
    const query = { pk: pk };
    return Influencer.findOne(query);
  }
}
