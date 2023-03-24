import axios from "axios";

const api = axios.create({
  baseURL: "https://election.kmutt.ac.th",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
