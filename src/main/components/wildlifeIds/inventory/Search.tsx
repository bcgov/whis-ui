import React, {Reducer, useLayoutEffect, useReducer, useRef, useState} from 'react';
import _ from 'lodash';

import {Box, Button, Card, Grid, TextField, Typography, useMediaQuery} from '@mui/material';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import {useNavigate} from 'react-router-dom';
import HidableSearchForm from './AdvancedSearchFields';
import SearchResults from './SearchResults';
import {useSelector} from '../../../../state/utilities/use_selector';
import {getDevMode} from '../../../../state/utilities/config_helper';
import {SEARCH_EXECUTE} from '../../../../state/actions';
import {useDispatch} from 'react-redux';
import {getSearchRequestFromSearchFormState, SearchFormState} from '../../../../state/utilities/search_api';

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

	const [searchRequest, searchDispatch] = useReducer<Reducer<SearchFormState, any>, any>(
		searchReducer,
		{
			keywords: '',
			minimumId: '',
			maximumId: '',
			namedDateRanges: [],
			creationStartDate: '',
			creationEndDate: '',
			status: '',
			purpose: '',
			requesterName: '',
			requesterOrganization: '',
			region: '',
			speciesObject: null,
			identifierType: '',
			identifierDetails: '',
			eventType: '',
			eventStartDate: '',
			eventEndDate: '',
			eventSubmitterName: '',
			eventSubmitterOrganization: '',
			eventLocationType: '',
			eventLocationDetails: '',
			eventAgeClass: '',
			eventSamples: ''
		},
		searchReducerInit
	);

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
					<Typography variant="h1">WLH ID Inventory</Typography>
					<Typography variant="h6">Filter the WLH ID (s) and update the data associated to each ID.</Typography>
					{devMode && (
						<>
							<h5>Search Object</h5>
							<pre>{JSON.stringify(searchRequest, null, 2)}</pre>
						</>
					)}
				</Box>
			</Box>

			<Card className="paperStyle">
				<Grid container spacing={4} className="grid_absolute">
					<Grid container item xs={12} md={12} spacing={2} alignItems={'center'}>
						<Grid item xs={12} md={10.5}>
							<TextField
								label="Enter WLH ID Number , Date, Status, Event History and Associated Project Keywords"
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
						</Grid>
						<Grid item xs={12} md={1.5}>
							<Button
								className="hideFilterButton"
								onClick={() => {
									setAdvancedSearchExpand(!advancedSearchExpand);
									setSearchButtonPosition(!searchButtonPosition);
								}}
							>
								{advancedSearchExpand ? (
									<>
										Hide Filters <FilterAltOutlinedIcon/>
									</>
								) : (
									<>
										Show Filters <FilterAltOutlinedIcon/>
									</>
								)}
							</Button>
						</Grid>
					</Grid>
					<Grid container item spacing={4} ref={ref} className="filterForm" sx={{display: advancedSearchExpand ? 'box' : 'none'}}>
						<HidableSearchForm formState={searchRequest} dispatch={searchDispatch}/>
					</Grid>
					<Grid item xs={12} md={12}>
						<Button className="searchButton" variant="outlined" sx={searchButtonPosition ? {display: 'auto'} : {display: 'none'}}>
							Clear All
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
					</Grid>
				</Grid>
			</Card>

			<SearchResults/>
		</Box>
	);
};
export default Search;
