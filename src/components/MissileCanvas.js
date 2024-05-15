import React, { useRef, useEffect } from 'react';

const MissileCanvas = ({
                           handleCanvasClick,
                           missiles,
                           defenseMissiles,
                           attackAngle,
                           defenseAngle,
                           attackSpeed,
                           defenseSpeed,
                           setMissiles,
                           setDefenseMissiles,
                           score,
                           setScore
                       }) => {
    const canvasRef = useRef(null);
    const gravity = 0.1; // Adjust gravity strength as needed

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        let animationFrameId;

        const animate = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);

            // Draw Defense Interceptor
            context.fillStyle = 'yellow';
            context.beginPath();
            context.arc(canvas.width / 2, canvas.height / 2, 10, 0, Math.PI * 2);
            context.fill();

            // Update and draw Defense Missiles
            for (let dIndex = defenseMissiles.length - 1; dIndex >= 0; dIndex--) {
                let defenseMissile = defenseMissiles[dIndex];
                defenseMissile.updatePosition();
                defenseMissile.draw(context);


                // Check collision with attack missiles
                for (let aIndex = missiles.length - 1; aIndex >= 0; aIndex--) {
                    const missile = missiles[aIndex];
                    if (
                        defenseMissile.x < missile.x + missile.width &&
                        defenseMissile.x + defenseMissile.width > missile.x &&
                        defenseMissile.y < missile.y + missile.height &&
                        defenseMissile.y + defenseMissile.height > missile.y
                    ) {
                        // Collision detected, increase score and remove both missiles
                        setScore(score => score + 1);
                        missiles.splice(aIndex, 1);
                        defenseMissiles.splice(dIndex, 1);
                        break; // Break to avoid further iteration after removal
                    }
                }
            }

            // Update and draw Attack Missiles
            for (let aIndex = missiles.length - 1; aIndex >= 0; aIndex--) {
                const missile = missiles[aIndex];
                missile.updatePosition();
                missile.draw(context);

                // Remove missile if it reaches the bottom of the canvas
                if (missile.y > canvas.height) {
                    missiles.splice(aIndex, 1);
                }
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationFrameId); // Cleanup function
        };
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
