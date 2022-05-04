import {getAuthHeaders} from "../../state/utilities/authentication_helper";
import {default as axios} from 'axios';
import {useSelector} from "react-redux";
import {getConfiguration} from "../../state/utilities/config_helper";

export const useAPI = () => {
	const authHeaders = useSelector(getAuthHeaders);
	const configuration = useSelector(getConfiguration);

	return {
		getCodeTables: async (): Promise<any> => {
			const res = await axios.get(`${configuration.API_BASE}/codes`, {
				headers: {
					...authHeaders
				}
			});
			return res.data;
		},
		getCodeTable: async (id: string): Promise<any> => {
			const res = await axios.get(`${configuration.API_BASE}/codes/${id}`, {
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
		generateIDs: async( r ): Promise<any> => {
			const res = await axios.post(`${configuration.API_BASE}/ids`, r,
				{
					headers: {
						...authHeaders
					}
				});
			return res.data;
		}

	}


};

