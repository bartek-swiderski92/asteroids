/** @format */
import svg_ from '../modules/svg.js';

const pacman = {
    x: 200,
    y: 200,
    radius: 150,
    mouthAngle: 45,
    fill: 'yellow'
};

svg_.drawGrid();
// svg_.drawPacman(pacman);
svg_.animatePacman(pacman, 5);
