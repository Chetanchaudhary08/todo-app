import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export interface Todo {
    _id: string;
    title: string;
    priority?: string;
    tags?: string[];
    completed: boolean;
}

export const getTodos = (token: string) =>
    axios.get<Todo[]>(`${API_URL}/todos`, {
        headers: { Authorization: `Bearer ${token}` },
    });

export const createTodo = (token: string, todo: Omit<Todo, "_id">) =>
    axios.post<Todo>(`${API_URL}/todos`, todo, {
        headers: { Authorization: `Bearer ${token}` },
    });

export const updateTodo = (token: string, id: string, data: Partial<Todo>) =>
    axios.put<Todo>(`${API_URL}/todos/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
    });

export const deleteTodo = (token: string, id: string) =>
    axios.delete<{ message: string }>(`${API_URL}/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
