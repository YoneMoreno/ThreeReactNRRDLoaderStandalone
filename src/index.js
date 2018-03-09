import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as THREE from 'three';

window.THREE = THREE;


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
