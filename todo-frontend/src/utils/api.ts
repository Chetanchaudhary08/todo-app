import axios from "axios";

export const API = "http://localhost:3000/api/v1";

// Auth
export const loginUser = (data: { email: string; password: string }) =>
    axios.post(`${API}/signin`, data);

export const registerUser = (data: { username: string; email: string; password: string }) =>
    axios.post(`${API}/signup`, data);

// Todos
export const getTodos = (token: string) =>
    axios.get(`${API}/get-todos`, {
        headers: { Authorization: `Bearer ${token}` },
    });

export const createTodo = (token: string, data: any) =>
    axios.post(`${API}/createtodo`, data, {
        headers: { Authorization: `Bearer ${token}` },
    });

export const updateTodo = (token: string, id: string, data: any) =>
    axios.put(`${API}/update-todo/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
    });

export const deleteTodo = (token: string, id: string) =>
    axios.delete(`${API}/delete-todo/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
