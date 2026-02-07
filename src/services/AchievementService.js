
export class AchievementService {
    constructor() {
        this.storageKey = 'sofik_game_achievements';
        this.achievements = this.load();
    }

    load() {
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : {};
    }

    save() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.achievements));
    }

    unlock(id) {
        if (!this.achievements[id]) {
            this.achievements[id] = true;
            this.save();
            return true; // Newly unlocked
        }
        return false; // Already unlocked
    }

    isUnlocked(id) {
        return !!this.achievements[id];
    }

    reset() {
        this.achievements = {};
        this.save();
    }
}
