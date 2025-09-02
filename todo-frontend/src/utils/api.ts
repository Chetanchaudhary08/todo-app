import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:3000/api/v1", // adjust if deployed
});

// Add token automatically to requests
API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

// AUTH
export const registerUser = (data: { username: string; email: string; password: string }) =>
    API.post("/signup", data);

export const loginUser = (data: { email: string; password: string }) =>
    API.post("/signin", data);

// TODOS
export const createTodo = (data: { title: string; dueDate?: string; priority?: string; tags?: string[] }) =>
    API.post("/createtodo", data);

export const getTodos = () => API.get("/get-todos");

export const updateTodo = (id: string, data: { title?: string; priority?: string; tags?: string[]; completed?: boolean }) =>
    API.put(`/update-todo/${id}`, data);

export const deleteTodo = (id: string) => API.delete(`/delete-todo/${id}`);
