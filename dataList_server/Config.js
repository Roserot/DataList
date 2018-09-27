class Config {
    static model() {
        return {
            gameCode: 8,
            dataBase: {
                host: "localhost",
                user: "root",
                password: "",
                database: "platf_data",
                connectionLimit : 100,
                multipleStatements: true
            }
        }
    }
}

module.exports = Config;