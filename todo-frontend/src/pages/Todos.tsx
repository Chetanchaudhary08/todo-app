import { useEffect, useState } from "react";
import API from "../utils/api";

interface Todo {
    _id: string;
    title: string;
    completed: boolean;
    priority?: string;
    tags?: string[];
}

function Todos() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState("");

    // Fetch todos on mount
    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const res = await API.get("/get-todos");
                setTodos(res.data);
            } catch (error) {
                console.error("Error fetching todos:", error);
            }
        };
        fetchTodos();
    }, []);

    // Add a new todo
    const handleAddTodo = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTodo.trim()) return;

        try {
            const res = await API.post("/create-todo", { title: newTodo });
            setTodos([...todos, res.data]); // add to list
            setNewTodo("");
        } catch (error) {
            console.error("Error creating todo:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
                <h1 className="text-2xl font-bold text-center mb-6">My Todos ✅</h1>

                {/* Add todo form */}
                <form onSubmit={handleAddTodo} className="flex gap-2 mb-6">
                    <input
                        type="text"
                        placeholder="Enter new task..."
                        className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                    >
                        Add
                    </button>
                </form>

                {/* Todo list */}
                <ul className="space-y-3">
                    {todos.map((todo) => (
                        <li
                            key={todo._id}
                            className={`flex items-center justify-between p-3 border rounded-lg ${todo.completed ? "bg-green-100 line-through" : "bg-gray-50"
                                }`}
                        >
                            <span>{todo.title}</span>
                            <span
                                className={`text-sm px-2 py-1 rounded ${todo.completed
                                    ? "bg-green-500 text-white"
                                    : "bg-yellow-400 text-black"
                                    }`}
                            >
                                {todo.completed ? "Done" : "Pending"}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Todos;
