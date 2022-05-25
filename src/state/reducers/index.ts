import {combineReducers} from 'redux';
import {createAuthReducer} from './auth';

import {AppConfig} from '../config';

import {createConfigurationReducerWithDefaultState} from './configuration';
import {createGenerationLockReducer} from "./generation_lock";
import {createCodeTablesReducer} from "./code_tables";

function createRootReducer(config: AppConfig) {
	const rootReducer = combineReducers({
		Configuration: createConfigurationReducerWithDefaultState(config),
		Auth: createAuthReducer(config),
		GenerationLock: createGenerationLockReducer(config),
		CodeTables: createCodeTablesReducer()
	});

	return rootReducer;
}
export {createRootReducer};

export type RootState = ReturnType<ReturnType<typeof createRootReducer>>;
