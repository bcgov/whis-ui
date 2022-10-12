import {all, call, delay, put, select, takeLatest} from 'redux-saga/effects';
import {FLASH_MESSAGE_CREATE, FLASH_MESSAGE_TTL_TICK} from '../actions';
import {selectFlashMessages} from "../reducers/flash_messages";


function* processMessageTTLs() {
	const {messages} = yield select(selectFlashMessages);
	let needTick = false;

	for (const message of messages) {
		if (message.ttl !== null) {
			needTick = true;
		}
	}

	if (needTick) {
		yield delay(1000);
		yield put({type: FLASH_MESSAGE_TTL_TICK});
	}
}


function* flashMessagesSaga() {
	yield all([
		call(processMessageTTLs),
		takeLatest(FLASH_MESSAGE_CREATE, processMessageTTLs),
		takeLatest(FLASH_MESSAGE_TTL_TICK, processMessageTTLs)
	]);
}

export default flashMessagesSaga;
