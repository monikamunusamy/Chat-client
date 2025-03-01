import React, { useState } from 'react';

function UserPrompt({ onSetUsername }) {
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name) {
            localStorage.setItem('username', name);
            onSetUsername(name);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Enter your name:
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Start Chat</button>
        </form>
    );
}

export default UserPrompt;