import axios from "axios";

export const API = axios.create({
    baseURL: "http://localhost:8888",
});

export const IMAGE_URL = "http://localhost:8888";