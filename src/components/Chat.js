// src/components/Chat.js

import React, { useState, useEffect } from 'react';
import MessageInput from './MessageInput';
import * as tf from '@tensorflow/tfjs'; // Import TensorFlow.js

function Chat({ channel, username }) {
    const [messages, setMessages] = useState([]);
    const [model, setModel] = useState(null);

    const loadModel = async () => {
        const model = await tf.loadLayersModel('https://monikamunusamy.github.io/Chat-client/models/model.json');        setModel(model);
    };

    useEffect(() => {
        loadModel();
    }, []);

    useEffect(() => {
        if (channel) {
            fetch(`https://api.yourchatserver.com/channels/${channel.id}/messages`)
                .then(response => response.json())
                .then(data => setMessages(data))
                .catch(error => console.error('Error fetching messages:', error));
        }
    }, [channel]);

    const handleSendMessage = async (messageText) => {
        if (model) {
            const inputTensor = tf.tensor([messageText]);
            const prediction = model.predict(inputTensor);
            prediction.print(); // Handle predictions as needed
        }
        // Add message logic here
        setMessages((prevMessages) => [...prevMessages, { text: messageText, user: username }]);
    };

    return (
        <div>
            <h3>{channel?.name}</h3>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>{msg.text}</div>
                ))}
            </div>
            <MessageInput onSendMessage={handleSendMessage} />
        </div>
    );
}

export default Chat;