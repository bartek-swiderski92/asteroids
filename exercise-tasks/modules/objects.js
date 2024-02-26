/** @format */

import svg_ from '../modules/svg-game.js';
import svg_pacman from '../modules/svg.js';

export class Mass {
    constructor(x, y, mass, radius, angle, xSpeed, ySpeed, rotationSpeed) {
        this.x = x;
        this.y = y;
        this.mass = mass || 1;
        this.radius = radius || 50;
        this.angle = angle || 0;
        this.xSpeed = xSpeed || 0;
        this.ySpeed = ySpeed || 0;
        this.rotationSpeed = rotationSpeed || 0;
    }

    update(elapsed, asteroidsNode) {
        this.x += this.xSpeed * elapsed;
        this.y += this.ySpeed * elapsed;
        this.angle += this.rotationSpeed * elapsed;
        this.angle %= 2 * Math.PI;
        if (this.x - this.radius > asteroidsNode.clientWidth) {
            this.x = -this.radius;
        }
        if (this.x + this.radius < 0) {
            this.x = asteroidsNode.clientWidth + this.radius;
        }
        if (this.y - this.radius > asteroidsNode.clientHeight) {
            this.y = -this.radius;
        }
        if (this.y + this.radius < 0) {
            this.y = asteroidsNode.clientHeight + this.radius;
        }
    }

    push(angle, force, elapsed) {
        this.xSpeed += (elapsed * (Math.cos(angle) * force)) / this.mass;
        this.ySpeed += (elapsed * (Math.sin(angle) * force)) / this.mass;
    }

    twist(force, elapsed) {
        this.rotationSpeed += (elapsed * force) / this.mass;
    }

    speed() {
        return Math.sqrt(Math.pow(this.xSpeed, 2) + Math.pow(this.ySpeed, 2));
    }

    movementAngle() {
        return Math.atan2(this.ySpeed, this.xSpeed);
    }

    draw(asteroids) {
        //TODO: finish method for the svg
        const obj = svg_.drawCircle(this.x, this.y, this.radius, 'circle');
        asteroids.appendChild(obj);
    }
}

export class Asteroid extends Mass {
    constructor(x, y, id, mass, xSpeed, ySpeed, rotationSpeed) {
        let density = 1; //kg per square pixel
        let radius = Math.sqrt(mass / density / Math.PI);
        super(x, y, mass, radius, xSpeed, ySpeed, rotationSpeed);
        this.id = id;
        this.circumference = 2 * Math.PI * this.radius;
        this.segments = Math.ceil(this.circumference / 15);
        this.segments = Math.min(25, Math.max(5, this.segments));
        this.noise = 0.4;
        this.shape = [];
        for (let i = 0; i < this.segments; i++) {
            this.shape.push(2 * Math.random() - 0.5);
        }
    }
    // constructor(asteroids, id, segments, radius, noise) {
    //     this.x = svg_.getRandomNumber(0, asteroids.clientWidth);
    //     this.y = svg_.getRandomNumber(0, asteroids.clientHeight);
    //     this.angle = 0;
    //     this.xSpeed = svg_.getRandomNumber(-asteroids.clientWidth, asteroids.clientWidth) / 2;
    //     this.ySpeed = svg_.getRandomNumber(-asteroids.clientHeight, asteroids.clientHeight) / 2;
    //     this.rotationSpeed = 2 * Math.PI * (Math.random() - 0.5);
    //     this.id = id;
    //     this.segments = segments;
    //     this.radius = radius;
    //     this.noise = noise;
    //     this.shape = [];
    //     for (let i = 0; i < segments; i++) {
    //         this.shape.push(Math.random() - 0.5);
    //     }
    // }
    draw(asteroidsNode) {
        svg_.drawAsteroid(asteroidsNode, this.x, this.y, this.radius, this.segments, {noise: this.noise}, this.id);
    }
    // update = function (elapsed) {
    //     if (this.x - this.radius + elapsed * this.xSpeed > asteroids.clientWidth) {
    //         this.x = -this.radius;
    //     }
    //     if (this.x + this.radius + elapsed * this.xSpeed < 0) {
    //         this.x = asteroids.clientWidth + this.radius;
    //     }
    //     if (this.y - this.radius + elapsed * this.ySpeed > asteroids.clientHeight) {
    //         this.y = -this.radius;
    //     }
    //     if (this.y + this.radius + elapsed * this.ySpeed < 0) {
    //         this.y = asteroids.clientHeight + this.radius;
    //     }
    //     this.x += elapsed * this.xSpeed;
    //     this.y += elapsed * this.ySpeed;
    //     this.angle = (this.angle + elapsed * this.rotationSpeed) % (2 * Math.PI);
    // };

    animateAsteroid = function () {
        // console.log(this);
        let asteroidNode = document.querySelector(`#${this.id}`);
        asteroidNode.setAttribute('style', `transform: translate(${this.x}px, ${this.y}px) rotate(${this.angle}rad)`);
    };
}

export class PacMan {
    constructor(x, y, radius, speed) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.mouthAngle = 0;
        this.xSpeed = speed;
        this.ySpeed = speed;
        this.time = 0;
        this.mouth = 0;
        this.fill = 'yellow';
    }

    update = function (elapsed) {};
    draw = function (elapsed) {
        svg_pacman.drawPacman(this);
    };
}
