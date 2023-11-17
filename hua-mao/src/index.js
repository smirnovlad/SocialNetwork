import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import classes from "./styles/App.css"
import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div className={classes.root}>
        <App/>
    </div>
);
