/** @format */
import canvas_ from '../modules/canvas.js';

const context = document.getElementById('asteroids').getContext('2d');
// drawGrid(context);

// context.lineWidth = 0.5;
// context.strokeStyle = 'white';
// let x = context.canvas.width * 0.9;
// let y = 0;
// let radius = context.canvas.width * 0.1;

canvas_.drawGrid(context);

// for (let r = 0; r <= 0.5 * Math.PI; r += 0.05 * Math.PI) {
//     context.save();
//     context.rotate(r);
//     canvas_.drawShip(context, x, y, radius, {guide: true});
//     context.beginPath();
//     context.moveTo(0, 0);
//     context.lineTo(x, 0);
//     context.stroke();
//     context.restore();
// }

// let t = context.canvas.width / 20;
// let r = Math.PI / 500;
// context.translate(0, t);
// for (let i = 0; i <= 50; i++) {
//     context.rotate(i * r);
//     canvas_.drawShip(context, t, {guide: true, lineWidth: 1});
//     context.translate(t, 0);
// }

// let x,
//     y,
//     angle = 0;

// let w = context.canvas.width;
// let h = context.canvas.height;
// for (y = h / 20; y < h; y += h / 10) {
//     for (x = w / 20; x < w; x += w / 20) {
//         context.save();
//         context.translate(x, y);
//         context.rotate(angle);
//         canvas_.drawShip(context, w / 30, {guide: true, lineWidth: 1});
//         context.restore();
//         angle += 0.0065 * Math.PI;
//     }
// }
// context.translate(200, 200);
// canvas_.drawShip(context, 150, {curve1: Math.random(), curve2: Math.random(), guide: true});

let c1 = 0,
    c2 = 0;
for (c1 = 0.1; c1 < 1; c1 += 0.2) {
    for (c2 = 0.1; c2 < 1; c2 += 0.2) {
        context.save();
        context.translate(context.canvas.width * c1, context.canvas.height * c2);
        context.rotate(-Math.PI / 2);
        canvas_.drawShip(context, context.canvas.width / 12, {curve1: c1, curve2: c2, guide: false});
        context.restore();
    }
}
