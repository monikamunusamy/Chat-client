// src/App.js

import React, { useState, useEffect } from 'react';
import ChannelList from './components/ChannelList';
import Chat from './components/Chat';
import UserPrompt from './components/UserPrompt';

function App() {
    const [username, setUsername] = useState('');
    const [channels, setChannels] = useState([]);
    const [currentChannel, setCurrentChannel] = useState(null);

    const mockChannels = [
        { id: 1, name: 'General Chat', unreadCount: 3 },
        { id: 2, name: 'Tech Support', unreadCount: 5 },
        { id: 3, name: 'Announcements', unreadCount: 0 },
        { id: 4, name: 'Feedback', unreadCount: 1 },
        { id: 5, name: 'Random Stuff', unreadCount: 3 },
    ];

    useEffect(() => {
        // Replace this with your actual API call when ready
        setChannels(mockChannels); // In production, use fetch to get channels
    }, []);

    const handleSelectChannel = (channel) => {
        setCurrentChannel(channel);
    };

    const handleCreateChannel = (channelName) => {
        const newChannel = { id: Date.now(), name: channelName, unreadCount: 0 };
        setChannels((prevChannels) => [...prevChannels, newChannel]);
    };

    return (
        <div className="App">
            {!username ? (
                <UserPrompt onSetUsername={setUsername} />
            ) : (
                <div>
                    <ChannelList
                        channels={channels}
                        onSelectChannel={handleSelectChannel}
                        onCreateChannel={handleCreateChannel}
                    />
                    <Chat channel={currentChannel} username={username} />
                </div>
            )}
        </div>
    );
}

export default App;