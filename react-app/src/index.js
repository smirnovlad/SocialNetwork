import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from 'react-redux'
import configureStore from './store/store'
import classes from "./styles/App.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div className={classes.root}>
        <Provider store={configureStore}>
            <App/>
        </Provider>
    </div>
);
