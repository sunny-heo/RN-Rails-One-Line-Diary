import service from "./AxiosService";

const SEARCH = "search";

export default {
  async user() {
    try {
      const search = await service.get(`/${SEARCH}`);
      return search;
    } catch (error) {
      console.log("Error in search user request => ", error);
    }
  }
};
