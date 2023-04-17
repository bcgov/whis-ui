import React, {useReducer, useState} from 'react';
import _ from 'lodash';

import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Button,
	Card,
	CardActions,
	CardHeader,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormGroup,
	FormHelperText,
	FormLabel,
	IconButton,
	IconButtonProps,
	InputAdornment,
	MenuItem,
	styled,
	TextField,
	Typography,
	useMediaQuery
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import {useNavigate} from 'react-router-dom';
import HidableSearchForm from './HidableSearchForm';
import FilterResult from './FilterResult';
import {useSelector} from '../../../../state/utilities/use_selector';
import {getDevMode} from '../../../../state/utilities/config_helper';
import {SEARCH_EXECUTE} from '../../../../state/actions';
import {useDispatch} from 'react-redux';
import TemporaryResults from './TemporaryResults';

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

	function constructAPISearchRequest(): HealthIDSearchParams {
		return {
			keywords: searchRequest.keywords
		};
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

	const [searchRequest, searchDispatch] = useReducer(
		searchReducer,
		{
			keywords: ''
		},
		searchReducerInit
	);

	const idCreationPeriod = [
		{value: 'TODAY', label: 'WLH IDs Created Today'},
		{value: 'THIS_WEEK', label: 'WLH IDs Created This Week'},
		{value: 'LAST_WEEK', label: 'WLH IDs Created Last Week'},
		{value: 'LAST_MONTH', label: 'WLH IDs Created Last Month'},
		{value: 'NONE', label: 'None'}
	];

	const [AdvancedSearchExpand, setAdvancedSearchExpand] = useState(false);
	const [searchButtonPosition, setSearchButtonPosition] = useState(false);

	const [showFilterChips, setShowFilterChips] = useState(false);

	// const hideBox = useMediaQuery('(min-height:1380px)');
	const hideBox = window.outerHeight;

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

			{devMode && (
				<Card className="paperStyle">
					<pre>{JSON.stringify(searchRequest, '\t', 2)}</pre>
				</Card>
			)}

			<Card className="paperStyle">
				<Box className="searchBar">
					<TextField
						label="Enter WLH ID Number , Date, Status, Event History and Associated Project Keywords"
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
										const resolvedSearchRequest = constructAPISearchRequest();
										dispatch({
											type: SEARCH_EXECUTE,
											payload: {
												searchRequest
											}
										});
										//show the chips after search
										setShowFilterChips(true);
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
							setAdvancedSearchExpand(!AdvancedSearchExpand);
							setSearchButtonPosition(!searchButtonPosition);
							console.log(hideBox);
						}}
					>
						{AdvancedSearchExpand ? (
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

				{AdvancedSearchExpand ? <HidableSearchForm formState={searchRequest} /> : ''}
				<Button
					className="searchButton"
					sx={searchButtonPosition ? {display: 'auto'} : {display: 'none'}}
					variant={'contained'}
					onClick={() => {
						const resolvedSearchRequest = constructAPISearchRequest();
						dispatch({
							type: SEARCH_EXECUTE,
							payload: {
								searchRequest
							}
						});
						setAdvancedSearchExpand(false);
						setSearchButtonPosition(false);
					}}
				>
					Search
				</Button>
			</Card>

			{/* <TemporaryResults /> */}

			<FilterResult showFilterChips={showFilterChips} />
			{AdvancedSearchExpand ? <Box sx={{height: '550px'}}></Box> : <></>}
		</Box>
	);
};
export default Search;
