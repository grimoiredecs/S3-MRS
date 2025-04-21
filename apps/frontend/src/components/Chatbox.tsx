import React, { useState, useEffect, useRef } from "react";
import "./ChatBox.css";

interface Message {
    sender: "user" | "bot";
    text: string;
}

const ChatBox: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        { sender: "bot", text: "Hi! How can I help you?" }
    ]);
    const [input, setInput] = useState("");
    const [typing, setTyping] = useState(false);
    const chatEndRef = useRef<HTMLDivElement | null>(null);

    // Scroll to bottom on message
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, typing]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage = { sender: "user", text: input.trim() };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setTyping(true);

        // Simulate bot response
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                { sender: "bot", text: "Okay! I received: " + input.trim() }
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
                    <div key={idx} className={`chat-message ${msg.sender}`}>
                        {msg.text}
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
