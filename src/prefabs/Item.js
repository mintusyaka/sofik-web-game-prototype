
export class Item extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.points = 0;

        this.setBounce(0.5);
        this.body.allowGravity = false;
    }

    setBad() {
        this.setTint(0x00ff00);
        this.points = -this.points;
    }

    update() {
        if (this.y > this.scene.scale.height + 50) {
            this.destroy();
        }
    }
}
