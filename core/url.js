import axios from "axios";

export const API = axios.create({
    baseURL: "http://192.168.0.6:8888",
});

export const IMAGE_URL = "http://192.168.0.6:8888";