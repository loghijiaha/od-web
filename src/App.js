import React, { useState } from 'react';
import './App.css';
import MissileCanvas from './components/MissileCanvas';
import MissileControls from './components/MissileControls';
import Missile from "./components/Missile";
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
    setMissiles([...missiles, new Missile( x, y, 10, 20, 'red', attackSpeed, attackAngle)]);
    fireDefenseMissile(); // Fire defense missile immediately
  };

  const fireDefenseMissile = () => {

    // Create defense missile with initial angle
    let defenseMissile;
    defenseMissile = new Missile(
        800 / 2,
        600 / 2,
        10,
        20,
        'blue',
        defenseSpeed,
        defenseAngle,
    );

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
