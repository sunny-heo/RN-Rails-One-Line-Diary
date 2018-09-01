import axios from "axios";

class AxiosService {
  constructor() {
    let service = axios.create({
      baseURL: "http://localhost:3000/api/v1",
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

  handleSuccess(res) {
    return res;
  }

  handleError = error => {
    console.log(error);
    switch (error.response.status) {
      case 401:
        this.redirectTo(document, "/sign_in");
        break;
      case 404:
        this.redirectTo(document, "/404");
        break;
      default:
        this.redirectTo(document, "/500");
        break;
    }
    return Promise.reject(error);
  };

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
