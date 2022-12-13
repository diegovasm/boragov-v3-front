import axios from "axios";

const apiURL = {
  development: "http://localhost:8080",
  production: "https://boragov.cyclic.app",
};

const api = axios.create({ baseURL: apiURL[process.env.NODE_ENV] });

api.interceptors.request.use((config) => {
  const loggedUserJSON = localStorage.getItem("loggedUser");
  const loggedUserObj = JSON.parse(loggedUserJSON || '""');

  if (loggedUserObj.token) {
    config.headers = { Authorization: `Bearer ${loggedUserObj.token}` };
  }

  return config;
});

export { api };