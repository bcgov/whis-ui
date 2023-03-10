import React, {useReducer, useState} from 'react';
import _ from 'lodash';


import {
	Box,
	Button,
	Card,
	InputAdornment,
	MenuItem,
	TextField,
	Typography
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {useNavigate} from 'react-router-dom';
import HidableSearchForm from './HidableSearchForm';
import FilterResult from './FilterResult';
import {useSelector} from "../../../../state/utilities/use_selector";
import {getDevMode} from "../../../../state/utilities/config_helper";
import {SEARCH_EXECUTE} from "../../../../state/actions";
import {useDispatch} from "react-redux";
import TemporaryResults from "./TemporaryResults";

// from the API -- keep this interface in sync.
interface HealthIDSearchParams {
	id?: number,
	year?: number,
	wlhID?: string,
	keywords?: string,
	sequenceNumberMinimum?: number | null,
	sequenceNumberMaximum?: number | null,
	creationDateMinimum?: number | null, //millis since epoch
	creationDateMaximum?: number | null, //millis since epoch
	creator?: string,
	currentStatus?: string,
	purpose?: string,
	requester?: string,
	requesterOrganization?: string,
	species?: string,
	homeRegion?: string
}

const Search: React.FC = () => {
	const navigate = useNavigate();
	const devMode = useSelector(getDevMode);
	const dispatch = useDispatch();

	function constructAPISearchRequest(): HealthIDSearchParams {
		return {
			keywords: searchRequest.keywords,
		}
	}

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
		}


		return updatedState;
	}

	const [searchRequest, searchDispatch] = useReducer(searchReducer, {
		keywords: ""
	}, searchReducerInit);

	const idCreationPeriod = [
		{value: 'TODAY', label: 'WLH IDs Created Today'},
		{value: 'THIS_WEEK', label: 'WLH IDs Created This Week'},
		{value: 'LAST_WEEK', label: 'WLH IDs Created Last Week'},
		{value: 'LAST_MONTH', label: 'WLH IDs Created Last Month'},
		{value: 'NONE', label: 'None'}
	];
	const idStatus = [
		{value: 'ASSIGNED', label: 'Assigned'},
		{value: 'UNASSIGNED', label: 'Unassigned'},
		{value: 'RETIRED', label: 'Retired'},
		{value: 'RECAPTURE', label: 'Retired - Recapture IDs'},
		{value: 'FLAGGED', label: 'Retired - Flagged IDs'}
	];


	const [AdvancedSearchExpand, setAdvancedSearchExpand] = useState(false);

	return (
		<Box className="container">
			<Box className="pageHead">
				<Box className="mainTitle">
					<Typography fontFamily={'BCSans-Bold'} sx={{fontSize: '32px'}}>
						WLH ID Inventory
					</Typography>
					<Typography sx={{marginBottom: '28px', fontSize: '16px', color: '#787f81'}}>
						Find the WLH ID (s) and update the data associated to each ID.
					</Typography>
				</Box>
				<Button
					variant={'contained'}
					sx={{width: '150px', height: '32px', textTransform: 'capitalize', marginBlock: '10px'}}
					onClick={() => {
						navigate('/wildlifeIds/list');
					}}
				>
					Go to IDs List
				</Button>
			</Box>

			{devMode && <Card className="paperStyle">
				<pre>
					{JSON.stringify(searchRequest, '\t', 2)}
				</pre>
			</Card>}

			<Card className="paperStyle">
				<Typography className="detailsSubtitle">Filter WLH IDs</Typography>

				<TextField
					label="Enter Event History and Associated Project Keywords"
					className='eventKeywords'
					value={searchRequest.keywords}
					onChange={e => {
						searchDispatch({type: 'fieldChange', payload: {field: `keywords`, value: e.target.value}});
					}}
				/>
				<TextField label="From (enter WLH ID Number)" id="fromID" className="leftColumn"/>
				<TextField label="To (enter WLH ID Number)" id="toID" className="rightColumn"/>
				<TextField
					className="leftColumn"
					id="startDate"
					name="startDate"
					label="Start Date of WLH ID Creation (MM-DD-YYYY)"
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<CalendarTodayIcon/>
							</InputAdornment>
						)
					}}
				/>
				<TextField
					className="rightColumn"
					id="endDate"
					name="endDate"
					label="End Date of WLH ID Creation (MM-DD-YYYY)"
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<CalendarTodayIcon/>
							</InputAdornment>
						)
					}}
				/>
				<TextField select className="leftColumn" id="idCreationPeriod" label="WLH ID Creation Period">
					{idCreationPeriod.map((m, i) => (
						<MenuItem key={i} value={m.value}>
							{m.label}
						</MenuItem>
					))}
				</TextField>
				<TextField select className="rightColumn" id="idStatus" label="WLH ID Status">
					{idStatus.map((m, i) => (
						<MenuItem key={i} value={m.value}>
							{m.label}
						</MenuItem>
					))}
				</TextField>

				{AdvancedSearchExpand ? (
					<HidableSearchForm formState={searchRequest}/>
				) : (
					''
				)}

				<Box className="cardButtons">
					<Button variant={'contained'} onClick={() => {
						const resolvedSearchRequest = constructAPISearchRequest();
						dispatch({
							type: SEARCH_EXECUTE,
							payload: {
								searchRequest
							}
						});
					}
					}>
						Search
					</Button>
					<Button
						variant={'outlined'}
						onClick={() => {
							setAdvancedSearchExpand(!AdvancedSearchExpand);
						}}
					>
						{AdvancedSearchExpand ? <>Basic Search <KeyboardArrowUpIcon/></> : <>Advanced Search <KeyboardArrowDownIcon/></>}
					</Button>
				</Box>
			</Card>

			<TemporaryResults/>

			{/*<FilterResult/>*/}
		</Box>
	);
};
export default Search;
