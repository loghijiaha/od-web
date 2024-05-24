import React, {useEffect, useState} from 'react';
import './App.css';
import MissileCanvas from './components/MissileCanvas';
import MissileControls from './components/MissileControls';
import Missile from "./components/Missile";
import Header from './components/Header';
// import config from "./config.json";
import Switch from 'react-switch';
import fetchConfig from "./rpc/od-sim-bff";

const Canvas = () => {
  const [missiles, setMissiles] = useState([]);
  const [defenseMissiles, setDefenseMissiles] = useState([]);
  const [attackAngle, setAttackAngle] = useState(90);
  const [defenseAngle, setDefenseAngle] = useState(0);
  const [attackSpeed, setAttackSpeed] = useState(2);
  const [defenseSpeed, setDefenseSpeed] = useState(2);
  const [score, setScore] = useState(0);
  const [fired, setFired] = useState(0);
  const [interceptors, setInterceptors] = useState([]);
  const [autoMode, setAutoMode] = useState(true);

  useEffect( () => {

     fetchData(0,0).then(r =>{});

  }, []);


  async function fetchData(x, y) {
    const config = await fetchConfig(x, y);
    console.log(config);
    setInterceptors(config.interceptors);
  }
  const handleCanvasClick = event => {
    const canvas = event.target;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = Math.round(event.clientY - rect.top);
    createMissile(x, y);
  };

  const createMissile = (x, y) => {
    setFired(fired +1);
    setMissiles([...missiles, new Missile( x, y, 10, 20, 'red', attackSpeed, attackAngle)]);
    fetchData(x,y).then(r =>{});
    interceptors && interceptors.forEach(interceptor => {

      interceptor?.isAutofire && fireDefenseMissile(interceptor, x, y);

    });
  };

  const fireDefenseMissile = (interceptor, targetX, targetY) => {

    const { interceptor_angle, interceptor_speed } = interceptor;
    const { x, y } = interceptor.position;

    // Create defense missile with initial angle

    const defenseMissile = new Missile(
        x,
        y,
        10,
        20,
        'blue',
        !autoMode ? defenseSpeed : interceptor_speed,
        !autoMode ? defenseAngle : interceptor_angle,
    );

    setDefenseMissiles(prevMissiles => [...prevMissiles, defenseMissile]);

  };

  const handleModeToggle = () => {
    setAutoMode(!autoMode);
  };

  return (
      <div className="App">
        <Header score={score} fired={fired}/>
        <div className="mode-switch">
          <span className="switch-label">Auto Defence </span>
          <Switch
              onChange={handleModeToggle}
              checked={autoMode}
              offColor="#888"
              onColor="#0f0"
              checkedIcon={false}
              uncheckedIcon={false}
          />

        </div>
        { !autoMode &&
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
        }
        <MissileCanvas
            handleCanvasClick={handleCanvasClick}
            missiles={missiles}
            defenseMissiles={defenseMissiles}
            interceptors={interceptors}
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
