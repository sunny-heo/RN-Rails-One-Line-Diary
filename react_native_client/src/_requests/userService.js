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

  async googleSignIn(access_token) {
    try {
      const googleUser = await service.post("/users/oauth/google", {
        access_token
      });
      return googleUser;
    } catch (error) {
      console.log("Error in googleSignIn request => ", error);
    }
  },

  async facebookSignIn(access_token) {
    try {
      const facebookUser = await service.post("users/oauth/facebook", {
        access_token
      });
      return facebookUser;
    } catch (error) {
      console.log("Error in facebookSignIn request => ", error);
    }
  },

  async signOut() {
    try {
      const signOutMessage = await service.get("/users/signout");
      return signOutMessage;
    } catch (error) {
      console.log("Error in signOut request => ", error);
    }
  },

  async currentUser() {
    try {
      const currentUser = await service.get("/users/current_user");
      return currentUser;
    } catch (error) {
      console.log("Error in current user request => ", error);
    }
  }
};
