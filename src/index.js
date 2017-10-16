import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root';
import registerServiceWorker from './registerServiceWorker';

import './vendors/bootstrap/css/bootstrap.min.css'
import './index.css';

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
