import {
	WILDLIFE_HEALTH_ID_GENERATE_COMPLETE, WILDLIFE_HEALTH_ID_GENERATE_ERROR,
	WILDLIFE_HEALTH_ID_GENERATE_REQUEST,
	WILDLIFE_HEALTH_ID_LIST_ALL_COMPLETE, WILDLIFE_HEALTH_ID_LIST_ALL_ERROR, WILDLIFE_HEALTH_ID_LIST_ALL_REQUEST,
	WILDLIFE_HEALTH_ID_LOAD_COMPLETE,
	WILDLIFE_HEALTH_ID_LOAD_ERROR,
	WILDLIFE_HEALTH_ID_LOAD_REQUEST,
	WILDLIFE_HEALTH_ID_PERSIST_COMPLETE
} from "../actions";

class WildLifeHealthId {

	single: {
		data: unknown;
		working: boolean;
		initialized: boolean;
		error: boolean;
	}

	list: {
		items: unknown[],
		working: boolean,
		initialized: boolean,
		error: boolean
	}

	generate: {
		serial: string;
		working: boolean,
		error: boolean,
		data: unknown
	}[];


	constructor() {

		this.single = {
			data: null,
			working: false,
			initialized: false,
			error: false
		}

		this.list = {
			items: [],
			working: false,
			initialized: false,
			error: false
		}

		this.generate = [];
	}
}

const initialState = new WildLifeHealthId();

function createWildlifeHealthIdReducer(): (WildLifeHealthId, AnyAction) => WildLifeHealthId {
	return (state = initialState, action) => {
		switch (action.type) {
		case WILDLIFE_HEALTH_ID_LOAD_REQUEST: {
			return {
				...state,
				single: {
					working: true,
					initialized: false,
					error: false,
					data: null
				}
			};
		}
		case WILDLIFE_HEALTH_ID_LOAD_COMPLETE: {
			return {
				...state,
				single: {
					working: false,
					initialized: true,
					error: false,
					data: action.payload
				}
			};
		}
		case WILDLIFE_HEALTH_ID_LOAD_ERROR: {
			return {
				...state,
				single: {
					working: false,
					initialized: true,
					error: true,
					data: null
				}
			};
		}
		case WILDLIFE_HEALTH_ID_PERSIST_COMPLETE: {
			return {
				...state,
				single: {
					working: false,
					initialized: true,
					error: false,
					data: action.payload
				}
			}
		}
		case WILDLIFE_HEALTH_ID_GENERATE_REQUEST: {
			const updatedGenerate = [...state.generate];
			const found = updatedGenerate.findIndex(p => p.serial == action.payload.serial);
			if (found !== -1) {
				console.error('Unexpected duplicate serial');
				updatedGenerate[found].error = true;
			} else {
				updatedGenerate.push({
					working: true,
					data: null,
					serial: action.payload.serial,
					error: false
				});
			}

			return {
				...state,
				generate: updatedGenerate
			}
		}
		case WILDLIFE_HEALTH_ID_GENERATE_COMPLETE: {
			const updatedGenerate = [...state.generate];
			const found = updatedGenerate.findIndex(p => p.serial === action.payload.serial);
			if (found == -1) {
				console.error(`Cannot find serial ${action.payload.serial}`);
				console.dir(updatedGenerate);
				console.dir(updatedGenerate.findIndex(p => p.serial == action.payload.serial));
			} else {
				updatedGenerate[found] = {
					working: false,
					data: action.payload.result,
					serial: action.payload.serial,
					error: false
				};
			}

			return {
				...state,
				generate: updatedGenerate
			}
		}
		case WILDLIFE_HEALTH_ID_GENERATE_ERROR: {
			const updatedGenerate = [...state.generate];
			const found = updatedGenerate.findIndex(p => p.serial === action.payload.serial);
			if (found == -1) {
				console.error(`Cannot find serial ${action.payload.serial}`);
				console.dir(updatedGenerate);
				console.dir(updatedGenerate.findIndex(p => p.serial == action.payload.serial));

			} else {
				updatedGenerate[found] = {
					working: false,
					data: null,
					serial: action.payload.serial,
					error: true
				};
			}

			return {
				...state,
				generate: updatedGenerate
			}
		}
		case WILDLIFE_HEALTH_ID_LIST_ALL_REQUEST: {
			return {
				...state,
				list: {
					working: true,
					initialized: false,
					error: false,
					items: []
				}
			}
		}
		case WILDLIFE_HEALTH_ID_LIST_ALL_COMPLETE: {
			return {
				...state,
				list: {
					working: false,
					initialized: true,
					error: false,
					items: action.payload
				}
			}
		}
		case WILDLIFE_HEALTH_ID_LIST_ALL_ERROR: {
			return {
				...state,
				list: {
					working: false,
					initialized: true,
					error: true,
					items: []
				}
			}
		}
		default:
			return state;
		}
	};
}

export {createWildlifeHealthIdReducer};
