import {Box, Typography, TextField, MenuItem, InputAdornment, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio} from '@mui/material';
import React, {useState} from 'react';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const HideableSearchForm = formState => {
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
		{value: 'ONE', label: 'Region 1'},
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

	return (
		<Box>
			<Typography className="detailsSubtitle">Purpose</Typography>
			<TextField className="leftColumn" select label="Purpose">
				{validPurposes.map((m, i) => (
					<MenuItem key={i} value={m.value}>
						{m.label}
					</MenuItem>
				))}
			</TextField>
			<TextField className="rightColumn" label="Requester First/Last Name" />
			<TextField className="leftColumn" select label="Requester Organization">
				{validOrganization.map((m, i) => (
					<MenuItem key={i} value={m.value}>
						{m.label}
					</MenuItem>
				))}
			</TextField>

			<Typography className="detailsSubtitle">Animal Details</Typography>
			<TextField
				className="leftColumn"
				label="Species"
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							<AccountTreeOutlinedIcon />
						</InputAdornment>
					)
				}}
			/>
			<TextField className="rightColumn" select label="Home Region">
				{validRegion.map((m, i) => (
					<MenuItem key={i} value={m.value}>
						{m.label}
					</MenuItem>
				))}
			</TextField>
			<TextField className="leftColumn" select label="Identifier Type">
				{validIdentifier.map((m, i) => (
					<MenuItem key={i} value={m.value}>
						{m.label}
					</MenuItem>
				))}
			</TextField>

			<TextField className="rightColumn" label="Other Identifier ID" />

			<Typography className="detailsSubtitle">Events</Typography>

			<FormControl className="eventRadios">
				<FormLabel>Event Type</FormLabel>
				<RadioGroup row>
					<FormControlLabel value="capture" control={<Radio />} label="Capture" />
					<FormControlLabel value="mortality" control={<Radio />} label="Mortality" />
					<FormControlLabel value="recapture" control={<Radio />} label="Recapture" />
					<FormControlLabel value="release" control={<Radio />} label="Release" />
				</RadioGroup>
			</FormControl>

			<TextField
				className="leftColumn"
				label="Event Start Date (MM-DD-YYYY)"
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
				label="Event End Date (MM-DD-YYYY)"
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							<CalendarTodayIcon />
						</InputAdornment>
					)
				}}
			/>
			<TextField className="leftColumn" select label="Location">
				{validLocation.map((m, i) => (
					<MenuItem key={i} value={m.value}>
						{m.label}
					</MenuItem>
				))}
			</TextField>
			<TextField className="rightColumn" select label="Location Details">
				{validLocation.map((m, i) => (
					<MenuItem key={i} value={m.value}>
						{m.label}
					</MenuItem>
				))}
			</TextField>
			<TextField className="leftColumn" label="Submitter First/Last Name" />
			<TextField className="rightColumn" select label="Submitter Organization">
				{validOrganization.map((m, i) => (
					<MenuItem key={i} value={m.value}>
						{m.label}
					</MenuItem>
				))}
			</TextField>
			<TextField className="leftColumn" select label="Age Class">
				{validAgeClass.map((m, i) => (
					<MenuItem key={i} value={m.value}>
						{m.label}
					</MenuItem>
				))}
			</TextField>
			<TextField className="rightColumn" select label="Samples">
				{validSample.map((m, i) => (
					<MenuItem key={i} value={m.value}>
						{m.label}
					</MenuItem>
				))}
			</TextField>
		</Box>
	);
};

export default HideableSearchForm;
