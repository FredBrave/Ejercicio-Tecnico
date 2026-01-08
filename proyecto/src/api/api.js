import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000/api/v1_0_0/",
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;