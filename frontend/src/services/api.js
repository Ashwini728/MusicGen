import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000", // backend URL
});

export const generateMusic = (data) => API.post("/generate", data);
