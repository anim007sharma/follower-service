import InfluencerHistory, {
  IInfluencerHistory,
} from "../models/influencerHistory.model";

export class InfluencerHistoryRepository {
  async insert(influencerHistory: IInfluencerHistory) {
    InfluencerHistory.create(influencerHistory);
  }
}
