class User {
    constructor(ws, userHash, lastLineID = 0) {
        this.__hash = userHash;
        this.__lastLineID = lastLineID;
        this.__ws = ws;
    }
    getHash() {
        return this.__hash;
    }
}

module.exports = User;
