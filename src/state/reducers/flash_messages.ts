import {FLASH_MESSAGE_CREATE, FLASH_MESSAGE_DISMISS, FLASH_MESSAGE_TTL_TICK} from "../actions";

export interface FlashMessages {
	messages: {
		id: number,
		title: string,
		body: string,
		type: 'information' | 'warning' | 'error';
		ttl: number | null;
	}[];
}

let lastMessageId = 1;

function createFlashMessagesReducer() {

	const initialState: FlashMessages = {
		messages: []
	}

	return (state = initialState, action) => {
		switch (action.type) {
		case FLASH_MESSAGE_DISMISS: {
			const {id} = action.payload;
			const mutatedMessages = [...state.messages];
			const deleteIndex = mutatedMessages.findIndex(m => m.id === id);
			mutatedMessages.splice(deleteIndex, 1);
			return {
				...state,
				messages: mutatedMessages
			};
		}
		case FLASH_MESSAGE_CREATE: {
			const {body, title, type, ttl} = action.payload;
			const mutatedMessages = [...state.messages];
			mutatedMessages.push({
				id: lastMessageId++,
				title,
				body,
				ttl,
				type
			})
			return {
				...state,
				messages: mutatedMessages
			};
		}
		case FLASH_MESSAGE_TTL_TICK: {
			const mutatedMessages = [...state.messages];
			const expiringMessages = [];
			for (const m of mutatedMessages) {
				if (m.ttl !== null) {
					m.ttl--;
					if (m.ttl === 0) {
						expiringMessages.push(m.id);
					}
				}
			}
			for (const id of expiringMessages) {
				const deleteIndex = mutatedMessages.findIndex(m => m.id === id);
				mutatedMessages.splice(deleteIndex, 1);
			}
			return {
				...state,
				messages: mutatedMessages
			};
			return {
				...state,
				messages: mutatedMessages
			};
		}
		default:
			return state;
		}
	};
}

const selectFlashMessages: (state) => FlashMessages = (state) => state.FlashMessages;

export {createFlashMessagesReducer, selectFlashMessages};
