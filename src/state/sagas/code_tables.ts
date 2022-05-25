import {all, delay, put, select, take, takeEvery, takeLatest} from 'redux-saga/effects';
import {CODE_TABLES_LOAD_REQUEST, CODE_TABLES_LOAD_REQUEST_COMPLETE, CODE_TABLES_LOAD_REQUEST_ERROR, EVENT_LOGGED_IN} from '../actions';
import {getConfiguration} from '../utilities/config_helper';
import {getAuthHeaders} from "../utilities/authentication_helper";
import {default as axios} from "axios";

function* loggedIn() {
	// reload on authentication complete
	yield put({type: CODE_TABLES_LOAD_REQUEST});
}

function* loadAllCodes() {
	const configuration = yield select(getConfiguration);
	const authHeaders = yield select(getAuthHeaders);
	try {
		const result = yield axios.get(`${configuration.API_BASE}/codes?deep=true`, {
			headers: authHeaders
		});
		yield put({type: CODE_TABLES_LOAD_REQUEST_COMPLETE, payload: result.data});
	} catch (err) {
		yield put({type: CODE_TABLES_LOAD_REQUEST_ERROR});
	}
}


function* codeTablesSaga() {
	yield all([
		takeLatest(CODE_TABLES_LOAD_REQUEST, loadAllCodes),
		takeEvery(EVENT_LOGGED_IN, loggedIn),
	]);
}

export default codeTablesSaga;
