// Missile.js
class Missile {
    constructor(x, y, width, height, color, velocity, angle, gravity) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.velocity = velocity;
        this.angle = angle;
        this.gravity = gravity;
        this.t = 0;
    }

    updatePosition() {
        this.t += 0.01;
        const velocityX = Math.cos(this.angle * Math.PI / 180) * this.velocity;
        const velocityY = Math.sin(this.angle * Math.PI / 180) * this.velocity;
        this.x += velocityX;
        this.y += velocityY + this.gravity * this.t;
    }

    draw(context) {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }

    checkCollision(otherMissile) {
        return (
            this.x < otherMissile.x + otherMissile.width &&
            this.x + this.width > otherMissile.x &&
            this.y < otherMissile.y + otherMissile.height &&
            this.y + this.height > otherMissile.y
        );
    }
}

export default Missile;
