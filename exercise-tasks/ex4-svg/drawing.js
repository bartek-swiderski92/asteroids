/** @format */
import svg_ from '../modules/svg-game.js';

const asteroids = document.querySelector('#asteroids');

svg_.drawGrid(asteroids);
// svg_.drawShip(asteroids, 125, {guide: true});

// let t = asteroids.clientWidth;
// let r = Math.PI / 500;

// let path = document.querySelector('path');
// path.style.display = 'none';

const position = 200;
const radius = 150;

svg_.drawShip(asteroids, position, radius, {guide: true, curve1: 0.25, curve2: 0.75});

// // transforming ships across the grid
// const ogShip = document.querySelector('.ship');
// const ogCircle = document.querySelector('.guide-circle');
// const ogGuideLine = document.querySelector('.guide-line');
// const ogGuidePoint = document.querySelector('.guide-line-point');
// const svgObjects = [ogShip, ogCircle, ogGuideLine, ogGuidePoint];
// let rotateValue = 0;
// for (let y = 0; y < 400; y += position * 2) {
//     for (let x = 0; x < 400; x += position * 2) {
//         if (y === 0 && x === 0) continue;
//         rotateValue += 1.5;
//         svgObjects.forEach((element) => {
//             svg_.rotateElement(asteroids, element, position, x, y, rotateValue);
//         });
//     }
// }
