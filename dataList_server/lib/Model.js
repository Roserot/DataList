const config = require('../Config');
const mysql = require('mysql');
const emitter = require('./ListenersStore');
const gameCode = config.model().gameCode;
const db = config.model().dataBase;
const pool = mysql.createPool(db);

class Model {
    constructor() {
        this.__listenersStore = new emitter;
    }

    addChangeLastLineIdListener(listener) {
        this.__listenersStore.add('change-LastLineId', listener);
    }

    static makeSql(gameCode, lastLineId) {
        return `SELECT \`id\`, \`vals\`, \`born_timestamp\`
                    FROM \`games_features_values\`
                     WHERE \`game_code\` = ${gameCode}
                        AND \`id\` > ${lastLineId}
                     ORDER BY \`id\``;
    }

    initCon(user) {
        return new Promise(function (resolve, reject) {
            pool.getConnection((err, connection) => {
                if (err) throw err;
                    const lastLineId = user.__lastLineID;
                    const sql = Model.makeSql(gameCode, lastLineId);
                    connection.query(sql, function (error, results) {
                        if (results) return resolve({
                            results,
                            user
                        });
                        error = error || new Error(`Failed to get results.`);
                        return reject(error);
                    });
                    connection.release();
            });
        });
    }

    dataRouter (results,user) {
        Model.dataUpdate(results)
            .then(updatedData => {
                Model.messageClient(updatedData,user);

                const lastResultLine = results && results[results.length - 1] || null;
                const lastResultLineLineId = lastResultLine ? lastResultLine.id : 0;

                this.__listenersStore.emit('change-LastLineId', {user, lastResultLineLineId})
            });


    };

    static async dataUpdate(results) {
        const updatedData = [];
        results.forEach(item => updatedData.push(item));
        return updatedData;
    };

    static messageClient (data,user) {
        user.__ws.send(JSON.stringify(data));
    };

    DBPolling (user)  {
        setInterval(() => {
            const lastLineId = user.__lastLineID;
            const sql = Model.makeSql(gameCode, lastLineId);

            pool.query(sql,(err,results) => {
                const lastResultLine = results && results[results.length - 1] || null;
                const lastResultLineLineId = lastResultLine ? lastResultLine.id : 0;
                if (lastResultLineLineId && lastResultLineLineId > lastLineId) {

                        Model.dataUpdate(results)
                            .then(updatedData => {
                                Model.messageClient(updatedData,user);
                                this.__listenersStore.emit('change-LastLineId', {user, lastResultLineLineId})
                            });
                }
                err = err || new Error('Failed to get pooling');
                return err;
            });
        },3000);
    };
}

module.exports = Model;