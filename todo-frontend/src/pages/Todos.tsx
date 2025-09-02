import { useEffect, useState } from "react";
import { getTodos, createTodo, updateTodo, deleteTodo } from "../utils/api";

interface Todo {
    _id: string;
    title: string;
    priority?: string;
    tags?: string[];
    completed: boolean;
}

function Todos() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState("");
    const [priority, setPriority] = useState("medium");
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem("token");

    // fetch todos on load
    useEffect(() => {
        if (token) {
            loadTodos();
        }
    }, [token]);

    const loadTodos = async () => {
        try {
            const res = await getTodos(token!);
            setTodos(res.data);
        } catch (err) {
            console.error("Error fetching todos", err);
        }
    };

    const handleAddTodo = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTodo.trim()) return;

        try {
            setLoading(true);
            const res = await createTodo(token!, {
                title: newTodo,
                priority,
                completed: false,
            });
            setTodos([...todos, res.data]);
            setNewTodo("");
        } catch (err) {
            console.error("Error creating todo", err);
        } finally {
            setLoading(false);
        }
    };

    const handleToggleComplete = async (id: string, completed: boolean) => {
        try {
            const res = await updateTodo(token!, id, { completed: !completed });
            setTodos(todos.map((t) => (t._id === id ? res.data : t)));
        } catch (err) {
            console.error("Error updating todo", err);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteTodo(token!, id);
            setTodos(todos.filter((t) => t._id !== id));
        } catch (err) {
            console.error("Error deleting todo", err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4 text-center">My Todos</h2>

                {/* Create Todo */}
                <form onSubmit={handleAddTodo} className="flex gap-2 mb-6">
                    <input
                        type="text"
                        placeholder="Enter todo..."
                        className="flex-1 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                    />
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="px-2 py-2 border rounded-lg"
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
                    >
                        {loading ? "Adding..." : "Add"}
                    </button>
                </form>

                {/* Todos List */}
                <ul className="space-y-3">
                    {todos.map((todo) => (
                        <li
                            key={todo._id}
                            className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border"
                        >
                            <div
                                className={`flex-1 cursor-pointer ${todo.completed ? "line-through text-gray-500" : ""
                                    }`}
                                onClick={() => handleToggleComplete(todo._id, todo.completed)}
                            >
                                {todo.title}{" "}
                                <span className="text-xs text-gray-400">
                                    ({todo.priority || "medium"})
                                </span>
                            </div>
                            <button
                                onClick={() => handleDelete(todo._id)}
                                className="ml-4 text-red-600 hover:text-red-800"
                            >
                                ✕
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Todos;
