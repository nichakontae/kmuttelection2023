import axios from "axios";

const api = axios.create({
  baseURL: "tcp://0.tcp.ap.ngrok.io:11353",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
