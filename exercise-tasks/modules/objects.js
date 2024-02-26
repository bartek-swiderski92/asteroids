/** @format */

import svg_ from '../modules/svg-game.js';
import svg_pacman from '../modules/svg.js';

export class Asteroid {
    constructor(asteroids, id, segments, radius, noise) {
        this.x = svg_.getRandomNumber(0, asteroids.clientWidth);
        this.y = svg_.getRandomNumber(0, asteroids.clientHeight);
        this.angle = 0;
        this.xSpeed = svg_.getRandomNumber(-asteroids.clientWidth, asteroids.clientWidth) / 2;
        this.ySpeed = svg_.getRandomNumber(-asteroids.clientHeight, asteroids.clientHeight) / 2;
        this.rotationSpeed = 2 * Math.PI * (Math.random() - 0.5);
        this.id = id;
        this.segments = segments;
        this.radius = radius;
        this.noise = noise;
        this.shape = [];
        for (let i = 0; i < segments; i++) {
            this.shape.push(Math.random() - 0.5);
        }
    }

    update = function (elapsed) {
        if (this.x - this.radius + elapsed * this.xSpeed > asteroids.clientWidth) {
            this.x = -this.radius;
        }
        if (this.x + this.radius + elapsed * this.xSpeed < 0) {
            this.x = asteroids.clientWidth + this.radius;
        }
        if (this.y - this.radius + elapsed * this.ySpeed > asteroids.clientHeight) {
            this.y = -this.radius;
        }
        if (this.y + this.radius + elapsed * this.ySpeed < 0) {
            this.y = asteroids.clientHeight + this.radius;
        }
        this.x += elapsed * this.xSpeed;
        this.y += elapsed * this.ySpeed;
        this.angle = (this.angle + elapsed * this.rotationSpeed) % (2 * Math.PI);
    };

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
