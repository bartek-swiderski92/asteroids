/** @format */

/** @format */
import canvas_ from '../modules/canvas.js';

const context = document.getElementById('asteroids').getContext('2d');
canvas_.drawGrid(context);

let segments = 15;
let noise = 0;
let shape = [];
for (let i = 0; i < segments; i++) {
    shape.push(2 * (Math.random() - 0.5));
}

for (let y = 0.1; y < 1; y += 0.2) {
    for (let x = 0.1; x < 1; x += 0.2) {
        context.save();
        context.translate(context.canvas.width * x, context.canvas.height * y);
        canvas_.drawAsteroid(context, context.canvas.width / 16, shape, {guide: true, noise: noise});
        context.restore();
        noise += 0.025;
    }
}
