import axios from "axios";

axios.interceptors.request.use(
    config => {
        config.headers.Accept = 'application/json;version=v1_web';
        config.headers["Content-Type"] = 'application/json';
        return config;
    },
    error => Promise.reject(error)
)

export default axios;