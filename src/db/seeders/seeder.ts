import "dotenv/config";
import connectDB from "../connection";
import Influencer, { IInfluencer } from "../../models/influencer.model";
import InfluencerData from "../../models/influencerData.model";
import InfluencerHistory from "../../models/influencerHistory.model";

connectDB();

const importData = async () => {
  try {
    await Influencer.deleteMany();
    await InfluencerData.deleteMany();
    await InfluencerHistory.deleteMany();

    const influencers: IInfluencer[] = [];
    for (let i = 0; i < 100; i++) {
      const influencerId = 1000000 + i;
      const influencer = {
        pk: influencerId,
        username: "influencer-" + influencerId,
      };
      influencers.push(influencer);
    }

    await Influencer.insertMany(influencers);

    console.log("Influencer data seeded!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Influencer.deleteMany();
    await InfluencerData.deleteMany();
    await InfluencerHistory.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
