
export class Cloud {
    constructor(scene, x, y, group, velocityX) {
        this.scene = scene;
        this.parts = [];

        // Create random parts (3 to 5)
        const partsCount = Phaser.Math.Between(3, 5);

        for (let i = 0; i < partsCount; i++) {
            // Random offset
            const offsetX = Phaser.Math.Between(-40, 40);
            const offsetY = Phaser.Math.Between(-20, 20);

            // Create sprite
            const part = group.create(x + offsetX, y + offsetY, 'cloud');

            // Physics setup
            part.body.allowGravity = false;
            part.setVelocityX(velocityX);

            // Random visual variation
            part.setScale(Phaser.Math.FloatBetween(0.5, 0.9));
            part.setAlpha(Phaser.Math.FloatBetween(0.8, 1.0));

            // Link back to this Cloud instance
            part.parentCloud = this;

            this.parts.push(part);
        }
    }

    destroy() {
        this.parts.forEach(part => {
            if (part.active) {
                part.destroy();
            }
        });
        this.parts = [];
    }
}
