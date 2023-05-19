import {
	WILDLIFE_HEALTH_ID_LOAD_COMPLETE,
	WILDLIFE_HEALTH_ID_LOAD_ERROR,
	WILDLIFE_HEALTH_ID_LOAD_REQUEST,
	WILDLIFE_HEALTH_ID_PERSIST_COMPLETE
} from "../actions";

class WildLifeHealthId {

	data: any;
	working: boolean;
	initialized: boolean;
	status: {
		isSelf: boolean
	};

	constructor() {
		this.data = null;
		this.working = false;
		this.initialized = false;
		this.status = null;
	}
}

const initialState = new WildLifeHealthId();

function createWildlifeHealthIdReducer(): (WildLifeHealthId, AnyAction) => WildLifeHealthId {
	return (state = initialState, action) => {
		switch (action.type) {
		case WILDLIFE_HEALTH_ID_LOAD_REQUEST: {
			return {
				...state,
				working: true,
				initialized: false,
			};
		}
		case WILDLIFE_HEALTH_ID_LOAD_COMPLETE: {
			return {
				...state,
				initialized: true,
				working: false,
				data: action.payload
			};
		}
		case WILDLIFE_HEALTH_ID_LOAD_ERROR: {
			return {
				...state,
				initialized: true,
				working: false,
				data: null
			};
		}
		case WILDLIFE_HEALTH_ID_PERSIST_COMPLETE: {
			return {
				...state,
				initialized: true,
				working: false,
				data: action.payload
			};
		}
		default:
			return state;
		}
	};
}

export {createWildlifeHealthIdReducer};
