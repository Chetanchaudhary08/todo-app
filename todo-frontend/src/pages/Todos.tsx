import { useEffect, useState } from "react";
import { getTodos, createTodo, updateTodo, deleteTodo } from "../utils/api";
import ParticlesBackground from "../components/ParticlesBackground";
import Sidebar from "../components/Sidebar";

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
    const [showModal, setShowModal] = useState(false);

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token) loadTodos();
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
            setShowModal(false);
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
        <div className="relative min-h-screen bg-black flex">
            {/* Particle Background */}
            <ParticlesBackground />

            {/* Sidebar */}
            <Sidebar />

            {/* Main content in a big box */}
            <div className="relative z-10 flex-1 ml-20 p-6 md:p-10">
                <div className="max-w-4xl mx-auto md:ml-12 bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-6 md:p-10 border border-white/20">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center text-yellow-300">
                        My Todos
                    </h2>

                    {/* Todo list */}
                    <ul className="space-y-4">
                        {todos.map((todo) => (
                            <li
                                key={todo._id}
                                className="flex justify-between items-center bg-black/40 p-3 md:p-4 rounded-lg shadow-md border border-gray-700"
                            >
                                <div
                                    className={`flex-1 cursor-pointer ${todo.completed ? "line-through text-gray-400" : "text-white"
                                        }`}
                                    onClick={() => handleToggleComplete(todo._id, todo.completed)}
                                >
                                    <span className="font-medium">{todo.title}</span>{" "}
                                    <span className="text-xs text-yellow-200">
                                        ({todo.priority || "medium"})
                                    </span>
                                </div>
                                <button
                                    onClick={() => handleDelete(todo._id)}
                                    className="ml-3 text-red-400 hover:text-red-600"
                                >
                                    ✕
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>


            {/* Floating Add Button */}
            <button
                onClick={() => setShowModal(true)}
                className="fixed bottom-8 right-8 bg-yellow-400 hover:bg-yellow-500 text-black p-4 rounded-full shadow-lg text-2xl z-20"
            >
                Add-Todo +
            </button>

            {/* Add Todo Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-30">
                    <div className="bg-white text-black p-6 rounded-lg shadow-xl w-96">
                        <h3 className="text-xl font-bold mb-4">Add New Todo</h3>
                        <form onSubmit={handleAddTodo} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Enter todo..."
                                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                                value={newTodo}
                                onChange={(e) => setNewTodo(e.target.value)}
                            />
                            <select
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg"
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
                                >
                                    {loading ? "Adding..." : "Add Todo"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Todos;
