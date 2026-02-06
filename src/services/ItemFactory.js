
import { Orange } from '../prefabs/Orange.js';
import { Banana } from '../prefabs/Banana.js';

export class ItemFactory {
    static createItem(scene, x, y, type) {
        switch (type) {
            case 'orange':
                return new Orange(scene, x, y);
            case 'banana':
                return new Banana(scene, x, y);
            default:
                console.warn(`Unknown item type: ${type}`);
                return new Orange(scene, x, y); // Default fallback
        }
    }
}
