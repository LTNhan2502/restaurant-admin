import instance from './axios.config.js'

const loginAdmin = (username, password) => {
    const URL_API = "/auth/login";
    const data = { username, password }
    return instance.post(URL_API, data);
}

export { loginAdmin }