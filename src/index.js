import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import PageOfCharts from './PageOfCharts';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<PageOfCharts />, document.getElementById('root'));
registerServiceWorker();
