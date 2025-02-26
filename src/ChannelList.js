import React from 'react';

function ChannelList({ channels, onSelectChannel }) {
    return (
        <div>
            <h2>Channels</h2>
            <ul>
                {channels.map(channel => (
                    <li key={channel.id} onClick={() => onSelectChannel(channel)}>
                        {channel.name} (unread: {channel.unreadCount})
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ChannelList;