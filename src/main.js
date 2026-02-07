import { Start } from './scenes/Start.js';
import { BasicScene } from './scenes/BasicScene.js';
import { MenuScene } from './scenes/MenuScene.js';
import { AchievementsScene } from './scenes/AchievementsScene.js';

const config = {
    type: Phaser.AUTO,
    title: 'Overlord Rising',
    description: '',
    parent: 'game-container',
    width: 1280,
    height: 720,
    backgroundColor: '#000000',
    pixelArt: false,
    scene: [
        MenuScene,
        BasicScene,
        AchievementsScene,
        Start
    ],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1500 },
            debug: false
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
}

new Phaser.Game(config);
