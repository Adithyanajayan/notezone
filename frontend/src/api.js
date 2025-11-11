import axios from "axios";

// 👇 Replace with your Django backend URL
// If you're running Django locally:
const BASE_URL = "http://127.0.0.1:8000/api/";

// Create an Axios instance
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
