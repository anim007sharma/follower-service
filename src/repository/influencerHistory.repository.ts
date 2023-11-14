import InfluencerHistory, {
  IInfluencerHistory,
} from "../models/influencerHistory.model";

export class InfluencerHistoryRepository {
  async insert(pk, jobTime, followerCount) {
    const influencerHistoryDocument = {
      pk: pk,
      datetime: jobTime,
      followers: followerCount,
    };
    InfluencerHistory.create(influencerHistoryDocument);
  }
}
