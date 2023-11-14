import InfluencerData from "../models/influencerData.model";

export class InfluencerDataRepository {
  async insert(pk: number, followerCount: number) {
    const influencerDocument = {
      pk: pk,
      avgCount: followerCount,
      currentCount: followerCount,
      totalDataPoints: 1,
    };
    InfluencerData.create(influencerDocument);
  }

  async updateInfluencerById(
    pk: number,
    avgCount: number,
    currentCount: number,
    totalDataPoints: number
  ) {
    const query = {
      pk: pk,
    };
    const influencerDocument = {
      avgCount: avgCount,
      currentCount: currentCount,
      totalDataPoints: totalDataPoints,
    };
    return InfluencerData.findOneAndUpdate(query, influencerDocument);
  }

  async getInfluenerById(pk: number) {
    return InfluencerData.findOne({ pk: pk });
  }
}
