import React, { useRef, useEffect } from 'react';

const MissileCanvas = ({ handleCanvasClick, missiles, defenseMissiles, attackAngle, defenseAngle, attackSpeed, defenseSpeed, setMissiles, setDefenseMissiles, score, setScore }) => {
    const canvasRef = useRef(null);
    const gravity = 10; // Adjust gravity strength as needed
    let t = 0;

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        // Animation Loop
        const animate = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            t += 0.01;

            // Draw Defense Interceptor
            context.fillStyle = 'yellow';
            context.beginPath();
            context.arc(canvas.width / 2, canvas.height / 2, 10, 0, Math.PI * 2);
            context.fill();

            // Draw Defense Missiles
            defenseMissiles.forEach(defenseMissile => {
                context.fillStyle = defenseMissile.color;
                context.fillRect(defenseMissile.x, defenseMissile.y, defenseMissile.width, defenseMissile.height);
                // Calculate velocity components based on defense angle
                const velocityX = Math.cos(defenseMissile.angle * Math.PI / 180) * defenseSpeed;
                const velocityY = Math.sin(defenseMissile.angle * Math.PI / 180) * defenseSpeed;
                // Update position
                defenseMissile.x += velocityX;
                defenseMissile.y += velocityY + gravity*t;
            });

            // Draw Attack Missiles
            missiles.forEach((missile, index) => {
                context.fillStyle = missile.color;
                context.fillRect(missile.x, missile.y, missile.width, missile.height);

                const velocityX = Math.cos(missile.angle * Math.PI / 180) * missile.velocity;
                const velocityY = Math.sin(missile.angle * Math.PI / 180) * missile.velocity;

                // Update missile position with gravity

                missile.y += velocityY + gravity*t;
                missile.x += velocityX;

                // Remove missile if it reaches the bottom of the canvas
                // if (missile.y > canvas.height) {
                //     setMissiles(missiles.filter((_, idx) => idx !== index));
                // }

                defenseMissiles.forEach((defenseMissile, defenseIndex) => {
                    if (
                        missile.x < defenseMissile.x + defenseMissile.width &&
                        missile.x + missile.width > defenseMissile.x &&
                        missile.y < defenseMissile.y + defenseMissile.height &&
                        missile.y + missile.height > defenseMissile.y
                    ) {
                        // Collision detected, increase score and remove both missiles
                        setScore(score + 1);
                        setMissiles(missiles.filter((_, idx) => idx !== index));
                        setDefenseMissiles(defenseMissiles.filter((_, idx) => idx !== defenseIndex));
                    }
                });
            });

            requestAnimationFrame(animate);
        };

        animate();

        return () => {}; // Cleanup function

    }, [missiles, defenseMissiles, attackAngle, defenseAngle, attackSpeed, defenseSpeed, setMissiles, setDefenseMissiles, score]);

    return (
        <canvas
            ref={canvasRef}
            id="game-canvas"
            width={800}
            height={600}
            onClick={handleCanvasClick}
        />
    );
};

export default MissileCanvas;
