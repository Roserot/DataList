const App = require('./App');

App.get().init()
    .catch(e =>
        console.error(`Failed to initialize application.`, e)
    );