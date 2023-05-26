import {getAuthHeaders} from "../../state/utilities/authentication_helper";
import {default as axios} from 'axios';
import {useDispatch, useSelector} from "react-redux";
import {getConfiguration} from "../../state/utilities/config_helper";

export const useAPI = () => {
	const authHeaders = useSelector(getAuthHeaders);
	const configuration = useSelector(getConfiguration);

	return {
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
	}

};

