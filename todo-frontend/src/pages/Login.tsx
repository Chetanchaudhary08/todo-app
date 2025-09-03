import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../utils/api";

// Define the expected structure of the login response data
interface LoginResponse {
    token: string;
    userID: string;
}

function Login() {
    // Local state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // Handle login
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await loginUser({ email, password });

            // Use a type assertion to tell TypeScript what res.data contains
            const data = res.data as LoginResponse;

            // Save auth data
            localStorage.setItem("token", data.token);
            localStorage.setItem("userID", data.userID);

            // Redirect after login
            navigate("/todos");
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 p-6">
            {/* Outer container */}
            <div className="w-full max-w-4xl bg-gray-900/70 backdrop-blur-lg rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden border border-gray-700">
                {/* Left panel */}
                <div className="hidden md:flex md:w-1/2 flex-col items-center justify-center p-10 text-gray-200 space-y-6 bg-gradient-to-br from-gray-800/70 to-gray-900/70">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                    </svg>

                    <h1 className="text-3xl font-bold text-blue-400">Welcome Back 👋</h1>
                    <p className="text-center text-sm text-gray-400">
                        Sign in to manage your todos and stay on top of your day.
                    </p>
                </div>

                {/* Right panel (form) */}
                <div className="flex-1 flex items-center justify-center p-10 bg-gray-950">
                    <div className="w-full max-w-sm">
                        <h2 className="text-2xl font-bold mb-6 text-center text-white">
                            Login to Your Account
                        </h2>

                        {/* Login form */}
                        <form onSubmit={handleLogin} className="space-y-4">
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-gray-100 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-400"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />

                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-gray-100 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-400"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition disabled:opacity-50"
                            >
                                {loading ? "Logging in..." : "Login"}
                            </button>
                        </form>

                        {/* Error message */}
                        {error && (
                            <p className="text-red-500 text-center mt-3">{error}</p>
                        )}

                        {/* Register link */}
                        <p className="mt-4 text-center text-gray-400">
                            Don’t have an account?{" "}
                            <Link to="/register" className="text-blue-400 hover:underline">
                                Register
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;