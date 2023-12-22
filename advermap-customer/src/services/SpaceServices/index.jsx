import { api } from "../api"
import { PATH } from './../api/index';

export class SpaceService {
    static async getAll() {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await api.get(PATH.SPACE);
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