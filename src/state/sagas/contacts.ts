import {all, put, select, takeEvery, takeLatest} from 'redux-saga/effects';
import {CONTACT_LIST_LOAD_REQUEST, CONTACT_LIST_LOAD_REQUEST_COMPLETE, CONTACT_LIST_LOAD_REQUEST_ERROR, EVENT_LOGGED_IN} from '../actions';

import {getConfiguration} from '../utilities/config_helper';
import {getAuthHeaders} from "../utilities/authentication_helper";
import {default as axios} from "axios";

function* loggedIn() {
	yield put({type: CONTACT_LIST_LOAD_REQUEST});
}

function* loadContacts() {
	const configuration = yield select(getConfiguration);
	const authHeaders = yield select(getAuthHeaders);
	try {
		const result = yield axios.get(`${configuration.API_BASE}/contacts`, {
			headers: authHeaders
		});
		yield put({type: CONTACT_LIST_LOAD_REQUEST_COMPLETE, payload: result.data});
	} catch (err) {
		yield put({type: CONTACT_LIST_LOAD_REQUEST_ERROR});
	}
}


function* contactListSaga() {
	yield all([
		takeLatest(CONTACT_LIST_LOAD_REQUEST, loadContacts),
		takeEvery(EVENT_LOGGED_IN, loggedIn),
	]);
}

export default contactListSaga;
