import {
	SEARCH_CLEAR, SEARCH_COMPLETE, SEARCH_EXECUTE,
	TEST_GENERATION_LOCK_COMPLETE,
	TEST_GENERATION_LOCK_REQUEST,
	WILDLIFE_HEALTH_ID_LOAD_COMPLETE,
	WILDLIFE_HEALTH_ID_LOAD_ERROR,
	WILDLIFE_HEALTH_ID_LOAD_REQUEST, WILDLIFE_HEALTH_ID_PERSIST_COMPLETE
} from "../actions";
import {AppConfig} from "../config";
import {buildFormStateFromLegacyJSON, updateJSONStructure} from "../utilities/wildlife_health_id_helper";

class Search {

	working: boolean;
	searchRequest: unknown;
	results: unknown;

	constructor() {
		this.working = false;
		this.searchRequest = {};
		this.results = null;
	}
}

const initialState = new Search();

function createSearchReducer(): (Search, AnyAction) => Search {
	return (state = initialState, action) => {
		switch (action.type) {
		case SEARCH_CLEAR: {
			return {
				...state,
				working: false,
				searchRequest: {},
				results: []
			};
		}
		case SEARCH_COMPLETE: {
			return {
				...state,
				working: false,
				results: action.payload?.results || [],
			};
		}
		case SEARCH_EXECUTE: {
			return {
				...state,
				working: true,
				searchRequest: action.payload.searchRequest,
				results: []
			};
		}
		default:
			return state;
		}
	};
}

export {createSearchReducer};
