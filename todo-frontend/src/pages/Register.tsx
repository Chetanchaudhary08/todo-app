import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../utils/api";

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await registerUser({ username, email, password });

            console.log("Signup success:", res.data);

            // after signup, redirect to login
            navigate("/login");
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-500">
            <div className="bg-white shadow-lg rounded-lg p-8 w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
                <form onSubmit={handleRegister} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>
                {error && <p className="text-red-500 text-center mt-3">{error}</p>}
                <p className="mt-4 text-center text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login" className="text-green-600 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
