import {getAuthHeaders} from "../../state/utilities/authentication_helper";
import {default as axios} from 'axios';
import {useDispatch, useSelector} from "react-redux";
import {getConfiguration} from "../../state/utilities/config_helper";
import {FLASH_MESSAGE_CREATE} from "../../state/actions";

export const useAPI = () => {
	const authHeaders = useSelector(getAuthHeaders);
	const configuration = useSelector(getConfiguration);

	const dispatch = useDispatch();

	return {
		getYears: async (): Promise<any> => {
			const res = await axios.get(`${configuration.API_BASE}/years`, {
				headers: {
					...authHeaders
				}
			});
			return res.data;
		},
		getHealthIDs: async (): Promise<any> => {
			const res = await axios.get(`${configuration.API_BASE}/ids`, {
				headers: {
					...authHeaders
				}
			});
			return res.data;
		},
		getHealthID: async (id): Promise<any> => {
			const res = await axios.get(`${configuration.API_BASE}/ids/${id}`, {
				headers: {
					...authHeaders
				}
			});
			dispatch({
				type: FLASH_MESSAGE_CREATE, payload: {
					title: 'Health ID Loaded',
					body: `ID ${id} loaded from database`,
					type: 'information',
					ttl: 3
				}
			});
			return res.data;
		},
		getAccessRequestStatus: async (): Promise<any> => {
			const res = await axios.get(`${configuration.API_BASE}/users/access_request`, {
				headers: {
					...authHeaders
				}
			});
			return res.data;
		},
		sendAccessRequest: async (): Promise<any> => {
			const res = await axios.post(`${configuration.API_BASE}/users/access_request`, null,
				{
					headers: {
						...authHeaders
					}
				});
			return res.data;
		},
		generateIDs: async (r): Promise<any> => {
			const res = await axios.post(`${configuration.API_BASE}/ids`, r,
				{
					headers: {
						...authHeaders
					}
				});
			dispatch({
				type: FLASH_MESSAGE_CREATE, payload: {
					title: 'ID Generation Request',
					body: `IDs successfully generated`,
					type: 'information',
					ttl: 3,
				}
			});
			return res.data;
		}

	}


};

