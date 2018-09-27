const User = require('./User');

class Users {
    constructor() {
        this.__users = new Map();
    }

    /**
     * @param {User} user
     */
    set(user) {
        this.__users.set(user.getHash(), user);
    }

    delete(userID) {
        this.__users.delete(userID);
    }
    /**
     * @param userHash
     * @return {User|undefined}
     */
    get(userHash) {
        return this.__users.get(userHash);
    }
}

module.exports = Users;