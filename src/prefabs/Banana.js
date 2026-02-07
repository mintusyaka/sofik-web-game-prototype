
import { Item } from './Item.js';

export class Banana extends Item {
    constructor(scene, x, y) {
        super(scene, x, y, 'banana');

        this.setScale(0.05);
        this.points = 10;
    }
}
