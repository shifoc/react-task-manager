import axios from 'axios';

const instance = axios.create({
    baseURL: '/'
});

// Set the AUTH token for requests
instance.interceptors.request.use(function (config) {
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    config.headers.Authorization = user ? `Bearer ${user.token}` : '';
    return config;
});

export default instance;
