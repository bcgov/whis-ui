import {applyMiddleware, createStore} from 'redux';
import {createRootReducer} from './reducers';
import createSagaMiddleware from 'redux-saga';

import logger from 'redux-logger';
import authenticationSaga from './sagas/auth';
import generationLockSaga from "./sagas/generation_lock";
import {AppConfig} from './config';
import codeTablesSaga from "./sagas/code_tables";
import flashMessagesSaga from "./sagas/flash_messages";

const setupStore = (configuration: AppConfig) => {
	const sagaMiddleware = createSagaMiddleware();

	let middlewares;
	if (configuration.DEBUG) {
		middlewares = applyMiddleware(sagaMiddleware, logger);
	} else {
		middlewares = applyMiddleware(sagaMiddleware);
	}

	const store = createStore(createRootReducer(configuration), middlewares);

	// run the sagas
	sagaMiddleware.run(authenticationSaga);
	sagaMiddleware.run(generationLockSaga);
	sagaMiddleware.run(codeTablesSaga);
	sagaMiddleware.run(flashMessagesSaga);

	return store;
};

export {setupStore};
