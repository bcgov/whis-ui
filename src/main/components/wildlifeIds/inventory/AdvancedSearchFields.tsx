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
	FormGroup
} from '@mui/material';
import React, {useState} from 'react';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TaxonomySearch from '../../util/TaxonomySearch';

const AdvancedSearchFields = ({formState, dispatch}) => {

	const validPurposes = [
		{value: 'UNKNOWN', label: 'Unknown'},
		{value: 'HERD_HEALTH', label: 'Herd Health'},
		{value: 'PASSIVE', label: 'Passive Surveillance'},
		{value: 'TARGETED', label: 'Targeted Surveillance'}
	];
	const validIdentifier = [
		{value: 'UNKNOWN', label: 'Alternate Animal ID'},
		{value: 'COMPULSORY', label: 'Compulsory Inspection Number'},
		{value: 'EAR_TAG', label: 'Ear Tag Number'},
		{value: 'HUMAN_WILDLIFE', label: 'Human Wildlife Conflict Number'},
		{value: 'COORS', label: 'COORS Number'},
		{value: 'MICROCHIP', label: 'Microchip'},
		{value: 'NICKNA', label: 'Nickna'},
		{value: 'PIT_TAG', label: 'Pit Tag Number'},
		{value: 'RAPP_TAG', label: 'RAPP Ear Tag'},
		{value: 'RECAPTURE_ID', label: 'Recapture ID'},
		{value: 'VAGINAL', label: 'Vaginal Implant Transmitter'},
		{value: 'WING_BAND', label: 'Wing Band'}
	];
	const validOrganization = [
		{value: 'ONE', label: 'Organization 1'},
		{value: 'TWO', label: 'Organization 2'},
		{value: 'THREE', label: 'Organization 3'},
		{value: 'FOUR', label: 'Organization 4'}
	];
	const validRegion = [
		{value: 'PEACE', label: 'Region 1'},
		{value: 'TWO', label: 'Region 2'},
		{value: 'THREE', label: 'Region 3'},
		{value: 'FOUR', label: 'Region 4'}
	];
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

	return (
		<>
			< FormGroup row className="creationPeriodCheckbox">
				<FormControlLabel
					control={<Checkbox/>}
					value='TODAY'
					checked={formState.namedDateRanges.includes('TODAY')}
					onChange={(e) => {
						const t: HTMLInputElement = e.target as HTMLInputElement;
						if (t.checked) {
							dispatch({type: 'addArrayElement', payload: {field: 'namedDateRanges', value: t.value}});
						} else {
							dispatch({type: 'removeArrayElement', payload: {field: 'namedDateRanges', value: t.value}});
						}
					}
					}
					label="WLH IDs Created Today"
				/>
				<FormControlLabel
					value='THIS_WEEK'
					checked={formState.namedDateRanges.includes('THIS_WEEK')}
					onChange={(e) => {
						const t: HTMLInputElement = e.target as HTMLInputElement;
						if (t.checked) {
							dispatch({type: 'addArrayElement', payload: {field: 'namedDateRanges', value: t.value}});
						} else {
							dispatch({type: 'removeArrayElement', payload: {field: 'namedDateRanges', value: t.value}});
						}
					}
					}
					control={<Checkbox/>}
					label="WLH IDs Created This Week"
				/>
				<FormControlLabel
					value='LAST_WEEK'
					checked={formState.namedDateRanges.includes('LAST_WEEK')}
					onChange={(e) => {
						const t: HTMLInputElement = e.target as HTMLInputElement;
						if (t.checked) {
							dispatch({type: 'addArrayElement', payload: {field: 'namedDateRanges', value: t.value}});
						} else {
							dispatch({type: 'removeArrayElement', payload: {field: 'namedDateRanges', value: t.value}});
						}
					}
					}
					control={<Checkbox/>}
					label="WLH IDS Created Last Week"
				/>
				<FormControlLabel
					value='LAST_MONTH'
					checked={formState.namedDateRanges.includes('LAST_MONTH')}
					onChange={(e) => {
						const t: HTMLInputElement = e.target as HTMLInputElement;
						if (t.checked) {
							dispatch({type: 'addArrayElement', payload: {field: 'namedDateRanges', value: t.value}});
						} else {
							dispatch({type: 'removeArrayElement', payload: {field: 'namedDateRanges', value: t.value}});
						}
					}
					}
					control={<Checkbox/>}
					label="WLH IDS Created Last Month"/>
			</FormGroup>
			<TextField
				label="From (enter WLH ID Number)"
				id="fromID"
				value={formState.minimumId}
				onChange={(e) => {
					dispatch({type: 'fieldChange', payload: {field: `minimumId`, value: e.target.value}});
				}}
				className="leftColumn"/>

			<TextField
				label="To (enter WLH ID Number)"
				id="toID"
				value={formState.maximumId}
				onChange={(e) => {
					dispatch({type: 'fieldChange', payload: {field: `maximumId`, value: e.target.value}});
				}}
				className="rightColumn"
			/>

			<TextField
				className="leftColumn"
				id="startDate"
				name="startDate"
				type={'date'}
				label="Start Date of WLH ID Creation"
				value={formState.creation.startDate}
				onChange={(e) => {
					dispatch({type: 'fieldChange', payload: {field: `creation.startDate`, value: e.target.value}});
				}}
				InputLabelProps={{
					shrink: true,
				}}
			/>

			<TextField
				className="rightColumn"
				id="endDate"
				name="endDate"
				type={'date'}
				label="End Date of WLH ID Creation"
				value={formState.creation.endDate}
				onChange={(e) => {
					dispatch({type: 'fieldChange', payload: {field: `creation.endDate`, value: e.target.value}});
				}}
				InputLabelProps={{
					shrink: true,
				}}
			/>
			<TextField
				select
				className="rightColumn"
				id="idStatus"
				label="WLH ID Status"
				value={formState.status}
				onChange={(e) => {
					dispatch({type: 'fieldChange', payload: {field: `status`, value: e.target.value}});
				}}
			>
				{idStatus.map((m, i) => (
					<MenuItem key={i} value={m.value}>
						{m.label}
					</MenuItem>
				))}
			</TextField>
			<Typography className="detailsSubtitle">Purpose</Typography>
			<TextField
				className="leftColumn"
				select
				label="Purpose"
				value={formState.purpose}
				onChange={(e) => {
					dispatch({type: 'fieldChange', payload: {field: `purpose`, value: e.target.value}});
				}}
			>
				{validPurposes.map((m, i) => (
					<MenuItem key={i} value={m.value}>
						{m.label}
					</MenuItem>
				))}
			</TextField>
			<TextField className="rightColumn" label="Requester First/Last Name" value={formState.requester.name}
								 onChange={(e) => {
									 dispatch({type: 'fieldChange', payload: {field: `requester.name`, value: e.target.value}});
								 }}/>
			<TextField className="leftColumn" select label="Requester Organization" value={formState.requester.organization}
								 onChange={(e) => {
									 dispatch({type: 'fieldChange', payload: {field: `requester.organization`, value: e.target.value}});
								 }}>
				{validOrganization.map((m, i) => (
					<MenuItem key={i} value={m.value}>
						{m.label}
					</MenuItem>
				))}
			</TextField>

			<Typography className="detailsSubtitle">Animal Details</Typography>
			<TaxonomySearch
				value={formState.species}
				onValueChange={(v) => {
					dispatch({type: 'fieldChange', payload: {field: `species`, value: v}});
				}}
				className="species"
			/>

			<TextField
				className="leftColumn"
				select
				label="Home Region"
				value={formState.region}
				onChange={(e) => {
					dispatch({type: 'fieldChange', payload: {field: `region`, value: e.target.value}});
				}}
			>
				{validRegion.map((m, i) => (
					<MenuItem key={i} value={m.value}>
						{m.label}
					</MenuItem>
				))}
			</TextField>
			<TextField
				className="rightColumn"
				select
				label="Identifier Type"
				value={formState.identifier.type}
				onChange={(e) => {
					dispatch({type: 'fieldChange', payload: {field: `identifier.type`, value: e.target.value}});
				}}
			>
				{validIdentifier.map((m, i) => (
					<MenuItem key={i} value={m.value}>
						{m.label}
					</MenuItem>
				))}
			</TextField>

			<TextField
				className="leftColumn"
				label="Other Identifier ID"
				value={formState.identifier.details}
				onChange={(e) => {
					dispatch({type: 'fieldChange', payload: {field: `identifier.details`, value: e.target.value}});
				}}
			/>

			<Typography className="detailsSubtitle">Events</Typography>

			<FormControl className="eventRadios">
				<FormLabel>Event Type</FormLabel>
				<RadioGroup
					row
					value={formState.events.type}
					onChange={(e) => {
						dispatch({type: 'fieldChange', payload: {field: `events.type`, value: e.target.value}});
					}}
				>
					<FormControlLabel value="" control={<Radio/>} label="Any"/>
					<FormControlLabel value="capture" control={<Radio/>} label="Capture"/>
					<FormControlLabel value="mortality" control={<Radio/>} label="Mortality"/>
					<FormControlLabel value="recapture" control={<Radio/>} label="Recapture"/>
					<FormControlLabel value="release" control={<Radio/>} label="Release"/>
				</RadioGroup>
			</FormControl>

			<TextField
				className="leftColumn"
				label="Event Start Date"
				value={formState.events.startDate}
				type={'date'}
				onChange={(e) => {
					dispatch({type: 'fieldChange', payload: {field: `events.startDate`, value: e.target.value}});
				}}
				InputLabelProps={{
					shrink: true,
				}}
			/>
			<TextField
				className="rightColumn"
				label="Event End Date"
				value={formState.events.endDate}
				type={'date'}
				onChange={(e) => {
					dispatch({type: 'fieldChange', payload: {field: `events.endDate`, value: e.target.value}});
				}}
				InputLabelProps={{
					shrink: true,
				}}
			/>
			<TextField
				className="leftColumn"
				select
				label="Location"
				value={formState.events.location.type}
				onChange={(e) => {
					dispatch({type: 'fieldChange', payload: {field: `events.location.type`, value: e.target.value}});
				}}
			>
				{validLocation.map((m, i) => (
					<MenuItem key={i} value={m.value}>
						{m.label}
					</MenuItem>
				))}
			</TextField>
			<TextField
				className="rightColumn"
				label="Location Details"
				value={formState.events.location.details}
				onChange={(e) => {
					dispatch({type: 'fieldChange', payload: {field: `events.location.details`, value: e.target.value}});
				}}
			/>
			<TextField
				className="leftColumn"
				label="Submitter First/Last Name"
				value={formState.events.submitter.name}
				onChange={(e) => {
					dispatch({type: 'fieldChange', payload: {field: `events.submitter.name`, value: e.target.value}});
				}}
			/>
			<TextField
				className="rightColumn"
				select
				value={formState.events.submitter.organization}
				onChange={(e) => {
					dispatch({type: 'fieldChange', payload: {field: `events.submitter.organization`, value: e.target.value}});
				}}
				label="Submitter Organization"
			>
				{validOrganization.map((m, i) => (
					<MenuItem key={i} value={m.value}>
						{m.label}
					</MenuItem>
				))}
			</TextField>
			<TextField
				className="leftColumn"
				select
				value={formState.events.ageClass}
				onChange={(e) => {
					dispatch({type: 'fieldChange', payload: {field: `events.ageClass`, value: e.target.value}});
				}}
				label="Age Class"
			>
				{validAgeClass.map((m, i) => (
					<MenuItem key={i} value={m.value}>
						{m.label}
					</MenuItem>
				))}
			</TextField>
			<TextField
				className="rightColumn"
				select
				value={formState.events.samples}
				onChange={(e) => {
					dispatch({type: 'fieldChange', payload: {field: `events.samples`, value: e.target.value}});
				}}
				label="Samples">
				{validSample.map((m, i) => (
					<MenuItem key={i} value={m.value}>
						{m.label}
					</MenuItem>
				))}
			</TextField>
		</>
	);
};

export default AdvancedSearchFields;
