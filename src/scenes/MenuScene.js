
export class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    create() {
        const { width, height } = this.scale;

        // Title
        this.add.text(width / 2, height / 3, 'Overlord Rising', {
            fontSize: '64px',
            fill: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Play Button
        const playButton = this.add.text(width / 2, height / 2, 'Play Game', {
            fontSize: '32px',
            fill: '#0f0',
            fontStyle: 'bold'
        }).setOrigin(0.5).setInteractive();

        playButton.on('pointerdown', () => {
            this.scene.start('BasicScene');
        });

        playButton.on('pointerover', () => {
            playButton.setStyle({ fill: '#ff0' });
        });
        playButton.on('pointerout', () => {
            playButton.setStyle({ fill: '#0f0' });
        });


        // Achievements Button
        const achievementsButton = this.add.text(width / 2, height / 2 + 60, 'Achievements', {
            fontSize: '32px',
            fill: '#0f0',
            fontStyle: 'bold'
        }).setOrigin(0.5).setInteractive();

        achievementsButton.on('pointerdown', () => {
            this.scene.start('AchievementsScene');
        });

        achievementsButton.on('pointerover', () => {
            achievementsButton.setStyle({ fill: '#ff0' });
        });
        achievementsButton.on('pointerout', () => {
            achievementsButton.setStyle({ fill: '#0f0' });
        });
    }
}
