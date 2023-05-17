import React, {useLayoutEffect, useReducer, useRef, useState} from 'react';
import _ from 'lodash';

import {Box, Button, Card, TextField, Typography} from '@mui/material';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import {useNavigate} from 'react-router-dom';
import HidableSearchForm from './AdvancedSearchFields';
import SearchResults from './SearchResults';
import {useSelector} from '../../../../state/utilities/use_selector';
import {getDevMode} from '../../../../state/utilities/config_helper';
import {SEARCH_EXECUTE} from '../../../../state/actions';
import {useDispatch} from 'react-redux';
import {getSearchRequestFromSearchFormState} from '../../../../state/utilities/search_api';
import NewContactDialog from './NewContactDialog';
import {Add} from '@mui/icons-material';

// from the API -- keep this interface in sync.
interface HealthIDSearchParams {
	id?: number;
	year?: number;
	wlhID?: string;
	keywords?: string;
	sequenceNumberMinimum?: number | null;
	sequenceNumberMaximum?: number | null;
	creationDateMinimum?: number | null; //millis since epoch
	creationDateMaximum?: number | null; //millis since epoch
	creator?: string;
	currentStatus?: string;
	purpose?: string;
	requester?: string;
	requesterOrganization?: string;
	species?: string;
	homeRegion?: string;
}

const Search: React.FC = () => {
	const navigate = useNavigate();
	const devMode = useSelector(getDevMode);
	const dispatch = useDispatch();

	function searchReducerInit(initialState) {
		return initialState;
	}

	function searchReducer(state, action) {
		const updatedState = {...state};
		switch (action.type) {
			case 'fieldChange':
				// for simple field changes
				_.set(updatedState, action.payload.field, action.payload.value);
				break;
			case 'addArrayElement':
				_.set(updatedState, action.payload.field, _.union(_.get(updatedState, action.payload.field), [action.payload.value]));
				break;
			case 'removeArrayElement':
				_.set(updatedState, action.payload.field, _.without(_.get(updatedState, action.payload.field), action.payload.value));
				break;
		}

		return updatedState;
	}

	const [searchRequest, searchDispatch] = useReducer(
		searchReducer,
		{
			keywords: '',
			minimumId: '',
			maximumId: '',
			namedDateRanges: [],
			creation: {
				startDate: '',
				endDate: ''
			},
			status: '',
			purpose: '',
			requester: {
				name: '',
				organization: ''
			},
			species: '',
			region: '',
			identifier: {
				type: '',
				details: ''
			},
			events: {
				type: '',
				startDate: '',
				endDate: '',
				submitter: {
					name: '',
					organization: ''
				},
				location: {
					type: '',
					details: ''
				},
				ageClass: '',
				samples: ''
			}
		},
		searchReducerInit
	);

	const [addContactDialog, setAddContactDialog] = useState(false);

	const [advancedSearchExpand, setAdvancedSearchExpand] = useState(false);
	const [searchButtonPosition, setSearchButtonPosition] = useState(false);
	const [spacerProps, setSpacerProps] = useState({});
	const ref = useRef(null);

	useLayoutEffect(() => {
		const {height} = ref.current.getBoundingClientRect();
		if (advancedSearchExpand) {
			setSpacerProps({
				minHeight: `${height + 300}px`
			});
		} else {
			setSpacerProps({
				minHeight: 'auto'
			});
		}
	}, [ref.current, advancedSearchExpand]);

	return (
		<Box className="container" sx={spacerProps}>
			<Box className="pageHead">
				<Box className="mainTitle">
					<Typography variant="h1">Contact List</Typography>
					<Typography variant="h6">Search for the existing contacts, add a new contact or edit one.</Typography>
					{devMode && (
						<>
							<h5>Search Object</h5>
							<pre>{JSON.stringify(searchRequest, null, 2)}</pre>
						</>
					)}
				</Box>
				<Button
					variant={'contained'}
					onClick={() => {
						setAddContactDialog(true);
					}}
				>
					<Add /> Add New Contact
				</Button>
				<NewContactDialog
					open={addContactDialog}
					title={'Add New Contact'}
					updateAction={() => {
						setAddContactDialog(false);
					}}
					cancelAction={() => {
						setAddContactDialog(false);
					}}
					buttonText={'Add'}
					confirmTitle={'Create Contact List Confirmation'}
					confirmContent={'You have created a contact.'}
				/>
			</Box>

			<Card className="paperStyle">
				<Box className="searchBar">
					<TextField
						label="Enter First Name or Last Name of a Contact or any Other Keywords"
						className="eventKeywords"
						required
						value={searchRequest.keywords}
						onChange={e => {
							searchDispatch({type: 'fieldChange', payload: {field: `keywords`, value: e.target.value}});
						}}
						InputProps={{
							endAdornment: (
								<Button
									className="searchButton"
									sx={searchButtonPosition ? {display: 'none'} : {display: 'auto'}}
									variant={'contained'}
									onClick={() => {
										dispatch({
											type: SEARCH_EXECUTE,
											payload: {
												searchRequest: getSearchRequestFromSearchFormState(searchRequest)
											}
										});
									}}
								>
									Search
								</Button>
							)
						}}
					/>
					<Button
						className="hideFilterButton"
						onClick={() => {
							setAdvancedSearchExpand(!advancedSearchExpand);
							setSearchButtonPosition(!searchButtonPosition);
						}}
					>
						{advancedSearchExpand ? (
							<>
								Hide Filters <FilterAltOutlinedIcon />
							</>
						) : (
							<>
								Show Filters <FilterAltOutlinedIcon />
							</>
						)}
					</Button>
				</Box>

				<Box ref={ref} className="filterForm" sx={{display: advancedSearchExpand ? 'box' : 'none'}}>
					<HidableSearchForm formState={searchRequest} dispatch={searchDispatch} />
				</Box>
				<Button className="searchButton" variant="outlined" sx={searchButtonPosition ? {display: 'auto'} : {display: 'none'}}>
					Clear
				</Button>
				<Button
					className="searchButton"
					sx={searchButtonPosition ? {display: 'auto'} : {display: 'none'}}
					variant={'contained'}
					onClick={() => {
						dispatch({
							type: SEARCH_EXECUTE,
							payload: {
								searchRequest: getSearchRequestFromSearchFormState(searchRequest)
							}
						});
						setAdvancedSearchExpand(false);
						setSearchButtonPosition(false);
					}}
				>
					Search
				</Button>
			</Card>

			<SearchResults />
		</Box>
	);
};
export default Search;
