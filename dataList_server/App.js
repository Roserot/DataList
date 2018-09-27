const Model = require('./lib/Model');
const WebSocketServer = require('./WebSocketServer');
const Users = require('./lib/Users');
const User = require('./lib/User');

class App {
    /**
     * @return {App}
     */
    static get() {
        return new this();
    }

    async init() {
        if (this.__inited) return;
        this.__inited = true;

        WebSocketServer.init()
            .then(
                WebSocketServer.wsServer.on('connection', function(ws) {
                    const userHash = WebSocketServer.hashIDGen();
                    App.get().addUser(ws, userHash);
                    ws.on('close', function() {
                    App.get().deleteUser(userHash);
                    });
                })
            );
    }

    addUser(ws, userHash) {
        const user = new User(ws, userHash);
        this.__users.set(user);

        this.model(user);
    }

    deleteUser(userID) {
        this.__users.delete(userID);
    }

    model(user) {
        this.__model.initCon(user).then(
            resolve => {
                this.__model.dataRouter(resolve.results,resolve.user);
            }
        );
    }

    changeLastLineID(currentUser) {
        const id = currentUser.user.__hash;
        const currentUserInStore = this.__users.get(id);

        if (currentUserInStore.__lastLineID === 0) {
            this.__model.DBPolling(currentUser.user);
        }

        currentUserInStore.__lastLineID = currentUser.lastResultLineLineId;


    };

    /**
     * @param props
     * @return {App}
     * @private
     */
    constructor(props) {
        if (App.__instance instanceof App)
            return App.__instance;

        App.__instance = this;

        /**
         * @type {Users}
         * @private
         */
        this.__users = new Users();

        /**
         *
         * @type {Model}
         * @private
         */
        this.__model = new Model();

        this.__model.addChangeLastLineIdListener(currentUser => {this.changeLastLineID(currentUser)});

        /**
         * @type {boolean}
         * @private
         */
        this.__inited = false;
    }
    // static get(key) {
    //     return this.__getInst().__store[key];
    // }
    //
    // static add(key, val) {
    //     const App = this.__getInst();
    //
    //     if (App.__store.hasOwnProperty(key))
    //         throw new Error(`Forbidden to overwrite store data. Key: ${key}.`);
    //
    //     App.__store[key] = val;
    // }
    //
    // static delete(key) {
    //     const App = this.__getInst();
    //
    //     if (!App.__store.hasOwnProperty(key)) return;
    //
    //     delete App.__store[key];
    // }
    //
    // /**
    //  * @private
    //  */
    // constructor() {
    //     if (App.__instance instanceof App)
    //         return App.__instance;
    //
    //     App.__instance = this;
    //
    //     this.__store = {};
    // }
    //
    // /**
    //  * @return {App}
    //  */
    // static __getInst() {
    //     return new this();
    // }
}

/**
 * @type {null|App}
 * @private
 * @static
 */
App.__instance = null;

module.exports = App;