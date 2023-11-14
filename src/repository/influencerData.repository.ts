import InfluencerData from "../models/influencerData.model";

export class InfluencerDataRepository {
  async insert(pk: number, followerCount: number) {
    InfluencerData.create({
      pk: pk,
      avgCount: followerCount,
      currentCount: followerCount,
      totalDataPoints: 1,
    });
  }

  async updateInfluencerById(
    pk: number,
    avgCount: number,
    currentCount: number,
    totalDataPoints: number
  ) {
    return InfluencerData.findOneAndUpdate(
      {
        pk: pk,
      },
      {
        avgCount: avgCount,
        currentCount: currentCount,
        totalDataPoints: totalDataPoints,
      }
    );
  }

  async getInfluenerById(pk: number) {
    return InfluencerData.findOne({ pk: pk });
  }
}
