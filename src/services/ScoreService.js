
import { AchievementService } from './AchievementService.js';

export class ScoreService {
    constructor(scene) {
        this.scene = scene;
        this.score = 0;

        this.achievementShown = false;
        this.achievementService = new AchievementService();

        this.scoreText = scene.add.text(16, 16, 'Score: 0', {
            fontSize: '32px',
            fill: '#ffffff',
            fontStyle: 'bold'
        });
    }

    add(points) {
        this.score += points;
        this.scoreText.setText('Score: ' + this.score);

        if (this.score >= 100 && !this.achievementShown) {
            this.achievementService.unlock('100_points');

            this.achievementShown = true;
            if (this.scene.uiService) {
                this.scene.uiService.showAchievement('ACHIEVEMENT UNLOCKED!\n100 POINTS');
            }
        }
    }

    getScore() {
        return this.score;
    }
}
