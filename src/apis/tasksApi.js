
import axios from 'axios';

const rootUrl = process.env.BACKEND_URL;
const url = `${rootUrl}/todos`;

export function deleteTask(id) {
    return axios.delete(`${url}/${id}`, { withCredentials: true });
}

export function getTasks() {
    return axios.get(url, { withCredentials: true });
}

export function updateTask(id, newTask){
    return axios.put(`${url}/${id}`, newTask, { withCredentials: true } )
}

export function createTask(newTask){
    return axios.post(`${url}`, newTask, { withCredentials: true });
}
