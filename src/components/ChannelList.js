// src/components/ChannelList.js

import React, { useState } from 'react';
import '../App.css'; // Import the CSS file

const ChannelList = ({ channels, onSelectChannel, onCreateChannel }) => {
    const [newChannelName, setNewChannelName] = useState('');

    const handleCreateChannel = () => {
        if (newChannelName.trim()) {
            onCreateChannel(newChannelName);
            setNewChannelName('');
        }
    };

    return (
        <div className="channel-list">
            <h2>Channels</h2>
            <ul>
                {channels.map((channel) => (
                    <li key={channel.id} onClick={() => onSelectChannel(channel)}>
                        {channel.name} ({channel.unreadCount} unread)
                    </li>
                ))}
            </ul>
            <input
                type="text"
                value={newChannelName}
                onChange={(e) => setNewChannelName(e.target.value)}
                placeholder="Create new channel"
            />
            <button onClick={handleCreateChannel}>Create</button>
        </div>
    );
}

export default ChannelList;