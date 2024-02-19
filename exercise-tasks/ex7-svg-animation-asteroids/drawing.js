/** @format */
import svg_ from '../modules/svg-game.js';
import {Asteroid} from '../modules/objects.js';

const asteroidsNode = document.querySelector('#asteroids');

const asteroids = [new Asteroid(asteroidsNode, 'asteroid-1', 24, 50, 0.4), new Asteroid(asteroidsNode, 'asteroid-2', 24, 50, 0.5), new Asteroid(asteroidsNode, 'asteroid-3', 5, 50, 0.9)];

function initFrame(asteroidsNode, guide) {
    if (guide) {
        svg_.drawGrid(asteroidsNode);
    }
    console.log(asteroids);
    asteroids.forEach((asteroid, index) => {
        svg_.drawAsteroid(asteroidsNode, asteroid.x, asteroid.y, asteroid.radius, asteroid.segments, {noise: asteroid.noise}, asteroid.id);
    });
}

function draw() {
    asteroids.forEach((asteroid) => {
        asteroid.animateAsteroid();
    });
}

function update(elapsed) {
    asteroids.forEach((asteroid) => {
        asteroid.update(elapsed);
    });
}

let previous, elapsed;
function frame(timestamp) {
    if (!previous) previous = timestamp;
    elapsed = timestamp - previous;
    update(elapsed / 1000);
    draw();
    previous = timestamp;
    window.requestAnimationFrame(frame);
}

initFrame(asteroidsNode, true);
window.requestAnimationFrame(frame);
