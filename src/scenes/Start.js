export class Start extends Phaser.Scene {
    constructor() {
        // Ключ має збігатися з назвою, яку Phaser шукає в масиві scene
        super({ key: 'Start' });
    }

    preload() {
        // Завантаження ресурсів (використовуємо плейсхолдери для тесту)
        this.load.image('ground', 'https://labs.phaser.io/assets/sprites/platform.png');
        this.load.image('orange', 'https://labs.phaser.io/assets/sprites/orange.png');
        this.load.image('dude', 'https://labs.phaser.io/assets/sprites/phaser-dude.png');
    }

    create() {
        // Отримуємо розміри з конфігу для зручності
        const { width, height } = this.scale;

        // 1. Створюємо статичну групу для підлоги
        this.platforms = this.physics.add.staticGroup();

        // Розміщуємо підлогу знизу по центру (1280 / 2 = 640)
        // Масштабуємо її, щоб закрити всю ширину
        this.platforms.create(640, height - 32, 'ground').setScale(3.5, 2).refreshBody();

        // 2. Створюємо гравця
        this.player = this.physics.add.sprite(100, height - 150, 'dude');
        this.player.setBounce(0.1);
        this.player.setCollideWorldBounds(true);

        // 3. Створюємо апельсини
        this.oranges = this.physics.add.group({
            key: 'orange',
            repeat: 11, // Створити 12 штук (0 + 11)
            setXY: { x: 50, y: 0, stepX: 110 }
        });

        this.oranges.children.iterate((child) => {
            // Випадковий відскок для кожного апельсина
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });

        // 4. Текст рахунку
        this.score = 0;
        this.scoreText = this.add.text(32, 32, 'Oranges: 0', {
            fontSize: '40px',
            fill: '#ffa500',
            fontStyle: 'bold'
        });

        // 5. Управління
        this.cursors = this.input.keyboard.createCursorKeys();

        // 6. Фізична взаємодія
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.oranges, this.platforms);

        // Перевірка на збирання
        this.physics.add.overlap(this.player, this.oranges, this.collectOrange, null, this);
    }

    update() {
        // Рух вліво/вправо
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-200);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(200);
        } else {
            this.player.setVelocityX(0);
        }

        // Стрибок
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-450); // Трохи потужніше для висоти 720
        }
    }

    collectOrange(player, orange) {
        orange.disableBody(true, true); // Видалити апельсин з екрана

        this.score += 1;
        this.scoreText.setText(`Oranges: ${this.score}`);

        // Якщо всі зібрані — можна знову їх "скинути"
        if (this.oranges.countActive(true) === 0) {
            this.oranges.children.iterate((child) => {
                child.enableBody(true, child.x, 0, true, true);
            });
        }
    }
}