// src/components/ChatBox.tsx
import React from "react";
import "./ChatBox.css";

const ChatBox: React.FC = () => {
    return (
        <div className="chat-box">
            <div className="chat-header">Student Support</div>
            <div className="chat-body">
                <div className="chat-message bot">Hi! How can I help you?</div>
                {/* future chat messages */}
            </div>
            <div className="chat-input">
                <input type="text" placeholder="Type your message..." />
                <button>Send</button>
            </div>
        </div>
    );
};

export default ChatBox;
