import React from 'react';
import App from './App';
import {setupStore} from '../state/store';
import { createRoot } from 'react-dom/client';

import(/* webpackChunkName: "app_config" */ '../state/config').then(({CONFIG}) => {
	const store = setupStore(CONFIG);

	const container = document.getElementById('root');
	const root = createRoot(container);
	root.render(<App store={store}/>, );
});
