import "dotenv/config";
import axios, { AxiosInstance } from "axios";

export class ApiUtils {
  private mockstagramAxios: AxiosInstance;

  constructor() {
    this.mockstagramAxios = axios.create({
      baseURL: process.env.MOCKSTAGRAM_BASE_URL,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }

  getMockstagramAxios() {
    return this.mockstagramAxios;
  }
}
