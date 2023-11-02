/** @format */
import {svg_} from '../modules/helpers.js';

const pacman = {
    x: 200,
    y: 200,
    width: 300,
    height: 300,
    cutDepth: 120,
    fill: 'yellow'
};

svg_.drawGrid();

svg_.drawCircledArc(pacman);
