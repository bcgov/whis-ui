import {
	CONTACT_LIST_LOAD_REQUEST,
	CONTACT_LIST_LOAD_REQUEST_COMPLETE, CONTACT_LIST_LOAD_REQUEST_ERROR
} from "../actions";

function createContactListReducer() {

	const initialState = {
		contacts: [],
		initialized: false,
		error: false
	}

	return (state = initialState, action) => {
		switch (action.type) {
		case CONTACT_LIST_LOAD_REQUEST:
			return {
				...state,
				initialized: false
			};
		case CONTACT_LIST_LOAD_REQUEST_COMPLETE:
			return {
				...state,
				contacts: action.payload,
				error: false,
				initialized: true
			};
		case CONTACT_LIST_LOAD_REQUEST_ERROR:
			return {
				...state,
				contacts: [],
				error: true,
				initialized: false
			};
		}

		return state;
	};
}

export {createContactListReducer};
