class Lock {
    constructor() {
        this.queue = [];
        this.locked = false;
    }

    acquire() {
        const ticket = new Promise(resolve => this.queue.push(resolve));
        if (!this.locked) {
            this.locked = true;
            this.queue.shift()();
        }
        return ticket;
    }

    release() {
        if (this.queue.length > 0) {
            this.queue.shift()();
        } else {
            this.locked = false;
        }
    }
}

module.exports = Lock;
