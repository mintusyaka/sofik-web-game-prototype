
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

        this.isPowered = false;
        this.powerTimer = 0;
        this.powerDuration = 5000;

        this.isDebuffed = false;
        this.debuffTimer = 0;
        this.debuffDuration = 2000;
    }

    powerUp() {
        this.isPowered = true;
        this.powerTimer = this.powerDuration;
        this.isDebuffed = false;
        if (this.uiService) {
            this.uiService.updateDebuffBar(0);
        }
    }

    hitCloud() {
        if (this.isPowered) {
            this.isPowered = false;
            if (this.uiService) {
                this.uiService.updatePowerBar(0);
            }
        } else {
            this.isDebuffed = true;
            this.debuffTimer = this.debuffDuration;
        }
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

    update(time, delta) {
        if (this.isPowered) {
            this.powerTimer -= delta;
            const progress = Math.max(0, this.powerTimer / this.powerDuration);
            const seconds = Math.ceil(this.powerTimer / 1000);
            if (this.uiService) {
                this.uiService.updatePowerBar(progress, seconds);
            }

            if (this.powerTimer <= 0) {
                this.isPowered = false;
                if (this.uiService) {
                    this.uiService.updatePowerBar(0);
                }
            }
        }


        if (this.isDebuffed) {
            this.debuffTimer -= delta;
            if (this.uiService) {
                const progress = Math.max(0, this.debuffTimer / this.debuffDuration);
                const seconds = Math.ceil(this.debuffTimer / 1000);
                this.uiService.updateDebuffBar(progress, seconds);
            }

            if (this.debuffTimer <= 0) {
                this.isDebuffed = false;
                if (this.uiService) {
                    this.uiService.updateDebuffBar(0);
                }
            }
        }

        const left = this.cursors.left.isDown || (this.uiService && this.uiService.leftIsDown);
        const right = this.cursors.right.isDown || (this.uiService && this.uiService.rightIsDown);
        const jump = (this.cursors.up.isDown || (this.uiService && this.uiService.jumpIsDown)) && this.body.touching.down;

        let speed = 300;
        if (this.isPowered) {
            speed = 500;
        } else if (this.isDebuffed) {
            speed = 150;
        }

        if (left) {
            this.setVelocityX(-speed);
            this.anims.play('left', true);
            this.flipX = true;
        } else if (right) {
            this.setVelocityX(speed);
            this.anims.play('right', true);
            this.flipX = false;
        } else {
            this.setVelocityX(0);
            this.anims.play('turn');
        }

        if (jump) {
            // Jump height logic
            let jumpVelocity = -800;
            if (this.isPowered) {
                jumpVelocity = -1000;
            }
            // Could add debuff jump? user only said speed debuff.
            this.setVelocityY(jumpVelocity);
        }
    }
}
