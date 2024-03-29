import {combineReducers} from 'redux';
import {createAuthReducer} from './auth';

import {AppConfig} from '../config';

import {createConfigurationReducerWithDefaultState} from './configuration';
import {createGenerationLockReducer} from "./generation_lock";
import {createCodeTablesReducer} from "./code_tables";
import {createFlashMessagesReducer} from "./flash_messages";
import {createWildlifeHealthIdReducer} from "./wildlife_health_id";
import {createSearchReducer} from "./search";
import {createContactListReducer} from "./contacts";

function createRootReducer(config: AppConfig) {
	const rootReducer = combineReducers({
		Configuration: createConfigurationReducerWithDefaultState(config),
		Auth: createAuthReducer(config),
		GenerationLock: createGenerationLockReducer(config),
		WildlifeHealthId: createWildlifeHealthIdReducer(),
		CodeTables: createCodeTablesReducer(),
		FlashMessages: createFlashMessagesReducer(),
		Search: createSearchReducer(),
		Contacts: createContactListReducer(),
	});

	return rootReducer;
}

export {createRootReducer};

export type RootState = ReturnType<ReturnType<typeof createRootReducer>>;
