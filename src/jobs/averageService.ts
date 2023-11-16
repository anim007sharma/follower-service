import { IInfluencerData } from "../models/influencerData.model";

class AverageService {
  constructor(
    private lastAvg: number,
    private currentFollowerCount: number,
    private totalDataPoint: number
  ) {}

  getNewAvg() {
    const newDataPoints = this.totalDataPoint + 1;
    const newAvg = Math.round(
      (this.totalDataPoint / newDataPoints) * this.lastAvg +
        this.currentFollowerCount / newDataPoints
    );
    return newAvg;
  }

  getNewAvgByInfluencer(
    influencerData: IInfluencerData,
    currentFollowerCount: number
  ) {
    const { avgCount, totalDataPoints } = influencerData;
    const newDataPoints = totalDataPoints + 1;
    const newAvg = Math.round(
      (totalDataPoints / newDataPoints) * avgCount +
        currentFollowerCount / newDataPoints
    );
    return newAvg;
  }
}

class TestAverageService {
  constructor() {}

  testGetAvg(lastAvg, currentFollowerCount, currentDataPoints, expectedResult) {
    const averageService = new AverageService(
      lastAvg,
      currentFollowerCount,
      currentDataPoints
    );
    if (averageService.getNewAvg() === expectedResult) {
      console.log("Test passed!");
    } else {
      console.log("test failed");
    }
  }

  testSuite() {
    this.testGetAvg(1000, 1500, 2, 1167);

    this.testGetAvg(1000, 1000, 2, 1000);

    this.testGetAvg(1000, 500, 1, 750);

    this.testGetAvg(0, 1000, 0, 1000);

    this.testGetAvg(3000, 5000, 100, 3020);

    this.testGetAvg(3000, 2000, 100, 2990);
  }
}

new TestAverageService().testSuite();
