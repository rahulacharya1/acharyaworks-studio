import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useSEO from '../../hooks/useSEO';

const Login = () => {
    useSEO({
        title: "Admin Login | AcharyaWorks",
        description: "Secure login for the AcharyaWorks admin dashboard."
    });

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // If already logged in, redirect to admin dashboard immediately
    useEffect(() => {
        const token = localStorage.getItem('admin_token');
        if (token) {
            navigate('/admin');
        }
    }, [navigate]);

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const apiBase = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
            ? 'http://localhost:8000' 
            : 'https://api.acharyaworks.in';

        fetch(`${apiBase}/api/admin/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
        .then(async (res) => {
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem('admin_token', data.token);
                localStorage.setItem('admin_user', data.username);
                navigate('/admin');
            } else {
                setError(data.detail || data.non_field_errors?.[0] || 'Invalid username or password.');
            }
        })
        .catch((err) => {
            console.error("Login request failed:", err);
            setError('Connection failed. Is the backend server running?');
        })
        .finally(() => {
            setIsLoading(false);
        });
    };

    return (
        <div className="bg-black min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-size-[40px_40px]"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="relative z-10 w-full max-w-md bg-[#0A0A0A] border border-white/10 p-10 rounded-4xl shadow-2xl">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
                        Acharya<span className="text-cyan-400">Works</span>
                    </h1>
                    <p className="text-gray-500 text-sm font-medium tracking-wide">ADMIN CONSOLE SECURE ACCESS</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold rounded-xl text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter admin username"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/30 focus:bg-white/[0.07] transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/30 focus:bg-white/[0.07] transition-all"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full bg-white text-black font-bold py-4 rounded-xl text-sm transition-all active:scale-[0.98] ${
                            isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'
                        }`}
                    >
                        {isLoading ? 'Authenticating...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
