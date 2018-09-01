import service from "./AxiosService";

export default {
  async signUp(userInput) {
    try {
      const newUser = await service.post("/users/signup", userInput);
      return newUser;
    } catch (error) {
      console.log("Error in signUp request => ", error);
    }
  },

  async signIn(userInput) {
    try {
      const signedInUser = await service.post("/session", userInput);
      return signedInUser;
    } catch (error) {
      console.log("Error in signIn request => ", error);
    }
  },

  async signOut() {
    try {
      const signOutMessage = await service.delete("/session");
      return signOutMessage;
    } catch (error) {
      console.log("Error in signOut request => ", error);
    }
  }
};
