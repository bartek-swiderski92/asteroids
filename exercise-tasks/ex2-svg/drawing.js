/** @format */
import data from '../data/shapes.json' assert {type: 'json'};
import {svg_} from '../modules/helpers.js';

const shapes = data.shapes;

svg_.drawGrid();
// svg_.drawStraightShapes(shapes);
svg_.drawCurvedShapes(shapes);
