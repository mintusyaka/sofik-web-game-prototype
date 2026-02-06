
import { Item } from './Item.js';

export class Orange extends Item {
    constructor(scene, x, y) {
        super(scene, x, y, 'orange');

        this.setScale(0.12);
        this.points = 2;
    }
}
