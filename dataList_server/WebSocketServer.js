class WebSocketServer {
    static async init() {
        const webSocketServer = new require('ws');
        this.wsServer = new webSocketServer.Server({port: '3000'});
    }

    static hashIDGen() {
        return '_' + Math.random().toString(32).substr(2, 20);
    }
}

module.exports = WebSocketServer;