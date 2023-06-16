import {
	Box,
	Typography,
	TextField,
	MenuItem,
	InputAdornment,
	FormControl,
	FormLabel,
	RadioGroup,
	FormControlLabel,
	Radio,
	Checkbox,
	FormGroup,
	Grid
} from '@mui/material';
import React, {useState} from 'react';
import TaxonomySearch from '../../util/TaxonomySearch';
import {useSelector} from "../../../../state/utilities/use_selector";
import Loading from "../../util/Loading";

const AdvancedSearchFields = ({formState, dispatch}) => {

	const {
		purpose: purposes,
		region: regions,
		organization: organizations,
		animal_identifier_type: animal_identifier_types,
	} = useSelector(state => state.CodeTables.tables);

	const codesLoaded = useSelector(state => state.CodeTables.initialized);

	const validLocation = [
		{value: 'REGION', label: 'Region'},
		{value: 'MANAGEMENT_UNIT', label: 'Management Unit'},
		{value: 'POPULATION_UNIT', label: 'Population Unit'},
		{value: 'HERD_NAME', label: 'Herd Name'},
		{value: 'CITY', label: 'City'}
	];
	const validAgeClass = [
		{value: 'YOUNG_OF_THE_YEAR', label: 'Young of the year'},
		{value: 'JUVENILE', label: 'Juvenile'},
		{value: 'ADULT', label: 'Adult'},
		{value: 'AGED_ADULT', label: 'Aged adult'},
		{value: 'UNCLASSIFIED', label: 'Unclassified'}
	];

	const validSample = [
		{value: 'COLLECTED', label: 'Samples were collected'},
		{value: 'NOT_COLLECTED', label: 'Samples were NOT collected'}
	];

	const idStatus = [
		{value: 'ASSIGNED', label: 'Assigned'},
		{value: 'UNASSIGNED', label: 'Unassigned'},
		{value: 'RETIRED', label: 'Retired'},
		{value: 'RECAPTURE', label: 'Retired - Recapture IDs'},
		{value: 'FLAGGED', label: 'Retired - Flagged IDs'}
	];

	if (!codesLoaded) {
		return (<Loading/>);
	}

	return (
		<>
			<Grid item xs={12} md={12}>
				<FormGroup row className="creationPeriodCheckbox">
					<FormControlLabel
						control={<Checkbox />}
						value="TODAY"
						checked={formState.namedDateRanges.includes('TODAY')}
						onChange={e => {
							const t: HTMLInputElement = e.target as HTMLInputElement;
							if (t.checked) {
								dispatch({type: 'addArrayElement', payload: {field: 'namedDateRanges', value: t.value}});
							} else {
								dispatch({type: 'removeArrayElement', payload: {field: 'namedDateRanges', value: t.value}});
							}
						}}
						label="WLH IDs Created Today"
					/>
					<FormControlLabel
						value="THIS_WEEK"
						checked={formState.namedDateRanges.includes('THIS_WEEK')}
						onChange={e => {
							const t: HTMLInputElement = e.target as HTMLInputElement;
							if (t.checked) {
								dispatch({type: 'addArrayElement', payload: {field: 'namedDateRanges', value: t.value}});
							} else {
								dispatch({type: 'removeArrayElement', payload: {field: 'namedDateRanges', value: t.value}});
							}
						}}
						control={<Checkbox />}
						label="WLH IDs Created This Week"
					/>
					<FormControlLabel
						value="LAST_WEEK"
						checked={formState.namedDateRanges.includes('LAST_WEEK')}
						onChange={e => {
							const t: HTMLInputElement = e.target as HTMLInputElement;
							if (t.checked) {
								dispatch({type: 'addArrayElement', payload: {field: 'namedDateRanges', value: t.value}});
							} else {
								dispatch({type: 'removeArrayElement', payload: {field: 'namedDateRanges', value: t.value}});
							}
						}}
						control={<Checkbox />}
						label="WLH IDS Created Last Week"
					/>
					<FormControlLabel
						value="LAST_MONTH"
						checked={formState.namedDateRanges.includes('LAST_MONTH')}
						onChange={e => {
							const t: HTMLInputElement = e.target as HTMLInputElement;
							if (t.checked) {
								dispatch({type: 'addArrayElement', payload: {field: 'namedDateRanges', value: t.value}});
							} else {
								dispatch({type: 'removeArrayElement', payload: {field: 'namedDateRanges', value: t.value}});
							}
						}}
						control={<Checkbox />}
						label="WLH IDS Created Last Month"
					/>
				</FormGroup>
			</Grid>
			<Grid item xs={12} md={6}>
				<TextField
					label="From (enter WLH ID Number)"
					id="fromID"
					value={formState.minimumId}
					onChange={e => {
						dispatch({type: 'fieldChange', payload: {field: `minimumId`, value: e.target.value}});
					}}
				/>
			</Grid>
			<Grid item xs={12} md={6}>
				<TextField
					label="To (enter WLH ID Number)"
					id="toID"
					value={formState.maximumId}
					onChange={e => {
						dispatch({type: 'fieldChange', payload: {field: `maximumId`, value: e.target.value}});
					}}
				/>
			</Grid>
			<Grid item xs={12} md={6}>
				<TextField
					id="startDate"
					name="startDate"
					type={'date'}
					label="Start Date of WLH ID Creation"
					value={formState.creation.startDate}
					onChange={e => {
						dispatch({type: 'fieldChange', payload: {field: `creation.startDate`, value: e.target.value}});
					}}
					InputLabelProps={{
						shrink: true
					}}
				/>
			</Grid>
			<Grid item xs={12} md={6}>
				<TextField
					id="endDate"
					name="endDate"
					type={'date'}
					label="End Date of WLH ID Creation"
					value={formState.creation.endDate}
					onChange={e => {
						dispatch({type: 'fieldChange', payload: {field: `creation.endDate`, value: e.target.value}});
					}}
					InputLabelProps={{
						shrink: true
					}}
				/>
			</Grid>
			<Grid item xs={12} md={6}>
				<TextField
					select
					id="idStatus"
					label="WLH ID Status"
					value={formState.status}
					onChange={e => {
						dispatch({type: 'fieldChange', payload: {field: `status`, value: e.target.value}});
					}}
				>
					{idStatus.map((m, i) => (
						<MenuItem key={m.value} value={m.value}>
							{m.label}
						</MenuItem>
					))}
				</TextField>
			</Grid>
			<Grid container item xs={12} md={12} spacing={4}>
				<Grid item xs={12} md={12}>
					<Typography className="detailsSubtitle">Purpose</Typography>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						select
						label="Purpose"
						value={formState.purpose}
						onChange={e => {
							dispatch({type: 'fieldChange', payload: {field: `purpose`, value: e.target.value}});
						}}
					>
						{purposes.codes.map((m) => (
							<MenuItem key={m.code} value={m.code}>
								{m.name}
							</MenuItem>
						))}
					</TextField>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						label="Requester First/Last Name"
						value={formState.requester.name}
						onChange={e => {
							dispatch({type: 'fieldChange', payload: {field: `requester.name`, value: e.target.value}});
						}}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						select
						label="Requester Organization"
						value={formState.requester.organization}
						onChange={e => {
							dispatch({type: 'fieldChange', payload: {field: `requester.organization`, value: e.target.value}});
						}}
					>
						{organizations.codes.map((m, i) => (
							<MenuItem key={m.code} value={m.code}>
								{m.name}
							</MenuItem>
						))}
					</TextField>
				</Grid>
			</Grid>
			<Grid container item xs={12} md={12} spacing={4}>
				<Grid item xs={12} md={12}>
					<Typography className="detailsSubtitle">Animal Details</Typography>
				</Grid>
				<Grid item xs={12} md={12}>
					<TaxonomySearch
						value={formState.species}
						onValueChange={v => {
							dispatch({type: 'fieldChange', payload: {field: `species`, value: v}});
						}}
						className="species"
					/>
				</Grid>

				<Grid item xs={12} md={6}>
					<TextField
						select
						label="Home Region"
						value={formState.region}
						onChange={e => {
							dispatch({type: 'fieldChange', payload: {field: `region`, value: e.target.value}});
						}}
					>
						{regions.codes.map((m, i) => (
							<MenuItem key={m.code} value={m.code}>
								{m.name}
							</MenuItem>
						))}
					</TextField>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						select
						label="Identifier Type"
						value={formState.identifier.type}
						onChange={e => {
							dispatch({type: 'fieldChange', payload: {field: `identifier.type`, value: e.target.value}});
						}}
					>
						{animal_identifier_types.codes.map((m, i) => (
							<MenuItem key={m.code} value={m.code}>
								{m.name}
							</MenuItem>
						))}
					</TextField>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						label="Other Identifier ID"
						value={formState.identifier.details}
						onChange={e => {
							dispatch({type: 'fieldChange', payload: {field: `identifier.details`, value: e.target.value}});
						}}
					/>
				</Grid>
			</Grid>
			<Grid container item xs={12} md={12} spacing={4}>
				<Grid item xs={12} md={12}>
					<Typography className="detailsSubtitle">Events</Typography>
				</Grid>
				<Grid item xs={12} md={12}>
					<FormControl className="eventRadios">
						<FormLabel>Event Type</FormLabel>
						<RadioGroup
							row
							value={formState.events.type}
							onChange={e => {
								dispatch({type: 'fieldChange', payload: {field: `events.type`, value: e.target.value}});
							}}
						>
							<FormControlLabel value="" control={<Radio />} label="Any" />
							<FormControlLabel value="capture" control={<Radio />} label="Capture" />
							<FormControlLabel value="mortality" control={<Radio />} label="Mortality" />
							<FormControlLabel value="recapture" control={<Radio />} label="Recapture" />
							<FormControlLabel value="release" control={<Radio />} label="Release" />
						</RadioGroup>
					</FormControl>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						label="Event Start Date"
						value={formState.events.startDate}
						type={'date'}
						onChange={e => {
							dispatch({type: 'fieldChange', payload: {field: `events.startDate`, value: e.target.value}});
						}}
						InputLabelProps={{
							shrink: true
						}}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						label="Event End Date"
						value={formState.events.endDate}
						type={'date'}
						onChange={e => {
							dispatch({type: 'fieldChange', payload: {field: `events.endDate`, value: e.target.value}});
						}}
						InputLabelProps={{
							shrink: true
						}}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						select
						label="Location"
						value={formState.events.location.type}
						onChange={e => {
							dispatch({type: 'fieldChange', payload: {field: `events.location.type`, value: e.target.value}});
						}}
					>
						{validLocation.map((m, i) => (
							<MenuItem key={m.value} value={m.value}>
								{m.label}
							</MenuItem>
						))}
					</TextField>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						label="Location Details"
						value={formState.events.location.details}
						onChange={e => {
							dispatch({type: 'fieldChange', payload: {field: `events.location.details`, value: e.target.value}});
						}}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						label="Submitter First/Last Name"
						value={formState.events.submitter.name}
						onChange={e => {
							dispatch({type: 'fieldChange', payload: {field: `events.submitter.name`, value: e.target.value}});
						}}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						select
						value={formState.events.submitter.organization}
						onChange={e => {
							dispatch({type: 'fieldChange', payload: {field: `events.submitter.organization`, value: e.target.value}});
						}}
						label="Submitter Organization"
					>
						{organizations.codes.map((m, i) => (
							<MenuItem key={m.code} value={m.code}>
								{m.name}
							</MenuItem>
						))}
					</TextField>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						select
						value={formState.events.ageClass}
						onChange={e => {
							dispatch({type: 'fieldChange', payload: {field: `events.ageClass`, value: e.target.value}});
						}}
						label="Age Class"
					>
						{validAgeClass.map((m, i) => (
							<MenuItem key={m.value} value={m.value}>
								{m.label}
							</MenuItem>
						))}
					</TextField>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						select
						value={formState.events.samples}
						onChange={e => {
							dispatch({type: 'fieldChange', payload: {field: `events.samples`, value: e.target.value}});
						}}
						label="Samples"
					>
						{validSample.map((m, i) => (
							<MenuItem key={m.value} value={m.value}>
								{m.label}
							</MenuItem>
						))}
					</TextField>
				</Grid>
			</Grid>
		</>
	);
};

export default AdvancedSearchFields;
