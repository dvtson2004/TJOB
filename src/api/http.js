import axios from "axios";
//change to session storage
class Api {
  instance;
  constructor() {
    this.instance = axios.create({
      baseURL: "https://tjob-backend-9a869c891d9b.herokuapp.com",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.instance.interceptors.response.use(
      (response) => {
        if (
          response.config.url === "login" ||
          response.config.url === "social"
        ) {
          console.log("Response data:", response.data);
          sessionStorage.setItem("token", response.data.token);

          // Check the role and store accordingly
          if (response.data.role === "Job-seeker") {
            
            sessionStorage.setItem("roleJobSeeker", response.data.role);
          } else if (response.data.role === "Enterprise") {
            sessionStorage.setItem("roleEnterprise", response.data.role);
          } else if (response.data.role === "Admin") {
            sessionStorage.setItem("roleAdmin", response.data.role);
          }
          window.location.replace("/");
        }
        return response;
      },
      (error) => {
        if (error.response.data.message === "expired_session") {
          sessionStorage.removeItem("token");
          window.location.replace("login");
        }
        return Promise.reject(error);
      }
    );
  }
}
// https://topjobbackend-production.up.railway.app
const api = new Api().instance;
export default api;
