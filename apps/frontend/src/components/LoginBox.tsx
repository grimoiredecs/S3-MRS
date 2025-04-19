import React, { useState, FC } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./LoginBox.css";

const LoginBox: FC = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // optional validation logic here
        if (username && password) {
            // Simulate login success
            navigate("/home"); // ✅ navigate to HomePage
        } else {
            setError("Please enter username and password");
        }
    };


    return (
        <div className="wrapper">
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>

                <div className="input-box">
                    <input
                        type="text"
                        placeholder="Username"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <FaUser className="icon" />
                </div>

                <div className="input-box">
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <FaLock className="icon" />
                </div>

                <div className="remember-forgot">
                    <label>
                        <input type="checkbox" /> Remember me
                    </label>
                    <a href="#">Forgot Password?</a>
                </div>

                {error && <p className="error">{error}</p>}

                <button type="submit">Login</button>

                <div className="register-link">
                    <p>
                        Don't have an account? <a href="#">Register</a>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default LoginBox;
