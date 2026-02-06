
export class ScoreService {
    constructor(scene) {
        this.scene = scene;
        this.score = 0;

        this.scoreText = scene.add.text(16, 16, 'Score: 0', {
            fontSize: '32px',
            fill: '#ffffff',
            fontStyle: 'bold'
        });
    }

    add(points) {
        this.score += points;
        this.scoreText.setText('Score: ' + this.score);
    }

    getScore() {
        return this.score;
    }
}
