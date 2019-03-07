import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App';

import './resources/reset.css';
import 'bootstrap/dist/css/bootstrap.css';
import './resources/styles.scss';

const app = document.getElementById('app');
ReactDOM.render(<App/>, app);
