import { CronJob } from "cron";
import { FollowerUpdation } from "./jobs/followerUpdation.job";
import connectDB from "./db/connection";

class App {
  private followerUpdation: FollowerUpdation;
  private followerUpdationJob;

  constructor() {
    this.followerUpdation = new FollowerUpdation();
    this.followerUpdationJob = new CronJob(
      "0 * * * * *",
      () => this.followerUpdation.run(),
      () => console.log("Job finished at", new Date())
    );
  }

  async init() {
    await connectDB();
    this.followerUpdationJob.start();
  }
}

new App().init();
