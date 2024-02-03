/** @format */

import canvas_ from '../modules/canvas.js';

const context = document.getElementById('asteroids').getContext('2d');
context.strokeStyle = 'white';
context.lineWidth = 1.5;
let x = 120,
    y = 0,
    ySpeed = 0,
    gravity = 0.1;

function frame() {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    draw(context);
    update();
}

function update() {
    x += 0.1;
    y += ySpeed;
    ySpeed += gravity;
    if (y >= context.canvas.height) {
        ySpeed *= -0.9;
        y = context.canvas.height;
    }
}

function draw(context) {
    canvas_.drawGrid(context);
    context.beginPath();
    context.arc(x, y, 40, 0, 2 * Math.PI);
    context.fill();
    context.stroke();
}

// setInterval(frame, 1000 / 60);
