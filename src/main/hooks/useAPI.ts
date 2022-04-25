import {CONFIG} from "../../state/config";
import {useReducer, useState} from "react";
import {getAuthHeaders} from "../../state/utilities/authentication_helper";
import {default as axios} from 'axios';
import {useSelector} from "react-redux";

export const useAPI = () => {
	const authHeaders = useSelector(getAuthHeaders);

	return {
		getCodeTables:  async (): Promise<any> => {
			const res = await axios.get(`${CONFIG.API_BASE}/codes`, {
				headers: {
					...authHeaders
				}
			});
			return res.data;
		},
		getCodeTable:  async (id: string): Promise<any> => {
			const res = await axios.get(`${CONFIG.API_BASE}/codes/${id}`, {
				headers: {
					...authHeaders
				}
			});
			return res.data;
		},
		getHealthIDs:  async (): Promise<any> => {
			const res = await axios.get(`${CONFIG.API_BASE}/ids`, {
				headers: {
					...authHeaders
				}
			});
			return res.data;
		}
	}


};

