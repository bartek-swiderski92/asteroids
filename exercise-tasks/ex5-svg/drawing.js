/** @format */
import svg_ from '../modules/svg-game.js';

const asteroids = document.querySelector('#asteroids');

svg_.drawGrid(asteroids);

// const position = 200;
// const asteroidX = 200;
// const radius = 150;
// let segments = 6;

// svg_.drawShip(asteroids, position, radius, {guide: true, curve1: 0.25, curve2: 0.75, angle: 0.2 * Math.PI});
// let x = 50;
// let y = 50;
// svg_.drawAsteroid(asteroids, x, y, radius, segments, {guide: true});

let startX = 50;
let startY = 50;
let startRadius = 45;
let segmentsL = 12;
// let noise = 0.75;

for (let y = startX; y < 450; y += startX * 2) {
    for (let x = startY; x < 450; x += startY * 2) {
        svg_.drawAsteroid(asteroids, x, y, startRadius, segmentsL, {guide: true});
        // segmentsL += 1;
    }
}

// svg_.drawAsteroid(asteroids, startX, startY, startRadius, segments, {guide: true});
