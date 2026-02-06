
import { ItemFactory } from './ItemFactory.js';
import { Cloud } from '../prefabs/Cloud.js';

export class SpawnService {
    constructor(scene) {
        this.scene = scene;
    }

    start(itemGroup, cloudGroup) {
        // Spawn items every 1000ms
        this.scene.time.addEvent({
            delay: 1000,
            callback: () => this.spawnItem(itemGroup),
            callbackScope: this,
            loop: true
        });

        // Spawn cloud every 5000ms
        this.scene.time.addEvent({
            delay: 5000,
            callback: () => this.spawnCloud(cloudGroup),
            callbackScope: this,
            loop: true
        });
    }

    spawnItem(group) {
        const x = Phaser.Math.Between(50, this.scene.scale.width - 50);
        const type = Phaser.Math.RND.pick(['orange', 'banana']);

        const item = ItemFactory.createItem(this.scene, x, -50, type);
        group.add(item);

        // Re-apply physics settings because group.add() might reset them
        item.body.allowGravity = false;
        item.setVelocityY(200);
        item.setAngularVelocity(100);

        // Random chance (30%) to be bad
        if (Phaser.Math.Between(1, 100) <= 30) {
            item.setBad();
        }
    }

    spawnCloud(group) {
        const { width, height } = this.scene.scale;
        const y = Phaser.Math.Between(height / 2, height - 150);
        const side = Phaser.Math.Between(0, 1);

        let x, velocityX;

        if (side === 0) {
            x = -150;
            velocityX = 150;
        } else {
            x = width + 150;
            velocityX = -150;
        }

        new Cloud(this.scene, x, y, group, velocityX);
    }
}
