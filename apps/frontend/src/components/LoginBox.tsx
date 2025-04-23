import React, { useState, FC } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./LoginBox.css"
import axios from "axios";
import { useUserContext } from "../context/UserContext";

const LoginBox: FC = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();
    const { setUserId } = useUserContext();


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post("http://localhost:3006/auth/login", {
                email: username,
                password: password,
            });

            console.log("Response from login:", response.data);
            const token = response.data.token;
            if (!token) throw new Error("No token returned");

            localStorage.setItem("token", token);
            // Adjust the key if userId is under a different key, e.g., response.data.userId or response.data.user.id
            const userId = response.data.id;
            setUserId(userId);

            console.log("✅ Logged in as:", userId);
            localStorage.setItem("userId", userId);
            console.log("✅ Logged in. Token:", token);
            navigate("/home");
        } catch (err: any) {
            console.error("❌ Login error:", err);
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="wrapper">
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>

                <div className="input-box">
                    <input
                        type="text"
                        placeholder="Email"
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
                </div>

                {error && <p className="error">{error}</p>}

                <button type="submit">Login</button>

                <div className="register-link">
                </div>
            </form>
        </div>
    );
};

export default LoginBox;