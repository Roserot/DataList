import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from "./components/App";

window.addEventListener('load', () => {
    ReactDOM.render(
        <App/>,
        document.getElementById('App')
    );
});