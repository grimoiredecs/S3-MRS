import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import "./ChatBox.css";

type Message = string;

const ChatBox: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        "Hi! How can I help you?"
    ]);
    const [input, setInput] = useState<string>("");
    const [typing, setTyping] = useState<boolean>(false);
    const chatEndRef = useRef<HTMLDivElement | null>(null);

    // Scroll to bottom on message
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, typing]);

    const handleSend = (): void => {
        if (!input.trim()) return;

        setMessages((prev) => [...prev, input]);

        setInput("");
        setTyping(true);

        axios.post<unknown, unknown>("http://localhost:3020/feedback", {
            user_id: localStorage.getItem("userId") || "unknown",
            message: input.trim()
        }).catch((err: unknown) => console.error("❌ Feedback error:", err));


        setTimeout(() => {
            setMessages((prev) => [
                ...prev,

            ]);
            setTyping(false);
        }, 1000);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") handleSend();
    };

    return (
        <div className="chat-box slide-in">
            <div className="chat-header">Student Support</div>
            <div className="chat-body">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`chat-message ${idx % 2 === 0 ? "user" : "bot"}`}>
                        {msg}
                    </div>
                ))}
                {typing && <div className="chat-message bot typing">Typing...</div>}
                <div ref={chatEndRef} />
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
};

export default ChatBox;
