import service from "./AxiosService";

const DIARIES = "diaries";

export default {
  async index() {
    try {
      const diaries = await service.get(`/${DIARIES}`);
      return diaries;
    } catch (error) {
      console.log("Error in diaryAll request => ", error);
    }
  },
  async create() {
    try {
      const diaries = await service.get(`/${DIARIES}`);
      return diaries;
    } catch (error) {
      console.log("Error in diaryAll request => ", error);
    }
  }
};
