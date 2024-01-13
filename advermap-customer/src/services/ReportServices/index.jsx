import { api } from "../api";
import { PATH } from "./../api/index";

export class ReportService {
  static async postReport(report, surfaceId) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await api.post(PATH.REPORT + `/${surfaceId}`, report);
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject(response.data);
        }
      } catch (error) {
        reject(error.message);
      }
    });
  }
  static async postReportSpace(report) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await api.post(PATH.REPORT, report);
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject(response.data);
        }
      } catch (error) {
        reject(error.message);
      }
    });
  }
  static async getReport(userAddress) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await api.get(PATH.REPORT + `/user/${userAddress}`);
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject(response.data);
        }
      } catch (error) {
        reject(error.message);
      }
    });
  }

  static async getReportType() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await api.get(PATH.REPORT + `/type/all`);
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject(response.data);
        }
      } catch (error) {
        reject(error.message);
      }
    });
  }
}
