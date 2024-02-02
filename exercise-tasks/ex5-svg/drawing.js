/** @format */
import svg_ from '../modules/svg-game.js';

const asteroids = document.querySelector('#asteroids');

svg_.drawGrid(asteroids);

const position = 200;
const asteroidX = 200;
const radius = 150;
// let segments = 6;

// svg_.drawShip(asteroids, position, radius, {guide: true, curve1: 0.25, curve2: 0.75, angle: 0.2 * Math.PI});
let x = 50;
let y = 50;
// svg_.drawAsteroid(asteroids, x, y, radius, segments, {guide: true});

let startX = 100;
let startY = 100;
let startRadius = 80;
let segments = 3;

for (let y = startX; y < 450; y += startX * 2) {
    for (let x = startY; x < 450; x += startY * 2) {
        svg_.drawAsteroid(asteroids, x, y, startRadius, segments, {guide: true});
        segments += 2;
    }
}

// svg_.drawAsteroid(asteroids, startX, startY, startRadius, segments, {guide: true});
