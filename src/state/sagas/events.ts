import {all, delay, put, select, takeLatest} from 'redux-saga/effects';
import {default as axios} from "axios";
import {getConfiguration} from '../utilities/config_helper';
import {getAuthHeaders} from "../utilities/authentication_helper";
import {EVENT_LOGGED_IN, EVENT_POLL, EVENT_REMOTE_EVENT} from "../actions";

const BACKOFF_BASELINE = 500;
const BACKOFF_MAX = 60 * 1000;

let backoff = BACKOFF_BASELINE;

function* reactToEvent() {
	const configuration = yield select(getConfiguration);
	const authHeaders = yield select(getAuthHeaders);

	try {
		const receivedEvents: any[] = yield axios.get(`${configuration.API_BASE}/events`, {
			headers: authHeaders
		});
		for (const e of receivedEvents) {
			yield put ({type: EVENT_REMOTE_EVENT, payload: e})
		}

		yield put({type: EVENT_POLL});
	} catch (err) {
		backoff = Math.min(backoff * 2, BACKOFF_MAX);
		yield delay(backoff);
		yield put({type: EVENT_POLL});
	}
}

function* eventsSaga() {
	yield all([
		takeLatest(EVENT_POLL, reactToEvent),
		takeLatest(EVENT_LOGGED_IN, reactToEvent)
	]);
}

export default eventsSaga;
