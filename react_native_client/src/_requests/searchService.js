import service from "./AxiosService";

const SEARCH = "search";

export default {
  async user(keyword) {
    console.log("----------------------------------");
    console.log(keyword);
    console.log("----------------------------------");
    try {
      const search = await service.get(`/${SEARCH}/${keyword}`);
      console.log("----------------------------------");
      console.log(search);
      console.log("----------------------------------");
      return search;
    } catch (error) {
      console.log("Error in search user request => ", error);
    }
  }
};
