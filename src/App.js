// src/App.js

import React, { useState, useEffect } from 'react';
import ChannelList from './components/ChannelList';
import Chat from './components/Chat';
import UserPrompt from './components/UserPrompt';
import './App.csmpm s';

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
        // Set channels with mock data
        setChannels(mockChannels);
    }, []);

    const handleSelectChannel = (channel) => {
        setCurrentChannel(channel);

        // Reset unread count when a channel is selected
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
            // Logic for sending the message (e.g., update messages)
            console.log(`Sending message in channel ${currentChannel.id}: ${messageText}`);

            // Update unread count for the current channel
            setChannels((prevChannels) =>
                prevChannels.map((channel) =>
                    channel.id === currentChannel.id
                        ? { ...channel, unreadCount: channel.unreadCount + 1 } // Increment unread count
                        : channel
                )
            );

            // Optionally reset message input field here as needed
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
                        onSendMessage={handleSendMessage} // Pass the function down
                    />
                </div>
            )}
        </div>
    );
}

export default App;