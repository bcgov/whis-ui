import {keycloakInstance} from '../sagas/auth';
import {
	AUTH_CLEAR_ROLES,
	AUTH_INITIALIZE_COMPLETE,
	AUTH_REFRESH_ROLES_COMPLETE,
	AUTH_REFRESH_ROLES_ERROR,
	AUTH_REFRESH_ROLES_REQUEST,
	AUTH_REQUEST_COMPLETE,
	AUTH_UPDATE_TOKEN_STATE
} from '../actions';
import {AppConfig} from '../config';

class AuthState {
	initialized: boolean;
	error: boolean;
	authenticated: true;

	firstName: string;
	lastName: string;

	email: string;

	bestName: string;

	requestHeaders: {
		authorization: string;
	};

	roles: string[];
	rolesInitialized: false;

	constructor() {
		this.initialized = false;
		this.roles = [];
		this.rolesInitialized = false;
	}
}

const initialState = new AuthState();

function loadCurrentStateFromKeycloak(previousState: AuthState, config: AppConfig): object {
	let bestName = 'User';
	const preferenceOrder = ['name', 'preferred_username', 'given_name', 'sub'];
	let firstName = 'User';
	let lastName = '';
	let email = '';

	for (const p of preferenceOrder) {
		if (keycloakInstance.idTokenParsed) {
			if (p in keycloakInstance.idTokenParsed && keycloakInstance.idTokenParsed[p] !== null && keycloakInstance.idTokenParsed[p].length > 0) {
				bestName = keycloakInstance.idTokenParsed[p];
				break;
			}
		}
	}
	let username = null;

	if (keycloakInstance.idTokenParsed) {
		username = keycloakInstance.idTokenParsed['preferred_username'];
		firstName = keycloakInstance.idTokenParsed['given_name'];
		lastName = keycloakInstance.idTokenParsed['family_name'];
		email = keycloakInstance.idTokenParsed['email'];
	}

	const headers = {
		authorization: `Bearer ${keycloakInstance.token}`
	};

	return {
		bestName,
		headers,
		username,
		firstName,
		lastName,
		email
	};
}

function createAuthReducer(configuration: AppConfig): (AuthState, AnyAction) => AuthState {
	return (state = initialState, action) => {
		switch (action.type) {
		case AUTH_INITIALIZE_COMPLETE: {
			const {authenticated} = action.payload;
			return {
				...state,
				initialized: true,
				authenticated,
				...loadCurrentStateFromKeycloak(state, configuration)
			};
		}
		case AUTH_REQUEST_COMPLETE: {
			const {authenticated} = action.payload;
			return {
				...state,
				authenticated,
				...loadCurrentStateFromKeycloak(state, configuration)
			};
		}
		case AUTH_UPDATE_TOKEN_STATE: {
			return {
				...state,
				...loadCurrentStateFromKeycloak(state, configuration)
			};
		}
		case AUTH_REFRESH_ROLES_REQUEST: {
			return {
				...state,
				roles: [],
				rolesInitialized: false
			}
		}
		case AUTH_CLEAR_ROLES: {
			return {
				...state,
				roles: [],
				rolesInitialized: false
			}
		}
		case AUTH_REFRESH_ROLES_COMPLETE: {
			const {roles} = action.payload;
			return {
				...state,
				roles,
				rolesInitialized: true
			}
		}
		case AUTH_REFRESH_ROLES_ERROR: {
			return {
				...state,
				roles: [],
				rolesInitialized: false,
			}
		}
		default:
			return state;
		}
	};
}

export {createAuthReducer};
