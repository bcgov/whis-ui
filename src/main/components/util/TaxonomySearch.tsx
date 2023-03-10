import React, {useCallback, useState} from 'react';
import '../../styles/components/loading.scss';
import {useSelector} from "react-redux";
import {getAuthHeaders} from "../../../state/utilities/authentication_helper";
import {getConfiguration} from "../../../state/utilities/config_helper";
import {default as axios} from "axios";
import debounce from 'lodash.debounce';
import {Autocomplete, InputAdornment, TextField} from "@mui/material";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";

const TaxonomySearch = ({value, onValueChange}) => {

	const authHeaders = useSelector(getAuthHeaders);
	const configuration = useSelector(getConfiguration);

	const [data, setData] = useState([]);

	async function runQuery(q: string) {
		const res = await axios.get(`${configuration.API_BASE}/autofill/taxonomy/${encodeURIComponent(q)}`, {
			headers: {
				...authHeaders
			}
		});
		return res.data;
	}

	const debouncedSearch = useCallback(
		debounce(term => {
			runQuery(term).then(result => {
				setData(result);
			}).catch(e => {
				setData([]);
			});
		}, 100), []);

	return (
		<div>
			<Autocomplete
				disablePortal
				options={data}
				onChange={(event, newValue) => {
					onValueChange(newValue?.label || '');
				}}
				isOptionEqualToValue={(option, value1) => {return option.label == value1}}
				value={value}
				freeSolo
				selectOnFocus
				clearOnBlur
				handleHomeEndKeys
				renderInput={(params) => <TextField {...params} onChange={e => {
					if (e.target.value.length > 0) {
						debouncedSearch(e.target.value);
					}
				}}
				label="Species"
				className={'leftColumn'}
				InputProps={{
					...params.InputProps,
					endAdornment: (
						<InputAdornment position="end">
							<AccountTreeOutlinedIcon/>
						</InputAdornment>
					)
				}}
				/>}
			/>
		</div>
	);
};

export default TaxonomySearch;
