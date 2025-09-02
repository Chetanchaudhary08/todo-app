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
            navigate("/login");
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
            <div className="w-full max-w-4xl bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden border border-gray-700">

                {/* Left Section - Welcome Text */}
                <div className="hidden md:flex md:w-1/2 flex-col items-center justify-center p-10 text-emerald-400 space-y-6 bg-gradient-to-br from-gray-800/80 to-gray-900/90">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24"
                        strokeWidth="1.5" stroke="currentColor"
                        className="w-16 h-16 text-emerald-400">
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d="M16.862 4.487 19.5 7.125m0 0-12.67 12.67a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L19.5 7.125Zm-2.638-2.638 2.638 2.638" />
                    </svg>
                    <h1 className="text-3xl font-bold">REGISTER HERE 🌙</h1>
                    <p className="text-center text-sm text-gray-300">
                        Create your account and unlock a darker, smarter todo experience.
                    </p>
                </div>

                {/* Right Section - Register Form */}
                <div className="flex-1 flex items-center justify-center p-10 bg-gray-950">
                    <div className="w-full max-w-sm">
                        <h2 className="text-2xl font-bold mb-6 text-center text-gray-100">
                            Register
                        </h2>
                        <form onSubmit={handleRegister} className="space-y-4">

                            {/* Username Field */}
                            <div className="relative">
                                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                                    xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.25a8.25 8.25 0 1 1 15 0v.75H4.5v-.75Z" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Username"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-800 text-gray-100 border border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Email Field */}
                            <div className="relative">
                                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                                    xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25H4.5a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0L12 13.5 2.25 6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5H4.5a2.25 2.25 0 0 0-2.25 2.25" />
                                </svg>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-800 text-gray-100 border border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Password Field */}
                            <div className="relative">
                                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                                    xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M16.5 10.5V6.75A4.5 4.5 0 0 0 12 2.25a4.5 4.5 0 0 0-4.5 4.5v3.75m9 0H7.5m9 0v9a2.25 2.25 0 0 1-2.25 2.25h-5.25A2.25 2.25 0 0 1 7.5 19.5v-9" />
                                </svg>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-800 text-gray-100 border border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg shadow-lg transition disabled:opacity-50"
                            >
                                {loading ? "Registering..." : "Register"}
                            </button>
                        </form>

                        {error && <p className="text-red-400 text-center mt-3">{error}</p>}

                        <p className="mt-4 text-center text-gray-400">
                            Already have an account?{" "}
                            <Link to="/login" className="text-emerald-400 hover:underline">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
