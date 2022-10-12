import {all, put, select, takeLatest} from 'redux-saga/effects';
import {
	ACQUIRE_GENERATION_LOCK_COMPLETE,
	ACQUIRE_GENERATION_LOCK_REQUEST,
	GENERATION_LOCK_ERROR,
	RELEASE_GENERATION_LOCK_COMPLETE,
	RELEASE_GENERATION_LOCK_REQUEST,
	RENEW_GENERATION_LOCK_COMPLETE,
	RENEW_GENERATION_LOCK_REQUEST,
	TEST_GENERATION_LOCK_COMPLETE,
	TEST_GENERATION_LOCK_REQUEST
} from '../actions';
import {getConfiguration} from '../utilities/config_helper';
import {getAuthHeaders} from "../utilities/authentication_helper";
import {default as axios} from "axios";

function* testLock() {
	const configuration = yield select(getConfiguration);
	const authHeaders = yield select(getAuthHeaders);
	try {
		const result = yield axios.get(`${configuration.API_BASE}/ids/lock`, {
			headers: authHeaders
		});
		yield put({type: TEST_GENERATION_LOCK_COMPLETE, payload: result.data});
	} catch (err) {
		yield put({type: GENERATION_LOCK_ERROR});
	}
}

function* acquireLock() {
	const configuration = yield select(getConfiguration);
	const authHeaders = yield select(getAuthHeaders);
	try {
		const result = yield axios.post(`${configuration.API_BASE}/ids/lock`, null, {
			headers: authHeaders
		});
		yield put({type: ACQUIRE_GENERATION_LOCK_COMPLETE, payload: result.data});
		yield put({type: TEST_GENERATION_LOCK_REQUEST});
	} catch (err) {
		yield put({type: GENERATION_LOCK_ERROR});
		yield put({type: TEST_GENERATION_LOCK_REQUEST});
	}
}

function* renewLock() {
	const configuration = yield select(getConfiguration);
	const authHeaders = yield select(getAuthHeaders);
	try {
		const result = yield axios.post(`${configuration.API_BASE}/ids/lock/renew`, null, {
			headers: authHeaders
		});
		yield put({type: RENEW_GENERATION_LOCK_COMPLETE, payload: result.data});
		yield put({type: TEST_GENERATION_LOCK_REQUEST});
	} catch (err) {
		yield put({type: GENERATION_LOCK_ERROR});
		yield put({type: TEST_GENERATION_LOCK_REQUEST});
	}
}

function* releaseLock() {
	const configuration = yield select(getConfiguration);
	const authHeaders = yield select(getAuthHeaders);
	try {
		const result = yield axios.delete(`${configuration.API_BASE}/ids/lock`, {
			headers: authHeaders
		});
		yield put({type: RELEASE_GENERATION_LOCK_COMPLETE, payload: result.data});
		yield put({type: TEST_GENERATION_LOCK_REQUEST});
	} catch (err) {
		yield put({type: GENERATION_LOCK_ERROR});
		yield put({type: TEST_GENERATION_LOCK_REQUEST});
	}
}

function* generationLockSaga() {
	yield all([
		takeLatest(TEST_GENERATION_LOCK_REQUEST, testLock),
		takeLatest(ACQUIRE_GENERATION_LOCK_REQUEST, acquireLock),
		takeLatest(RELEASE_GENERATION_LOCK_REQUEST, releaseLock),
		takeLatest(RENEW_GENERATION_LOCK_REQUEST, renewLock),
	]);
}

export default generationLockSaga;
