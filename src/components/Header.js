import React from 'react';

const Header = ({ score, fired }) => {
    return (
        <header className="App-header">
            <h1>Missile Interceptor Game</h1>
            <div>Score: {score}</div>
            <div>Fired Missile count: {fired}</div>
        </header>

    );
};

export default Header;
