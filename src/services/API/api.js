import axios from "axios";

//mock: http://demo7870822.mockable.io
//endpoint api : https://v3.football.api-sports.io

export const API = axios.create({
    baseURL: "https://v3.football.api-sports.io",
    timeout: 10000,
    headers: { "Content-Type": "application/json" },
});
