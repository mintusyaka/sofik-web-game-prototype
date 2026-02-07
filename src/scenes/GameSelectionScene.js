
export class GameSelectionScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameSelectionScene' });
    }

    preload() {
        // We can load specific assets here if needed, or rely on global assets
    }

    create() {
        const { width, height } = this.scale;

        // Title
        this.add.text(width / 2, 50, 'Select Game', {
            fontSize: '48px',
            fill: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Grid Configuration
        const cardWidth = 300;
        const cardHeight = 400; // vertical card
        const padding = 20;
        const cols = 3;
        const startX = (width - (cols * cardWidth + (cols - 1) * padding)) / 2 + cardWidth / 2;
        const startY = 150 + cardHeight / 2;

        const games = [
            { id: 'game1', title: 'СИЛА', color: 0x87CEEB, description: 'Power Up Game' },
            { id: 'game2', title: 'Game 2', color: 0x888888, description: 'Coming Soon' }, // Placeholder
            { id: 'game3', title: 'Game 3', color: 0x888888, description: 'Coming Soon' },
            { id: 'game4', title: 'Game 4', color: 0x888888, description: 'Coming Soon' },
            { id: 'game5', title: 'Game 5', color: 0x888888, description: 'Coming Soon' },
            { id: 'game6', title: 'Game 6', color: 0x888888, description: 'Coming Soon' }
        ];

        games.forEach((game, index) => {
            const col = index % cols;
            const row = Math.floor(index / cols);
            const x = startX + col * (cardWidth + padding);
            const y = startY + row * (cardHeight + padding);

            this.createCard(x, y, cardWidth, cardHeight, game);
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

    createCard(x, y, width, height, game) {
        const card = this.add.container(x, y);

        // Background - Rounded Rectangle (approximated with graphics)
        const bg = this.add.graphics();
        bg.fillStyle(game.color, 1);
        bg.fillRoundedRect(-width / 2, -height / 2, width, height, 20);

        // Interactive Zone
        const zone = this.add.zone(0, 0, width, height).setInteractive();

        // Blue Badge "СИЛА"
        const badgeWidth = 120;
        const badgeHeight = 40;
        const badge = this.add.graphics();
        badge.fillStyle(0x0055aa, 1); // Dark Blue
        badge.fillRoundedRect(-badgeWidth / 2, -height / 2 + 20, badgeWidth, badgeHeight, 20);

        const badgeText = this.add.text(0, -height / 2 + 40, game.title, {
            fontSize: '20px',
            fill: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Description Text
        const descText = this.add.text(0, -50, "Я хоробре левеня,\nзнаю, як подарувати\nтобі справжню силу духу.", {
            fontSize: '18px',
            fill: '#000000',
            align: 'center',
            wordWrap: { width: width - 40 }
        }).setOrigin(0.5);

        // Lion Placeholder (Using existing Player sprite if loaded, else use circle)
        // Since we are not sure if 'player' is loaded here (MenuScene generally doesn't load game assets)
        // We will just use a circle placeholder or load the assets in preload if needed.
        // For now, let's assume we can use a colored circle or emoji.
        const lion = this.add.text(0, 100, '🦁', { fontSize: '64px' }).setOrigin(0.5);


        card.add([bg, badge, badgeText, descText, lion, zone]);

        zone.on('pointerdown', () => {
            if (game.id === 'game1') {
                this.scene.start('BasicScene');
            } else {
                console.log('Game not implemented yet');
            }
        });

        // Hover Effect
        zone.on('pointerover', () => {
            bg.clear();
            bg.fillStyle(0xffffff, 1);
            bg.fillRoundedRect(-width / 2, -height / 2, width, height, 20);
        });
        zone.on('pointerout', () => {
            bg.clear();
            bg.fillStyle(game.color, 1);
            bg.fillRoundedRect(-width / 2, -height / 2, width, height, 20);
        });
    }
}
