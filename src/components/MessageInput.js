// src/components/MessageInput.js

import React, { useState } from 'react';

function MessageInput({ channelId, username }) {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message) {
            // Here you would send the message to the API or state
            console.log(`Sending message to channel ${channelId}: ${message}`);

            // Clear the input after sending
            setMessage('');
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