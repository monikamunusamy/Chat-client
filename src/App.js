// src/App.js

import React, { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs'; // ✅ Import TensorFlow.js
import ChannelList from './components/ChannelList';
import Chat from './components/Chat';
import UserPrompt from './components/UserPrompt';

function App() {
    const [username, setUsername] = useState('');
    const [channels, setChannels] = useState([]);
    const [currentChannel, setCurrentChannel] = useState(null);
    const [model, setModel] = useState(null); // ✅ State for TensorFlow model

    const mockChannels = [
        { id: 1, name: 'General Chat', unreadCount: 3 },
        { id: 2, name: 'Tech Support', unreadCount: 5 },
        { id: 3, name: 'Announcements', unreadCount: 0 },
        { id: 4, name: 'Feedback', unreadCount: 1 },
        { id: 5, name: 'Random Stuff', unreadCount: 3 },
    ];

    useEffect(() => {
        const loadModel = async () => {
            try {
                const model = await tf.loadLayersModel('https://monikamunusamy.github.io/Chat-client.json');
                setModel(model);
            } catch (error) {
                console.error('Error loading model:', error);
            }
        };
        loadModel();
    }, []);

    const handleSelectChannel = (channel) => {
        setCurrentChannel(channel);
        setChannels((prev) =>
            prev.map((c) =>
                c.id === channel.id ? { ...c, unreadCount: 0 } : c
            )
        );
    };

    const handleCreateChannel = (channelName) => {
        const newChannel = { id: Date.now(), name: channelName, unreadCount: 0 };
        setChannels((prev) => [...prev, newChannel]);
    };

    const handleSendMessage = (messageText) => {
        if (messageText.trim()) {
            console.log(`Sending message in channel ${currentChannel.id}: ${messageText}`);
            setChannels((prevChannels) =>
                prevChannels.map((channel) =>
                    channel.id === currentChannel.id
                        ? { ...channel, unreadCount: channel.unreadCount + 1 }
                        : channel
                )
            );
        }
    };

    return (
        <div className="App">
            {!username ? (
                <UserPrompt onSetUsername={setUsername} />
            ) : (
                <div className="chat-container">
                    <ChannelList
                        channels={channels}
                        onSelectChannel={handleSelectChannel}
                        onCreateChannel={handleCreateChannel}
                    />
                    <Chat
                        channel={currentChannel}
                        username={username}
                        onSendMessage={handleSendMessage}
                    />
                </div>
            )}
        </div>
    );
}

export default App;
