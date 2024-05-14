import React from 'react';

const Header = ({ score }) => {
    return (
        <header className="App-header">
            <h1>Missile Interceptor Game</h1>
            <div>Score: {score}</div>
        </header>
    );
};

export default Header;
