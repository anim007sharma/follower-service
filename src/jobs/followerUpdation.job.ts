import { AxiosInstance } from "axios";
import { ApiUtils } from "../utils/api.util";
import { InfluencerRepository } from "../repository/influencer.repositroy";
import { InfluencerHistoryRepository } from "../repository/influencerHistory.repository";
import { InfluencerDataRepository } from "../repository/influencerData.repository";
import { IInfluencerData } from "../models/influencerData.model";

export interface MockstagramInfluencerModel {
  pk: number;
  username: string;
  followerCount: number;
  followingCount: number;
}

export class FollowerUpdation {
  private apiUtils: ApiUtils;
  private mockstagramAxios: AxiosInstance;
  private influencerRepository: InfluencerRepository;
  private influencerHistroyRepository: InfluencerHistoryRepository;
  private influencerDataRepository: InfluencerDataRepository;

  constructor() {
    this.apiUtils = new ApiUtils();
    this.mockstagramAxios = this.apiUtils.getMockstagramAxios();
    this.influencerRepository = new InfluencerRepository();
    this.influencerHistroyRepository = new InfluencerHistoryRepository();
    this.influencerDataRepository = new InfluencerDataRepository();
  }

  private getUpdatedCountOfFollowers(
    influencer: IInfluencerData,
    followerCount: number
  ) {
    const avgCount = influencer.avgCount;
    const totalDataPoints = influencer.totalDataPoints;
    const newTotalDataPoints = totalDataPoints + 1;
    const newAvg = Math.round(
      (totalDataPoints / newTotalDataPoints) * avgCount +
        followerCount / newTotalDataPoints
    );
    console.info(
      "[FollowerUpdation-getUpdatedCountOfFollowers]: Calculated updated data for InfluencerId=",
      influencer.pk,
      "AvgCount=",
      newAvg,
      "TotalDataPoints=",
      newTotalDataPoints
    );
    return { newAvg, newTotalDataPoints };
  }

  private async updateOrInsertInfluencerData(
    influencerData: MockstagramInfluencerModel[],
    jobTime: Date
  ) {
    for (let i = 0; i < influencerData.length; i++) {
      try {
        const pk = influencerData[i].pk;
        const followerCount = influencerData[i].followerCount;

        await this.influencerHistroyRepository.insert(
          pk,
          jobTime,
          followerCount
        );
        console.info(
          "[FollowerUpdation-updateOrInsertInfluencerData]: Influencer History inserted for InfluencerId",
          pk
        );

        const influencer = await this.influencerDataRepository.getInfluenerById(
          pk
        );
        console.info(
          "[FollowerUpdation-updateOrInsertInfluencerData]: Influencer data fetched for InfluencerId",
          pk,
          "Data = ",
          influencer
        );
        if (!influencer) {
          await this.influencerDataRepository.insert(pk, followerCount);
          console.info(
            "[FollowerUpdation-updateOrInsertInfluencerData]: No existing data found for InfluencerId",
            pk,
            "New data inserted for",
            pk
          );
        } else {
          const { newAvg, newTotalDataPoints } =
            this.getUpdatedCountOfFollowers(influencer, followerCount);
          console.log(newAvg, newTotalDataPoints);
          await this.influencerDataRepository.updateInfluencerById(
            pk,
            newAvg,
            followerCount,
            newTotalDataPoints
          );
          console.info(
            "[FollowerUpdation-updateOrInsertInfluencerData]: Data updated for InfluencerId",
            pk
          );
        }
      } catch (error) {
        console.info(
          "[FollowerUpdation-updateOrInsertInfluencerData]: Error while updating data for InfluencerId",
          influencerData[i].pk
        );
        continue;
      }
    }
  }

  async run() {
    const jobTime = new Date();
    console.info("[FollowerUpdation-run]: Job started at", jobTime);
    const influencerPromise: any = [];

    // only running for 100 influencers
    for (let i = 0; i < 100; i++) {
      const id = 1000000 + i;
      let influencer;
      try {
        influencer = await this.influencerRepository.getInfluencerById(id);
      } catch (error) {
        console.error(
          "[FollowerUpdation-run]: Error fetching influencer data for ID=",
          id,
          error
        );
        continue;
      }

      if (!influencer) {
        console.info(
          "[FollowerUpdation-run]: No influencer data found for ID =",
          id
        );
        continue;
      }
      influencerPromise.push(
        this.mockstagramAxios.get("/api/v1/influencers/" + id)
      );
    }
    console.info(
      "[FollowerUpdation-run]: Fetching follower count from Mockstagram API for Influencers"
    );
    const influencerResponse: any = await Promise.all(influencerPromise);
    const influencerData = influencerResponse.map((resp) => resp.data);
    await this.updateOrInsertInfluencerData(influencerData, jobTime);
    console.info("[FollowerUpdation-run]: Job completed");
  }
}
