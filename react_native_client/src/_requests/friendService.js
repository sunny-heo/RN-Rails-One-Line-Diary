import service from "./AxiosService";

const FRIEND_REQUESTS = "friend_requests";

export default {
  async index() {
    try {
      const friendRequests = await service.get(`/${FRIEND_REQUESTS}`);
      return friendRequests;
    } catch (error) {
      console.log("Error in friendRequest index request => ", error);
    }
  },
  async create(friend) {
    try {
      const outgoingRequest = await service.post(`/${FRIEND_REQUESTS}`, friend);
      return outgoingRequest;
    } catch (error) {
      console.log("Error in friendRequest create request => ", error);
    }
  },
  async update(request_id) {
    try {
      const acceptedRequest = await service.patch(
        `/${FRIEND_REQUESTS}/${request_id}`
      );
      return acceptedRequest;
    } catch (error) {
      console.log("Error in friendRequest update request => ", error);
    }
  },
  async destroy(request_id) {
    try {
      const rejectedRequest = await service.delete(
        `/${FRIEND_REQUESTS}/${request_id}`
      );
      return rejectedRequest;
    } catch (error) {
      console.log("Error in friendRequest destory request => ", error);
    }
  }
};
