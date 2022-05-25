import {TEST_GENERATION_LOCK_COMPLETE, TEST_GENERATION_LOCK_REQUEST} from "../actions";
import {AppConfig} from "../config";

class GenerationLock {

	working: boolean;
	initialized: boolean;
	status: {
		isSelf: boolean
	};

	constructor() {
		this.working = false;
		this.initialized = false;
		this.status = null;
	}
}

const initialState = new GenerationLock();

function createGenerationLockReducer(configuration: AppConfig): (GenerationLock, AnyAction) => GenerationLock {
	return (state = initialState, action) => {
		switch (action.type) {
		case TEST_GENERATION_LOCK_REQUEST: {
			return {
				...state,
				working: true,
				initialized: false,
			};
		}
		case TEST_GENERATION_LOCK_COMPLETE: {
			return {
				...state,
				initialized: true,
				working: false,
				status: action.payload
			};
		}
		default:
			return state;
		}
	};
}

export {createGenerationLockReducer};
