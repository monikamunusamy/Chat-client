import React, { useState, useEffect } from 'react';
import ChannelList from './ChannelList';
import Chat from './Chat';
import UserPrompt from './UserPrompt';
import SearchBar from './SearchBar';

function App() {
    const [username, setUsername] = useState('');
    const [channels, setChannels] = useState([]);
    const [currentChannel, setCurrentChannel] = useState(null);
    const [filteredChannels, setFilteredChannels] = useState([]);

    useEffect(() => {
        // Fetch channels from API (replace with your own API)
        fetch('https://api.yourchatserver.com/channels')
            .then(response => response.json())
            .then(data => {
                setChannels(data);
                setFilteredChannels(data);
            });
    }, []);

    const handleSearch = (query) => {
        const results = channels.filter(channel => channel.name.toLowerCase().includes(query.toLowerCase()));
        setFilteredChannels(results);
    };

    return (
        <div className="App">
            {!username ? (
                <UserPrompt onSetUsername={setUsername} />
            ) : (
                <div>
                    <SearchBar onSearch={handleSearch} />
                    <ChannelList
                        channels={filteredChannels}
                        onSelectChannel={setCurrentChannel}
                    />
                    <Chat channel={currentChannel} username={username} />
                </div>
            )}
        </div>
    );
}

export default App;