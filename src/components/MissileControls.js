import React from 'react';

const MissileControls = ({ attackAngle, defenseAngle, attackSpeed, defenseSpeed, setAttackAngle, setDefenseAngle, setAttackSpeed, setDefenseSpeed }) => {
    const handleAttackAngleChange = event => {
        setAttackAngle(event.target.value);
    };

    const handleDefenseAngleChange = event => {
        setDefenseAngle(event.target.value);
    };

    const handleAttackSpeedChange = event => {
        setAttackSpeed(event.target.value);
    };

    const handleDefenseSpeedChange = event => {
        setDefenseSpeed(event.target.value);
    };

    return (
        <header className="App-header">
        <div>
            <label>Attack Missile Angle: {attackAngle}°</label>
            <input
                type="range"
                min="0"
                max="360"
                value={attackAngle}
                onChange={handleAttackAngleChange}
            />
            <label>Attack Missile Speed: {attackSpeed}</label>
            <input
                type="range"
                min="1"
                max="10"
                value={attackSpeed}
                onChange={handleAttackSpeedChange}
            />
            <br />
            <label>Defense Missile Angle: {defenseAngle}°</label>
            <input
                type="range"
                min="0"
                max="360"
                value={defenseAngle}
                onChange={handleDefenseAngleChange}
            />
            <label>Defense Missile Speed: {defenseSpeed}</label>
            <input
                type="range"
                min="1"
                max="10"
                value={defenseSpeed}
                onChange={handleDefenseSpeedChange}
            />
        </div>
        </header>
    );
};

export default MissileControls;
