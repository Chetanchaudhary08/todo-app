import { useNavigate } from "react-router-dom";
import { Home, LogOut, ListTodo } from "lucide-react"; // install lucide-react for icons

function Sidebar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="fixed left-0 top-0 h-full w-60 bg-gradient-to-b from-gray-900 to-black text-white p-6 flex flex-col space-y-8 z-20 shadow-xl">
            <h2 className="text-2xl font-bold text-yellow-400">TodoApp</h2>

            <nav className="flex flex-col space-y-4">
                <button
                    onClick={() => navigate("/todos")}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition"
                >
                    <ListTodo size={20} /> My Todos
                </button>

                <button
                    onClick={() => navigate("/")}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition"
                >
                    <Home size={20} /> Dashboard
                </button>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-500/30 text-red-400 transition"
                >
                    <LogOut size={20} /> Logout
                </button>
            </nav>
        </div>
    );
}

export default Sidebar;
