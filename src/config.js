export const BASE_URL = 'http://127.0.0.1:8000';

const API_URL = BASE_URL + "/api";

export const endpoints = {
    register: API_URL + "/auth/register",
    login: API_URL + "/auth/login",
    logout: API_URL + "/auth/logout",
    apple: API_URL + "/auth/apple",
    google: API_URL + "/auth/google",
    bill: API_URL + "/bill/",
}
