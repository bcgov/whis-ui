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
import Debug from "../../util/Debug";

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
					value={formState.creationStartDate}
					onChange={e => {
						dispatch({type: 'fieldChange', payload: {field: `creationStartDate`, value: e.target.value}});
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
					value={formState.creationEndDate}
					onChange={e => {
						dispatch({type: 'fieldChange', payload: {field: `creationEndDate`, value: e.target.value}});
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
						value={formState.requesterName}
						onChange={e => {
							dispatch({type: 'fieldChange', payload: {field: `requesterName`, value: e.target.value}});
						}}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						select
						label="Requester Organization"
						value={formState.requesterOrganization}
						onChange={e => {
							dispatch({type: 'fieldChange', payload: {field: `requesterOrganization`, value: e.target.value}});
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
						value={formState.speciesObject}
						onValueChange={v => {
							dispatch({type: 'fieldChange', payload: {field: `speciesObject`, value: v}});
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
						{regions.codes.map((m) => (
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
						value={formState.identifierType}
						onChange={e => {
							dispatch({type: 'fieldChange', payload: {field: `identifierType`, value: e.target.value}});
						}}
					>
						{animal_identifier_types.codes.map((m) => (
							<MenuItem key={m.code} value={m.code}>
								{m.name}
							</MenuItem>
						))}
					</TextField>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						label="Other Identifier ID"
						value={formState.identifierDetails}
						onChange={e => {
							dispatch({type: 'fieldChange', payload: {field: `identifierDetails`, value: e.target.value}});
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
							value={formState.eventType}
							onChange={e => {
								dispatch({type: 'fieldChange', payload: {field: `eventType`, value: e.target.value}});
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
						value={formState.eventStartDate}
						type={'date'}
						onChange={e => {
							dispatch({type: 'fieldChange', payload: {field: `eventStartDate`, value: e.target.value}});
						}}
						InputLabelProps={{
							shrink: true
						}}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						label="Event End Date"
						value={formState.eventEndDate}
						type={'date'}
						onChange={e => {
							dispatch({type: 'fieldChange', payload: {field: `eventEndDate`, value: e.target.value}});
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
						value={formState.eventLocationType}
						onChange={e => {
							dispatch({type: 'fieldChange', payload: {field: `eventLocationType`, value: e.target.value}});
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
						value={formState.eventLocationDetails}
						onChange={e => {
							dispatch({type: 'fieldChange', payload: {field: `eventLocationDetails`, value: e.target.value}});
						}}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						label="Submitter First/Last Name"
						value={formState.eventSubmitterName}
						onChange={e => {
							dispatch({type: 'fieldChange', payload: {field: `eventSubmitterName`, value: e.target.value}});
						}}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						select
						value={formState.eventSubmitterOrganization}
						onChange={e => {
							dispatch({type: 'fieldChange', payload: {field: `eventSubmitterOrganization`, value: e.target.value}});
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
						value={formState.eventAgeClass}
						onChange={e => {
							dispatch({type: 'fieldChange', payload: {field: `eventAgeClass`, value: e.target.value}});
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
						value={formState.eventSamples}
						onChange={e => {
							dispatch({type: 'fieldChange', payload: {field: `eventSamples`, value: e.target.value}});
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
			<Debug item={formState}/>
		</>
	);
};

export default AdvancedSearchFields;
