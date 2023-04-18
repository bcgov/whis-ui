import {all, put, select, takeEvery, takeLatest} from 'redux-saga/effects';
import {SEARCH_CLEAR, SEARCH_COMPLETE, SEARCH_DELETE_CHIP, SEARCH_ERROR, SEARCH_EXECUTE, SEARCH_RESET} from "../actions";
import {getConfiguration} from "../utilities/config_helper";
import {getAuthHeaders} from "../utilities/authentication_helper";
import {default as axios} from "axios";
import {deleteChipAndRecomputeSearchRequest, SearchFilterChip} from "../utilities/search_api";

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

function* deleteChip(action) {
	const {chip} = action.payload;
	const currentRequest = yield select(state => state.Search.searchRequest);

	const updatedSearchRequest = deleteChipAndRecomputeSearchRequest(currentRequest, chip);
	yield put({
		type: SEARCH_EXECUTE, payload: {
			searchRequest: updatedSearchRequest
		}
	});
}

function* doReset(action) {
	yield put({type: SEARCH_CLEAR});
	yield put({type: SEARCH_EXECUTE, payload: {searchRequest: {}}});
}

function* searchSaga() {
	yield all([
		takeLatest(SEARCH_EXECUTE, doSearch),
		takeEvery(SEARCH_DELETE_CHIP, deleteChip),
		takeEvery(SEARCH_RESET, doReset)
	]);
}

export default searchSaga;
