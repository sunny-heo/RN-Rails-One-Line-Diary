import { Platform } from "react-native";
import axios from "axios";

const domain = Platform.OS === "ios" ? "localhost" : "10.0.2.2";

class AxiosService {
  constructor() {
    let service = axios.create({
      baseURL: `http://${domain}:3000/api/v1`,
      // timeout: 3000,
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=UTF-8"
      }
    });
    service.interceptors.response.use(this.handleSuccess, this.handleError);
    this.service = service;
  }

  handleSuccess = res => res;

  handleError = error => Promise.reject(error);

  redirectTo = (document, path) => {
    document.location = path;
  };

  async get(path) {
    try {
      const res = await this.service.get(path);
      return res.data;
    } catch (error) {
      console.log("GET request error: ", error);
    }
  }

  async patch(path, payload) {
    try {
      const res = await this.service.request({
        method: "PATCH",
        url: path,
        responseType: "json",
        data: payload
      });
      return res.data;
    } catch (error) {
      console.log("PATCH request error: ", error);
    }
  }

  async post(path, payload) {
    try {
      const res = await this.service.request({
        method: "POST",
        url: path,
        responseType: "json",
        data: payload
      });
      return res.data;
    } catch (error) {
      console.log("POST request error: ", error);
    }
  }

  async delete(path) {
    try {
      const res = await this.service.request({
        method: "DELETE",
        url: path,
        responseType: "json",
        data: null
      });
      return res.data;
    } catch (error) {
      console.log("DELETE request error: ", error);
    }
  }
}

export default new AxiosService();
