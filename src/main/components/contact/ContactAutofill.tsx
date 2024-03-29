import React, {useCallback, useState} from 'react';
import '../../styles/components/loading.scss';
import {useSelector} from 'react-redux';
import {getAuthHeaders} from '../../../state/utilities/authentication_helper';
import {getConfiguration} from '../../../state/utilities/config_helper';
import {default as axios} from 'axios';
import debounce from 'lodash.debounce';
import {Autocomplete, InputAdornment, TextField} from '@mui/material';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';

const ContactAutofill = ({value, onValueChange, className, label = 'Contact List Entry'}) => {
	const authHeaders = useSelector(getAuthHeaders);
	const configuration = useSelector(getConfiguration);

	const [data, setData] = useState([]);

	async function runQuery(q: string) {
		const res = await axios.get(`${configuration.API_BASE}/autofill/contact/${encodeURIComponent(q)}`, {
			headers: {
				...authHeaders
			}
		});
		return res.data;
	}

	const debouncedSearch = useCallback(
		debounce(term => {
			runQuery(term)
				.then(result => {
					setData(result);
				})
				.catch(e => {
					setData([]);
				});
		}, 150),
		[authHeaders]
	);

	return (
		<>
			<Autocomplete
				disablePortal
				freeSolo
				options={data}
				onChange={(event, newValue) => {
					onValueChange(newValue);
				}}
				getOptionLabel={(option) => option.label}
				isOptionEqualToValue={(option, value) => {
					return option?.label == value?.label
				}}
				filterOptions={(x) => x}
				value={value}
				selectOnFocus
				clearOnBlur
				handleHomeEndKeys
				renderInput={params => (
					<TextField
						{...params}
						onChange={e => {
							if (e.target.value.length > 0) {
								debouncedSearch(e.target.value);
							}
						}}
						label={label}
						className={className}
						InputProps={{
							...params.InputProps,
							endAdornment: (
								<InputAdornment position="end">
									<AccountTreeOutlinedIcon/>
								</InputAdornment>
							)
						}}
					/>
				)}
			/>
		</>
	);
};

export default ContactAutofill;
