import React, { useState } from 'react';
import './App.css';
import MissileCanvas from './components/MissileCanvas';
import MissileControls from './components/MissileControls';
import Header from './components/Header';

const Canvas = () => {
  const [missiles, setMissiles] = useState([]);
  const [defenseMissiles, setDefenseMissiles] = useState([]);
  const [attackAngle, setAttackAngle] = useState(90);
  const [defenseAngle, setDefenseAngle] = useState(0);
  const [attackSpeed, setAttackSpeed] = useState(2);
  const [defenseSpeed, setDefenseSpeed] = useState(2);
  const [score, setScore] = useState(0);
  const [fired, setFired] = useState(0);

  const handleCanvasClick = event => {
    const canvas = event.target;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    createMissile(x, y);
  };

  const createMissile = (x, y) => {
    setFired(fired +1);
    setMissiles([...missiles, { x, y, width: 10, height: 20, color: 'red', velocity: attackSpeed, angle: attackAngle }]);
    fireDefenseMissile(); // Fire defense missile immediately
  };

  const fireDefenseMissile = () => {
    const targetMissile = missiles[0]; // For simplicity, just targeting the first missile
    if (!targetMissile || missiles.length === 0) return;

    // Calculate angle between interceptor and target missile
    const dx = targetMissile.x - (800 / 2);
    const dy = targetMissile.y - (600 / 2);

    // Create defense missile with initial angle
    const defenseMissile = {
      x: 800 / 2,
      y: 600 / 2,
      width: 10,
      height: 20,
      color: 'blue',
      angle: defenseAngle
    };

    setDefenseMissiles([...defenseMissiles, defenseMissile]);

  };


  return (
      <div className="App">
        <Header score={score} fired={fired}/>
        <MissileControls
            attackAngle={attackAngle}
            defenseAngle={defenseAngle}
            attackSpeed={attackSpeed}
            defenseSpeed={defenseSpeed}
            setAttackAngle={setAttackAngle}
            setDefenseAngle={setDefenseAngle}
            setAttackSpeed={setAttackSpeed}
            setDefenseSpeed={setDefenseSpeed}
        />
        <MissileCanvas
            handleCanvasClick={handleCanvasClick}
            missiles={missiles}
            defenseMissiles={defenseMissiles}
            attackAngle={attackAngle}
            defenseAngle={defenseAngle}
            attackSpeed={attackSpeed}
            defenseSpeed={defenseSpeed}
            setMissiles={setMissiles}
            setDefenseMissiles={setDefenseMissiles}
            score={score}
            setScore={setScore}
        />
      </div>
  );
};

export default Canvas;
