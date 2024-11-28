import instance from './axios.config.js'

const getAllUsers = () => {
    const URL_API = "/users";
    return instance.get(URL_API);
}

export { getAllUsers }