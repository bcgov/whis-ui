import {all, put, select, takeLatest} from 'redux-saga/effects';
import {WILDLIFE_HEALTH_ID_LOAD_COMPLETE, WILDLIFE_HEALTH_ID_LOAD_ERROR, WILDLIFE_HEALTH_ID_LOAD_REQUEST} from "../actions";
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

function* wildlifeHealthIdSaga() {
	yield all([
		takeLatest(WILDLIFE_HEALTH_ID_LOAD_REQUEST, loadWildlifeHealthId),
	]);
}

export default wildlifeHealthIdSaga;
