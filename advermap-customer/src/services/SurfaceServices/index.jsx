import { PATH, api } from "./../api/index";
export class SurfaceServices {
  static async getBySpaceId(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await api.get(PATH.SURFACE + `/space/${id}`);
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
  static async getById(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await api.get(PATH.SURFACE + `/${id}`);
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
