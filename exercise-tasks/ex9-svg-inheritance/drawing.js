/** @format */
import svg_ from '../modules/svg-game.js';
import {Mass, Asteroid} from '../modules/objects.js';

const asteroidsNode = document.querySelector('#asteroids');
const mass = new Mass(asteroidsNode.clientWidth / 2, asteroidsNode.clientHeight / 2, 10, 20);
const asteroid = new Asteroid(100, 100, 'asteroid', 10000);
svg_.drawGrid(asteroidsNode);

function draw() {
    mass.draw(asteroidsNode);
    asteroid.draw(asteroidsNode);
}

function update(elapsed) {
    mass.update(elapsed, asteroidsNode);
}

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
