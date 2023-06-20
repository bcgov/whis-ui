import Expandable from '../../pageElements/Expandable';
import {
	Box,
	Button,
	FormControl,
	FormControlLabel,
	FormGroup,
	FormLabel,
	InputAdornment,
	MenuItem,
	Radio,
	RadioGroup,
	Switch,
	TextField,
	Typography
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationEntry from './LocationEntry';
import React, {useEffect, useState} from 'react';
import PersonnelTable from './PersonnelTable';
import useCodeTable from '../../../hooks/useCodeTable';
import PersonnelDialog from './PersonnelDialog';
import CancelDialog from '../../util/CancelDialog';
import ConfirmDialog from '../../util/ConfirmDialog';
import ContactDisplay from "../../contact/ContactDisplay";

const EventDetails = ({dirty, expansionEvent, state, event, index, dispatch, resetState, saveState}) => {
	const CHARACTER_LIMIT = 500;

	const {mappedCodes: ageClasses} = useCodeTable('animal_age');

	const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
	const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

	const [shouldShowCopyFromRequesterButton, setShouldShowCopyFromRequesterButton] = useState(true);
	const [addSubmitterDialogOpen, setAddSubmitterDialogOpen] = useState(false);
	const [personnelTableDetails, setPersonnelTableDetails] = useState([]);
	const [serial, setSerial] = useState(0);

	return (
		<Expandable expansionEvent={expansionEvent} expansionCardsClassName={'card'}>
			<Expandable.Title>
				<span className="cardSubtitle">
					<Typography>Event {index + 1}</Typography>
				</span>
				<Box className="info">
					<span>
						<Typography variant="body2">Event type</Typography>
						<Typography variant="body1">{event.type || 'unset'}</Typography>
					</span>
					<span>
						<Typography variant="body2">Date</Typography>
						<Typography variant="body1">{event.startDate || 'unset'}</Typography>
					</span>
					<span>
						<Typography variant="body2">Location</Typography>
						<Typography variant="body1">{(event.locations && event.locations.length > 0 && JSON.stringify(event.locations[0], null, 1)) || 'unset'}</Typography>
					</span>
				</Box>
			</Expandable.Title>
			<Expandable.Detail>
				<Box className="cardDetails">
					<FormControl className="eventRadios">
						<FormLabel>Event Type</FormLabel>
						<RadioGroup
							row
							value={event.type}
							onChange={e => {
								dispatch({
									type: 'fieldChange',
									payload: {
										field: `events[${index}].type`,
										value: e.target.value
									}
								});
							}}
						>
							<FormControlLabel value="capture" control={<Radio/>} label="Capture"/>
							<FormControlLabel value="mortality" control={<Radio/>} label="Mortality"/>
							<FormControlLabel value="recapture" control={<Radio/>} label="Recapture"/>
							<FormControlLabel value="release" control={<Radio/>} label="Release"/>
						</RadioGroup>
					</FormControl>

					<Box>
						<TextField
							className="leftColumn"
							label="Event Start Date(MM-DD-YYYY)"
							id="start_date"
							name="start_date"
							onChange={e => {
								dispatch({
									type: 'fieldChange',
									payload: {
										field: `events[${index}].startDate`,
										value: e.target.value
									}
								});
							}}
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
							id="ageClass"
							select
							label="Age Class"
							value={event.ageClass}
							onChange={e => {
								dispatch({
									type: 'fieldChange',
									payload: {
										field: `events[${index}].ageClass`,
										value: e.target.value
									}
								});
							}}
						>
							{ageClasses.map((m, i) => (
								<MenuItem key={i} value={m.value}>
									{m.label}
								</MenuItem>
							))}
						</TextField>
					</Box>

					<Typography className="detailsSubtitle">Location</Typography>
					<Box className="locations">
						{event.locations.map((location, locationIndex) => (
							<Box className="locationEntry" key={index}>
								coming soon...
								{JSON.stringify(location, null, 2)}
								{/*<LocationEntry*/}
								{/*	location={location}*/}
								{/*	dispatch={dispatch}*/}
								{/*	eventIndex={index}*/}
								{/*	locationIndex={locationIndex}*/}
								{/*/>*/}
							</Box>
						))}
					</Box>

					<Button
						variant={'outlined'}
						className="addLocation"
						onClick={() => {
							dispatch({
								type: 'locations.add',
								payload: {
									eventIndex: index
								}
							});
						}}
					>
						+ Add Location
					</Button>

					<Typography className="detailsSubtitle">Submitters</Typography>
					<FormGroup className="submitterContainer">
						{shouldShowCopyFromRequesterButton && (
							<Button
								variant={'outlined'}
								className="copyFromRequester"
								onClick={() => {
									dispatch({
										type: 'events.copyFromRequester',
										payload: {
											eventIndex: index
										}
									});
									setSerial(serial + 1);
								}}
							>
								Copy from requester
							</Button>
						)}
					</FormGroup>

					{event.submitter && <ContactDisplay contact={event.submitter}/>}

					<Button
						variant={'outlined'}
						className="addSubmitter"
						onClick={() => {
							setAddSubmitterDialogOpen(true);
						}}
					>
						+ Add Submitter
					</Button>

					<PersonnelDialog
						open={addSubmitterDialogOpen}
						acceptAction={p => {
							dispatch({
								type: 'submitters.add',
								payload: {
									eventIndex: index,
									submitter: p
								}
							});
							setSerial(serial + 1);
							setAddSubmitterDialogOpen(false);
						}}
						cancelAction={() => {
							setAddSubmitterDialogOpen(false);
						}}
						initialState={null}
						noun="Add Submitter"
					/>

					<Typography className="detailsSubtitle">Samples</Typography>
					<FormGroup className="samplesContainer">
						<Typography variant="body1">Samples Were Collected?</Typography>
						<FormControlLabel
							className="sampleLabel"
							control={
								<Switch
									checked={event.samplesCollected}
									onChange={e => {
										dispatch({type: 'fieldChange', payload: {field: `events[${index}].samplesCollected`, value: e.target.checked}});
									}}
								/>
							}
							label={`${event.samplesCollected ? 'Yes' : 'No'}`}
						/>
						<Typography variant="body1">Samples Sent for Testing?</Typography>
						<FormControlLabel
							className="sampleLabel"
							control={
								<Switch
									checked={event.samplesSentForTesting}
									onChange={e => {
										dispatch({type: 'fieldChange', payload: {field: `events[${index}].samplesSentForTesting`, value: e.target.checked}});
									}}
								/>
							}
							label={`${event.samplesSentForTesting ? 'Yes' : 'No'}`}
						/>
						<Typography variant="body1">Test Results Received?</Typography>
						<FormControlLabel
							className="sampleLabel"
							control={
								<Switch
									checked={event.testResultsReceived}
									onChange={e => {
										dispatch({type: 'fieldChange', payload: {field: `events[${index}].testResultsReceived`, value: e.target.checked}});
									}}
								/>
							}
							label={`${event.testResultsReceived ? 'Yes' : 'No'}`}
						/>
					</FormGroup>

					<TextField
						className="history"
						label="History (Max 500 Characters)"
						id="history"
						name="history"
						multiline
						rows={5}
						value={event.history}
						onChange={e => {
							dispatch({
								type: 'fieldChange',
								payload: {
									field: `events[${index}].history`,
									value: e.target.value
								}
							});
						}}
						inputProps={{maxLength: CHARACTER_LIMIT}}
						helperText={
							event.history.length == 500
								? `${event.history.length} / ${CHARACTER_LIMIT} You have reached the maximum number of characters`
								: event.history != ''
									? `${event.history.length} / ${CHARACTER_LIMIT} Characters`
									: '0 / 500 Character'
						}
					/>
				</Box>
				<ConfirmDialog
					open={confirmDialogOpen}
					close={() => {
						setConfirmDialogOpen(false);
					}}
					acceptAction={() => {
						saveState();
						setConfirmDialogOpen(false);
					}}
					title={'Update Confirmation'}
					content={'Would you like to save your changes?'}
				/>
				<CancelDialog
					open={cancelDialogOpen}
					close={() => {
						setCancelDialogOpen(false);
					}}
					acceptAction={() => {
						resetState();
					}}
					title={'Cancel WLH ID Event Details Update'}
					content={'You have not saved your changes. Are you sure you want to cancel?'}
				/>
				<Box className="cardButtons">
					<Button
						variant={'contained'}
						disabled={!dirty}
						className="update_btn"
						onClick={() => {
							setConfirmDialogOpen(true);
						}}
					>
						Update
					</Button>
					<Button
						variant={'outlined'}
						disabled={!dirty}
						className="update_btn"
						onClick={() => {
							setCancelDialogOpen(true);
						}}
					>
						Cancel
					</Button>
				</Box>

			</Expandable.Detail>
		</Expandable>
	);
};

export default EventDetails;
