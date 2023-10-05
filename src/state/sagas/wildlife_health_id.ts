import {all, put, select, takeLatest} from 'redux-saga/effects';
import {
	WILDLIFE_HEALTH_ID_APPLY_CHANGES_COMPLETE,
	WILDLIFE_HEALTH_ID_APPLY_CHANGES_ERROR,
	WILDLIFE_HEALTH_ID_APPLY_CHANGES_REQUEST,
	WILDLIFE_HEALTH_ID_GENERATE_COMPLETE,
	WILDLIFE_HEALTH_ID_GENERATE_ERROR,
	WILDLIFE_HEALTH_ID_GENERATE_REQUEST,
	WILDLIFE_HEALTH_ID_LIST_ALL_COMPLETE,
	WILDLIFE_HEALTH_ID_LIST_ALL_ERROR,
	WILDLIFE_HEALTH_ID_LIST_ALL_REQUEST,
	WILDLIFE_HEALTH_ID_LOAD_COMPLETE,
	WILDLIFE_HEALTH_ID_LOAD_ERROR,
	WILDLIFE_HEALTH_ID_LOAD_REQUEST
} from "../actions";
import {getConfiguration} from "../utilities/config_helper";
import {getAuthHeaders} from "../utilities/authentication_helper";
import {default as axios} from "axios";

function* loadWildlifeHealthId(action) {
	const configuration = yield select(getConfiguration);
	const authHeaders = yield select(getAuthHeaders);
	const {id} = action.payload;

	try {
		const result = yield axios.get(`${configuration.API_BASE}/ids/${id}`, {
			headers: authHeaders
		});
		yield put({type: WILDLIFE_HEALTH_ID_LOAD_COMPLETE, payload: result.data});
	} catch (err) {
		yield put({type: WILDLIFE_HEALTH_ID_LOAD_ERROR});
	}
}

function* applySingleIDChanges(action) {
	const configuration = yield select(getConfiguration);
	const authHeaders = yield select(getAuthHeaders);
	const {id, facet} = action.payload;

	try {
		const result = yield axios.patch(`${configuration.API_BASE}/ids/${id}/${facet}`, action.payload.changesToApply, {
			headers: authHeaders
		});
		yield put({type: WILDLIFE_HEALTH_ID_APPLY_CHANGES_COMPLETE, payload: result.data});
	} catch (err) {
		yield put({type: WILDLIFE_HEALTH_ID_APPLY_CHANGES_ERROR});
	}
}

function* generateIDs(action) {
	const configuration = yield select(getConfiguration);
	const authHeaders = yield select(getAuthHeaders);

	const {serial, request} = action.payload;

	try {
		const result = yield axios.post(`${configuration.API_BASE}/ids`, request, {
			headers: authHeaders
		});
		yield put({type: WILDLIFE_HEALTH_ID_GENERATE_COMPLETE, payload: {result: result.data, serial}});
	} catch (err) {
		yield put({type: WILDLIFE_HEALTH_ID_GENERATE_ERROR, payload: {serial}});
	}
}

function* listIDs(action) {
	const configuration = yield select(getConfiguration);
	const authHeaders = yield select(getAuthHeaders);

	try {
		const result = yield axios.get(`${configuration.API_BASE}/ids`, {
			headers: authHeaders
		});
		yield put({type: WILDLIFE_HEALTH_ID_LIST_ALL_COMPLETE, payload: result.data});
	} catch (err) {
		yield put({type: WILDLIFE_HEALTH_ID_LIST_ALL_ERROR});
	}
}


function* wildlifeHealthIdSaga() {
	yield all([
		takeLatest(WILDLIFE_HEALTH_ID_LOAD_REQUEST, loadWildlifeHealthId),
		takeLatest(WILDLIFE_HEALTH_ID_APPLY_CHANGES_REQUEST, applySingleIDChanges),
		takeLatest(WILDLIFE_HEALTH_ID_GENERATE_REQUEST, generateIDs),
		takeLatest(WILDLIFE_HEALTH_ID_LIST_ALL_REQUEST, listIDs),
	]);
}

export default wildlifeHealthIdSaga;
