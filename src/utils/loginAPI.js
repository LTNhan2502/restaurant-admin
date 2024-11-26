import instance from './axios.config.js'

const loginAdmin = (email, password) => {
    const URL_API = "/v1/api/loginAdmin";
    const data = { email, password }
    return instance.post(URL_API, data);
}

export { loginAdmin }