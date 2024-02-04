/** @format */
import svg_ from '../modules/svg-game.js';

const asteroids = document.querySelector('#asteroids');

let radius = 50;
let x = 0;
// let startX = 0;
let startX = svg_.getRandomNumber(radius, asteroids.clientWidth - radius);
let xSpeed = 1;
let increasingX = true;

let y = 0;
let ySpeed = 1;
let increasingY = true;
let gravity = 0.1;

svg_.drawGrid(asteroids);
let circleEl = svg_.drawCircle(startX, radius, radius, 'circle', 'black', 'white', 1.5);
asteroids.appendChild(circleEl);

function frame() {
    draw();
    update();
}

function update() {
    x += 1;
    y += ySpeed;
    ySpeed += gravity;

    if (y >= asteroids.clientHeight - radius * 2) {
        //if you hit bottom
        ySpeed *= -0.95; // move up instead of down
    }
}

function draw() {
    let circle = document.querySelector('.circle');
    circle.setAttribute('style', `transform: translate(${x}px, ${y}px)`);
}

setInterval(frame, 1000 / 60);

// ----- > Bouncing ball < -----
// import svg_ from '../modules/svg-game.js';

// const asteroids = document.querySelector('#asteroids');

// let radius = 50;
// let x = 0;
// let startX = svg_.getRandomNumber(radius, asteroids.clientWidth - radius);
// let increasingX = true;
// let y = 0;
// let increasingY = true;
// let currentSpeed = 1;
// let acceleration = 1.02;

// svg_.drawGrid(asteroids);
// let circleEl = svg_.drawCircle(startX, radius, radius, 'circle', 'black', 'white', 1.5);
// asteroids.appendChild(circleEl);
// function frame() {
//     draw();
//     update();
// }

// function update() {
//     x = increasingX ? x + currentSpeed : x - currentSpeed;
//     y = increasingY ? y + currentSpeed : y - currentSpeed;

//     if (y >= asteroids.clientHeight - radius * 2 || y <= 0) {
//         increasingY = !increasingY;
//         currentSpeed *= acceleration;
//     }

//     if (x + startX + radius >= asteroids.clientWidth || x + startX - radius <= 0) {
//         increasingX = !increasingX;
//         currentSpeed *= acceleration;
//     }
// }

// function draw() {
//     let circle = document.querySelector('.circle');
//     circle.setAttribute('style', `transform: translate(${x}px, ${y}px)`);
// }

// setInterval(frame, 1000 / 60);
