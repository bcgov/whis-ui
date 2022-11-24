import {AppConfig} from '../config';
import {DEVMODE_SET_STATE} from "../actions";

interface ConfigurationState {
	current: AppConfig;
	devMode: boolean;
}

function createConfigurationReducerWithDefaultState(configuration: AppConfig) {
	const initialState: ConfigurationState = {
		current: configuration,
		devMode: false
	};

	return (state = initialState, action) => {
		switch (action.type) {
		case DEVMODE_SET_STATE:
			return {
				...state,
				devMode: action.payload
			}
		}
		return state;
	};
}

export {createConfigurationReducerWithDefaultState};
