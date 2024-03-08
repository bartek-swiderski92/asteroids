/** @format */
import svg_ from '../modules/svg-game.js';
import {Asteroid, Ship} from '../modules/objects.js';

const asteroidsNode = document.querySelector('#asteroids');
let asteroids = [];
for (let i = 0; i < 4; i++) {
    let asteroid = new Asteroid(Math.random() * asteroidsNode.clientWidth, Math.random() * asteroidsNode.clientHeight, `asteroid-${i}`, 2000 + Math.random() * 8000);
    asteroid.push(Math.random() * 2 * Math.PI, 2000, 60);
    asteroid.twist((Math.random() - 0.5) * 500, 60);
    asteroids.push(asteroid);
}
const ship = new Ship(300, 300);

function draw() {
    svg_.drawGrid(asteroidsNode);
    asteroids.forEach((asteroid) => {
        asteroid.draw(asteroidsNode);
    });
    ship.draw(asteroidsNode);
}

function update(elapsed) {
    // if it's nearly stopped, turn
    if (Math.abs(ship.speed()) < 15) {
        ship.angle += Math.PI * 2 * 0.01;
    }

    //if it's going fast, turn around to slow down
    if (Math.abs(ship.speed()) > 200) {
        ship.angle = ship.movementAngle() + Math.PI;
    }

    // push in the direction it's pointing (thrusters?)
    ship.push(ship.angle, 700, elapsed);

    asteroids.forEach((asteroid) => {
        asteroid.update(elapsed);
    });

    ship.update(elapsed);
}

let previous;

function frame(timestamp) {
    if (!previous) previous = timestamp;
    let elapsed = timestamp - previous;
    update(elapsed / 1000);
    previous = timestamp;

    window.requestAnimationFrame(frame);
}
draw();

window.requestAnimationFrame(frame);
