import React, {useState} from 'react';
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

const Search: React.FC = () => {
	const navigate = useNavigate();

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
	

	const [formState, setFormState] = useState({
		quantity: 1,
		year: '2022',
		purpose: 'UNKNOWN',
		species: '',
		identifier: '',
		other_identifier: '',
		organization: '',
		requesterRegion: '',
		associatedProject: '',
		reason: ''
	});

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

			<Card className="paperStyle">
				<Typography className="detailsSubtitle">Filter WLH IDs</Typography>

				<TextField label="Enter Event History and Associated Project Keywords" className='eventKeywords' required />
				<TextField label="From (enter WLH ID Number)" id="fromID" className="leftColumn" />
				<TextField label="To (enter WLH ID Number)" id="toID" className="rightColumn" />
				<TextField
					className="leftColumn"
					id="startDate"
					name="startDate"
					label="Start Date of WLH ID Creation (MM-DD-YYYY)"
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<CalendarTodayIcon />
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
								<CalendarTodayIcon />
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
					<HidableSearchForm formState={formState} />
				) : (
					''
				)}

				<Box className="cardButtons">
					<Button variant={'contained'} >
						Search
					</Button>
					<Button
						variant={'outlined'}
						onClick={() => {
							setAdvancedSearchExpand(!AdvancedSearchExpand);
						}}
					>
						{AdvancedSearchExpand ? <>Basic Search <KeyboardArrowUpIcon /></> : <>Advanced Search <KeyboardArrowDownIcon /></>}
					</Button>
				</Box>
			</Card>
			<FilterResult/>
		</Box>
	);
};
export default Search;
