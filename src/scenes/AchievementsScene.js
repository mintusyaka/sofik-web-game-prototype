
import { AchievementService } from '../services/AchievementService.js';

export class AchievementsScene extends Phaser.Scene {
    constructor() {
        super({ key: 'AchievementsScene' });
        this.achievementService = new AchievementService();
    }

    create() {
        const { width, height } = this.scale;

        // Title
        this.add.text(width / 2, 50, 'Achievements', {
            fontSize: '48px',
            fill: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Achievement List
        const achievements = [
            { id: '100_points', title: '100 Points', description: 'Reach a score of 100.' }
        ];

        let y = 150;
        achievements.forEach(ach => {
            const isUnlocked = this.achievementService.isUnlocked(ach.id);
            const color = isUnlocked ? '#00ff00' : '#888888';
            const status = isUnlocked ? '[UNLOCKED]' : '[LOCKED]';

            this.add.text(width / 2, y, `${ach.title} - ${status}`, {
                fontSize: '24px',
                fill: color
            }).setOrigin(0.5);

            this.add.text(width / 2, y + 30, ach.description, {
                fontSize: '16px',
                fill: '#aaaaaa'
            }).setOrigin(0.5);

            y += 80;
        });

        // Back Button
        const backButton = this.add.text(width / 2, height - 50, 'Back to Menu', {
            fontSize: '24px',
            fill: '#ffffff'
        }).setOrigin(0.5).setInteractive();

        backButton.on('pointerdown', () => {
            this.scene.start('MenuScene');
        });

        backButton.on('pointerover', () => {
            backButton.setStyle({ fill: '#ff0' });
        });
        backButton.on('pointerout', () => {
            backButton.setStyle({ fill: '#ffffff' });
        });
    }
}
