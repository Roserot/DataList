export class Config {
    static model() {
        return {
            url: '/resources/',
            serverUrl: 'ws://localhost:3000/',
            DataList: {
                url: '/resources/lists-data/',
                url2: '/server/data.json'
            },
            senderMethod: {
                method: 'POST',
                cache: 'default'
            }

        };
    }
}
