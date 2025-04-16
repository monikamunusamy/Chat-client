// src/components/Chat.js

import React, { useState, useEffect } from 'react';
import MessageInput from './MessageInput';
import * as tf from '@tensorflow/tfjs';
import '../App.css'; // Import the CSS file

function Chat({ channel, username }) {
    const [messages, setMessages] = useState([]);
    const [model, setModel] = useState(null);

    const loadModel = async () => {
        try {
            const model = await tf.loadLayersModel('https://monikamunusamy.github.io/Chat-client.json');   
            setModel(model);
        } catch (error) {
            console.error('Error loading model:', error);
        }
    };

    useEffect(() => {
        loadModel();
        if (channel) {
            fetch(`http://127.0.0.1:5000/channels/${channel.id}/messages`)
                .then(response => response.json())
                .then(data => setMessages(data))
                .catch(error => console.error('Error fetching messages:', error));
        }
    }, [channel]);

    const handleSendMessage = (messageText) => {
        if (messageText.trim()) {
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: messageText, sender: username }
            ]);
        }
    };

    return (
        <div>
            <h3>{channel?.name}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', padding: '10px' }}>
                {messages.map((msg, index) => (
                    <div key={index} className={`message-bubble ${msg.sender === username ? 'self' : 'other'}`}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <MessageInput onSendMessage={handleSendMessage} />
        </div>
    );
}

export default Chat;