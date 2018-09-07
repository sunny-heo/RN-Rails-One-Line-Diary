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
  async create(diary) {
    try {
      console.log(diary);
      const diaries = await service.post(`/${DIARIES}`, diary);
      return diaries;
    } catch (error) {
      console.log("Error in diaryAll request => ", error);
    }
  },
  async update(diary) {
    const { id, ...body } = diary;
    try {
      const updatedDiary = await service.patch(`/${DIARIES}/${id}`, body);
      return updatedDiary;
    } catch (error) {
      console.log("Error in diaryAll request => ", error);
    }
  },
  async destroy(diaryId) {
    try {
      const data = await service.delete(`/${DIARIES}/${diaryId}`);
      return data;
    } catch (error) {
      console.log("Error in diaryAll request => ", error);
    }
  }
};
