import axios from 'axios';

const url = "http://localhost:5000/auth";

export const signin = (user) => {
    return axios.post(`${url}/login`, user, { withCredentials: true });
}

export const signout = () => axios.post(`${url}/logout`, {}, { withCredentials: true });

export const signup = (user) => axios.post(`${url}/register`, user, { withCredentials:true })

export const verifyAuth = () => axios.get("http://localhost:5000/verify-auth", { withCredentials: true });