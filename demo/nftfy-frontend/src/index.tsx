import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

import 'antd/dist/antd.css';

ReactDOM.render(<React.StrictMode><App /></React.StrictMode>, document.getElementById('root'));

serviceWorker.unregister();
