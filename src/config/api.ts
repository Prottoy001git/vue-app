import axios from "axios";
import { apiBaseURL } from "./baseURL";
export const api = axios.create ({
    baseURL: apiBaseURL,
    headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
    }
})