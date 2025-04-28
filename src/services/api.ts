import axios from "axios";
import Config from "@/config";
//Creamos una instancia de AXIOS 
const api = axios.create({
    baseURL: Config.API_URL,
    timeout: 5000, // 5 sec
})

//Request interceptor
api.interceptors.request.use(
    (config) => {
        const newConfig = {...config};
        newConfig.headers.Accept = 'application/json'
        newConfig.headers.Authorization = `Bearer ${process.env.NEXT_PUBLIC_MOVIE_API_KEY}`;
        console.log("Making request to :", config.url)
        return newConfig;
    },
    (error) => { 
        console.error("Request error: ", error);
        return Promise.reject(error);
    }
);

//Response Interceptor: 
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("Response error: ", error);
        return Promise.reject(error);
    }
)


export default api;