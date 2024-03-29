import {all, delay, put, select, takeLatest} from 'redux-saga/effects';
import Keycloak from 'keycloak-js';
import {
	AUTH_INITIALIZE_COMPLETE,
	AUTH_INITIALIZE_REQUEST,
	AUTH_REFRESH_ROLES_COMPLETE,
	AUTH_REFRESH_ROLES_ERROR,
	AUTH_REFRESH_ROLES_REQUEST,
	AUTH_REFRESH_TOKEN,
	AUTH_REQUEST_COMPLETE,
	AUTH_REQUEST_ERROR,
	AUTH_SIGNIN_REQUEST,
	AUTH_UPDATE_TOKEN_STATE,
	EVENT_LOGGED_IN
} from '../actions';
import {AppConfig} from '../config';
import {getConfiguration} from '../utilities/config_helper';
import {getAuthHeaders} from "../utilities/authentication_helper";
import {default as axios} from "axios";

const MIN_TOKEN_FRESHNESS = 2 * 60; //want our token to be good for atleast this long at all times
const TOKEN_REFRESH_CHECK_INTERVAL = 7 * 1000;

let keycloakInstance = null;

function* refreshRoles() {
	const configuration = yield select(getConfiguration);
	const authHeaders = yield select(getAuthHeaders);
	try {
		const result = yield axios.get(`${configuration.API_BASE}/users/me`, {
			headers: authHeaders
		});
		yield put({type: AUTH_REFRESH_ROLES_COMPLETE, payload: {roles: result.data.roles}});
		yield put({type: EVENT_LOGGED_IN});
	} catch (err) {
		console.dir(err);
		yield put({type: AUTH_REFRESH_ROLES_ERROR});
	}
}

function* keepTokenFresh() {
	try {
		yield keycloakInstance.updateToken(MIN_TOKEN_FRESHNESS);
	} catch (e) {
		yield put({type: AUTH_INITIALIZE_REQUEST});
	}

	yield put({type: AUTH_UPDATE_TOKEN_STATE});

	yield delay(TOKEN_REFRESH_CHECK_INTERVAL);
	yield put({type: AUTH_REFRESH_TOKEN});
}

function* initializeAuthentication() {
	const config: AppConfig = yield select(getConfiguration);

	keycloakInstance = Keycloak({
		clientId: config.KEYCLOAK_CLIENT_ID,
		realm: config.KEYCLOAK_REALM,
		url: config.KEYCLOAK_URL
	});

	const authStatus = yield keycloakInstance.init({
		checkLoginIframe: false,
		onLoad: 'check-sso',
		pkceMethod: 'S256'
	});

	yield put({
		type: AUTH_INITIALIZE_COMPLETE,
		payload: {
			authenticated: authStatus
		}
	});

	if (authStatus) {
		// schedule our refresh
		yield put({type: AUTH_REFRESH_TOKEN});

		// load roles
		yield put({type: AUTH_REFRESH_ROLES_REQUEST});
	}
}

function* handleSigninRequest(action) {
	try {
		yield keycloakInstance.login();
		yield put({type: AUTH_REQUEST_COMPLETE, payload: {}});
		yield put({type: AUTH_REFRESH_TOKEN});
	} catch (e) {
		yield put({type: AUTH_REQUEST_ERROR});
	}
}

function* authenticationSaga() {
	yield all([
		takeLatest(AUTH_INITIALIZE_REQUEST, initializeAuthentication),
		takeLatest(AUTH_SIGNIN_REQUEST, handleSigninRequest),
		takeLatest(AUTH_REFRESH_TOKEN, keepTokenFresh),
		takeLatest(AUTH_REFRESH_ROLES_REQUEST, refreshRoles)
	]);
}

export default authenticationSaga;
export {keycloakInstance};
