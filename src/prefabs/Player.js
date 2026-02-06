
export class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, uiService) {
        super(scene, x, y, 'player');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.uiService = uiService;

        this.setScale(0.3);
        this.setBounce(0.1);
        this.setCollideWorldBounds(true);

        this.createAnimations(scene);
        this.cursors = scene.input.keyboard.createCursorKeys();
    }

    createAnimations(scene) {
        if (!scene.anims.exists('left')) {
            scene.anims.create({
                key: 'left',
                frames: scene.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
                frameRate: 10,
                repeat: -1
            });
        }

        if (!scene.anims.exists('turn')) {
            scene.anims.create({
                key: 'turn',
                frames: [{ key: 'player', frame: 0 }],
                frameRate: 20
            });
        }

        if (!scene.anims.exists('right')) {
            scene.anims.create({
                key: 'right',
                frames: scene.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
                frameRate: 10,
                repeat: -1
            });
        }
    }

    update() {
        const left = this.cursors.left.isDown || (this.uiService && this.uiService.leftIsDown);
        const right = this.cursors.right.isDown || (this.uiService && this.uiService.rightIsDown);
        const jump = (this.cursors.up.isDown || (this.uiService && this.uiService.jumpIsDown)) && this.body.touching.down;

        if (left) {
            this.setVelocityX(-300);
            this.anims.play('left', true);
            this.flipX = true;
        } else if (right) {
            this.setVelocityX(300);
            this.anims.play('right', true);
            this.flipX = false;
        } else {
            this.setVelocityX(0);
            this.anims.play('turn');
        }

        if (jump) {
            this.setVelocityY(-800);
        }
    }
}
