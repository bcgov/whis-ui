import {all, put, select, takeLatest} from 'redux-saga/effects';
import {SEARCH_COMPLETE, SEARCH_ERROR, SEARCH_EXECUTE} from "../actions";
import {getConfiguration} from "../utilities/config_helper";
import {getAuthHeaders} from "../utilities/authentication_helper";
import {default as axios} from "axios";

function* doSearch(action) {
	const configuration = yield select(getConfiguration);
	const authHeaders = yield select(getAuthHeaders);
	const {searchRequest} = action.payload;

	try {
		const result = yield axios.post(`${configuration.API_BASE}/ids/search`, searchRequest, {
			headers: authHeaders
		});
		yield put({type: SEARCH_COMPLETE, payload: result.data});
	} catch (err) {
		yield put({type: SEARCH_ERROR});
	}
}

function* searchSaga() {
	yield all([
		takeLatest(SEARCH_EXECUTE, doSearch),
	]);
}

export default searchSaga;
