
import { Player } from '../prefabs/Player.js';
import { ScoreService } from '../services/ScoreService.js';
import { SpawnService } from '../services/SpawnService.js';
import { Cloud } from '../prefabs/Cloud.js';
import { UIService } from '../services/UIService.js';
import { Orange } from '../prefabs/Orange.js';

export class BasicScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BasicScene' });
    }

    preload() {
        this.load.spritesheet('player', './assets/leos-animated.png', { frameWidth: 250, frameHeight: 335 });
        this.load.image('orange', './assets/orange.png');
        this.load.image('banana', './assets/banana.png');
        this.load.image('cloud', 'https://labs.phaser.io/assets/particles/cloud.png');
    }
    // ... (skip unrelated lines)
    create() {
        const { width, height } = this.scale;

        // 1. Setup Environment
        this.platforms = this.physics.add.staticGroup();
        const ground = this.add.rectangle(width / 2, height - 20, width, 40, 0x00aa00);
        this.physics.add.existing(ground, true);
        this.platforms.add(ground);

        // 4b. Setup UI (Before Player so we can pass it, or after and attach it)
        this.uiService = new UIService(this);

        // 2. Setup Player
        this.player = new Player(this, 100, 450, this.uiService);
        this.physics.add.collider(this.player, this.platforms);

        // 3. Setup Groups
        this.items = this.physics.add.group({ runChildUpdate: true }); // Important: runChildUpdate lets Item.update() run
        this.clouds = this.physics.add.group();

        // 4. Setup Services
        this.scoreService = new ScoreService(this);
        this.spawnService = new SpawnService(this);

        this.spawnService.start(this.items, this.clouds);

        // 5. Collisions / Overlaps
        this.physics.add.overlap(this.player, this.items, this.handleCollectItem, null, this);
        this.physics.add.overlap(this.player, this.clouds, this.handleHitCloud, null, this);
    }

    update(time, delta) {
        this.player.update(time, delta);

        // Cloud cleanup logic could be moved to SpawnService or Cloud class, 
        // but for now keeping it simple or verifying if Cloud handles itself.
        // Actually, Cloud class manages its specific parts but not "out of bounds" check for the whole cluster.
        // Let's keep the cloud cleanup loop here for safety or move it to a service in future cleanup.
        this.clouds.children.iterate((child) => {
            if (child) {
                if (child.x < -200 || child.x > this.scale.width + 200) {
                    child.destroy();
                }
            }
        });
    }

    handleCollectItem(player, item) {
        if (item.points < 0) {
            this.hitEffect(player);
        }

        if (item instanceof Orange && item.points > 0) {
            player.powerUp();
        }

        this.scoreService.add(item.points);
        item.destroy();
    }

    handleHitCloud(player, cloudPart) {
        if (cloudPart.parentCloud) {
            cloudPart.parentCloud.destroy();
        } else {
            cloudPart.destroy();
        }

        this.hitEffect(player);
        this.scoreService.add(-5);
        player.hitCloud();
    }

    hitEffect(player) {
        player.setTint(0xff0000);
        this.time.delayedCall(200, () => {
            player.clearTint();
        });
    }
}
