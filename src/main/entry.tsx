import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {setupStore} from '../state/store';

import(/* webpackChunkName: "app_config" */ '../state/config').then(({CONFIG}) => {
	const store = setupStore(CONFIG);

	ReactDOM.render(<App store={store} />, document.getElementById('root'));
});
