import axios from "axios";

// Use environment variable (Vite requires VITE_ prefix)
export const API =
    import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

// Define Todo type
export interface Todo {
    _id: string;
    title: string;
    priority?: string;
    tags?: string[];
    completed: boolean;
}

// ---------- AUTH ----------
export const loginUser = (data: { email: string; password: string }) =>
    axios.post<{ token: string; userID: string }>(`${API}/signin`, data);


export const registerUser = (data: {
    username: string;
    email: string;
    password: string;
}) => axios.post<{ message: string }>(`${API}/signup`, data);

// ---------- TODOS ----------
export const getTodos = (token: string) =>
    axios.get<Todo[]>(`${API}/get-todos`, {
        headers: { Authorization: `Bearer ${token}` },
    });

export const createTodo = (token: string, data: Omit<Todo, "_id">) =>
    axios.post<Todo>(`${API}/createtodo`, data, {
        headers: { Authorization: `Bearer ${token}` },
    });

export const updateTodo = (
    token: string,
    id: string,
    data: Partial<Todo>
) =>
    axios.put<Todo>(`${API}/update-todo/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
    });

export const deleteTodo = (token: string, id: string) =>
    axios.delete<{ message: string }>(`${API}/delete-todo/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
