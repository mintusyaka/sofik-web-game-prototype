
export class UIService {
    constructor(scene) {
        this.scene = scene;
        this.leftIsDown = false;
        this.rightIsDown = false;
        this.jumpIsDown = false;

        this.jumpIsDown = false;

        // Check if running on mobile
        const isMobile = !this.scene.sys.game.device.os.desktop;

        if (isMobile) {
            this.createControls();
        }
    }

    createControls() {
        // Ensure multi-touch is enabled (Phaser supports 2 pointers by default, we make sure)
        this.scene.input.addPointer(1);

        // Visual distinction for zones (optional, subtle lines)
        const { width, height } = this.scene.scale;
        this.scene.add.line(0, 0, width / 2, 0, width / 2, height, 0xffffff, 0.1).setOrigin(0, 0).setScrollFactor(0).setVisible(false);

        // Input Events
        this.scene.input.on('pointerdown', this.handlePointerDown, this);
        this.scene.input.on('pointermove', this.handlePointerMove, this);
        this.scene.input.on('pointerup', this.handlePointerUp, this);
        this.scene.input.on('pointerout', this.handlePointerUp, this);

        // Helper to track swipe start positions per pointer ID
        this.pointerStarts = {};
    }

    handlePointerDown(pointer) {
        this.pointerStarts[pointer.id] = { x: pointer.x, y: pointer.y };
        this.checkInput(pointer);
    }

    handlePointerMove(pointer) {
        // Update movement direction based on current position
        this.checkInput(pointer);

        // Check for Swipe Up
        const start = this.pointerStarts[pointer.id];
        if (start && !start.swiped) {
            const diffY = start.y - pointer.y;
            if (diffY > 50) { // Swipe Up threshold
                this.jumpIsDown = true;
                start.swiped = true; // Mark as swiped to prevent multiple triggers

                // Auto-reset jump after a short delay
                if (this.scene) {
                    this.scene.time.delayedCall(200, () => {
                        this.jumpIsDown = false;
                    });
                } else {
                    this.jumpIsDown = false;
                }
            }
        }
    }

    handlePointerUp(pointer) {
        delete this.pointerStarts[pointer.id];

        // Re-evaluate inputs based on remaining active pointers
        this.leftIsDown = false;
        this.rightIsDown = false;

        // Check all active pointers to maintain movement state
        const pointers = [this.scene.input.pointer1, this.scene.input.pointer2, this.scene.input.activePointer];

        pointers.forEach(p => {
            if (p.isDown) {
                this.checkInput(p);
            }
        });
    }

    checkInput(pointer) {
        const { width } = this.scene.scale;

        // Simple screen half check
        if (pointer.x < width / 2) {
            this.leftIsDown = true;
            this.rightIsDown = false; // Priority to left if conflicts? Or handle multi-touch gracefully
            // Actually, if ONE pointer is left, we go left.
        } else {
            this.rightIsDown = true;
            this.leftIsDown = false;
        }
    }
}
