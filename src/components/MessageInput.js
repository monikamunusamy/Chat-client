// src/components/MessageInput.js

import React, { useState } from 'react';

function MessageInput({ onSendMessage }) {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim()) {
            onSendMessage(message); // This will call the send message logic
            setMessage(''); // Clear the input field after sending
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                required
            />
            <button type="submit">Send</button>
        </form>
    );
}

export default MessageInput;