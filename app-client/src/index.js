import React from 'react';
import ReactDOM from 'react-dom';
import 'reset-css/reset.css';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// eslint-disable-next-line
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
