import axios from 'axios';

const rootUrl = process.env.BACKEND_URL;
const url = `${rootUrl}/auth`;

export const signin = (user) => {
    return axios.post(`${url}/login`, user, { withCredentials: true });
}

export const signout = () => axios.post(`${url}/logout`, {}, { withCredentials: true });

export const signup = (user) => axios.post(`${url}/register`, user, { withCredentials:true })

export const verifyAuth = () => axios.get(`${rootUrl}/verify-auth`, { withCredentials: true });