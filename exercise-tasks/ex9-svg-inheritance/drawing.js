/** @format */
import svg_ from '../modules/svg-game.js';
import {Asteroid} from '../modules/objects.js';

const asteroidsNode = document.querySelector('#asteroids');
const asteroid = new Asteroid(100, 100, 'asteroid', 10000);
svg_.drawGrid(asteroidsNode);

function draw() {
    asteroid.draw(asteroidsNode);
}

function update(elapsed) {}

let previous;

function frame(timestamp) {
    if (!previous) previous = timestamp;
    let elapsed = timestamp - previous;
    update(elapsed / 1000);
    previous = timestamp;
    // window.requestAnimationFrame(frame);
}
draw();
window.requestAnimationFrame(frame);
