import {
	Dialog,
	IconButton,
	DialogTitle,
	DialogContent,
	TextField,
	Button,
	Box,
	Typography,
	Card,
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup,
	FormGroup,
	FormLabel,
	InputAdornment,
	MenuItem,
	Switch,
	DialogActions
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import React, {useState} from 'react';
import FriendlyDate from '../../util/FriendlyDate';
import PersonnelDialog from '../edit/PersonnelDialog';
import useCodeTable from '../../../hooks/useCodeTable';
import SuccessDialog from '../../util/SuccessDialog';
import {Link} from 'react-router-dom';

const NewEventDialog = ({open, updateAction, cancelAction, state}) => {
	const {mappedCodes: ageClasses} = useCodeTable('animal_age');

	const [shouldShowCopyFromRequesterButton, setShouldShowCopyFromRequesterButton] = useState(false);
	const [addSubmitterDialogOpen, setAddSubmitterDialogOpen] = useState(false);
	const [serial, setSerial] = useState(0);

	const [successDialogOpen, setSuccessDialogOpen] = useState(false);

	function onClose() {
		cancelAction();
	}

	function onUpdate() {
		updateAction();
	}

	function eventAddedMsg() {
		return (
			<> 
				<span>You added a Recapture event to WLH ID {state.wlh_id}.  Go to the WLH ID Update page if you would like to see the list of events for this ID (</span>
				<a href='/wildlifeIds/edit/86'>Here</a>
				<span>). OR click close if you would like to stay in the inventory page</span>
			</>
		);
	}

	return (
		<Dialog className="addEventDialog" open={open} onClose={onClose} maxWidth={false}>
			<IconButton className="dialogBtn" onClick={onClose}>
				<CloseIcon />
			</IconButton>
			<DialogTitle>Add New Event - WLH {state.wlh_id}</DialogTitle>
			<DialogContent>
				<Box className="cardDetails">
					<FormControl className="eventRadios">
						<FormLabel>Event Type</FormLabel>
						<RadioGroup
							row
							// value={event.type}
							// onChange={e => {
							// 	dispatch({
							// 		type: 'fieldChange',
							// 		payload: {
							// 			field: `events[${index}].type`,
							// 			value: e.target.value
							// 		}
							// 	});
							// }}
						>
							<FormControlLabel value="capture" control={<Radio />} label="Capture" />
							<FormControlLabel value="mortality" control={<Radio />} label="Mortality" />
							<FormControlLabel value="recapture" control={<Radio />} label="Recapture" />
						</RadioGroup>
					</FormControl>

					<Box>
						<TextField
							className="leftColumn"
							label="Event Start Date(MM-DD-YYYY)"
							id="start_date"
							name="start_date"
							// onChange={e => {
							// 	dispatch({
							// 		type: 'fieldChange',
							// 		payload: {
							// 			field: `events[${index}].startDate`,
							// 			value: e.target.value
							// 		}
							// 	});
							// }}
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
							id="ageClass"
							select
							label="Age Class"
							// value={event.ageClass}
							// onChange={e => {
							// 	dispatch({
							// 		type: 'fieldChange',
							// 		payload: {
							// 			field: `events[${index}].ageClass`,
							// 			value: e.target.value
							// 		}
							// 	});
							// }}
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
						{/* {event.locations.map((location, locationIndex) => (
							<Box className="locationEntry" key={index}>
								<LocationEntry location={location} dispatch={dispatch} eventIndex={index} locationIndex={locationIndex} />
							</Box>
						))} */}
					</Box>

					<Button
						variant={'outlined'}
						className="addLocation"
						// onClick={() => {
						// 	dispatch({
						// 		type: 'locations.add',
						// 		payload: {
						// 			eventIndex: index
						// 		}
						// 	});
						// }}
					>
						+ Add Location
					</Button>

					<Typography className="detailsSubtitle">Submitters</Typography>
					{/* <FormGroup className="submitterContainer">
						{shouldShowCopyFromRequesterButton && (
							<Button
								variant={'outlined'}
								className="copyFromRequester"
								// onClick={() => {
								// 	dispatch({
								// 		type: 'events.copyFromRequester',
								// 		payload: {
								// 			eventIndex: index
								// 		}
								// 	});
								// 	setSerial(serial + 1);
								// }}
							>
								Copy from requester
							</Button>
						)}
					</FormGroup> */}

					{/* {event.submitters.length > 0 && <PersonnelTable noun="Submitter" people={personnelTableDetails} />} */}

					<Box className="temp_button">
						<Button
							variant={'outlined'}
							onClick={() => {
								setAddSubmitterDialogOpen(true);
							}}
						>
							Copy from requester
						</Button>
						<Button
							variant={'outlined'}
							onClick={() => {
								setAddSubmitterDialogOpen(true);
							}}
						>
							+ Add Submitter
						</Button>
					</Box>

					<PersonnelDialog
						open={addSubmitterDialogOpen}
						acceptAction={p => {
							// dispatch({
							// 	type: 'submitters.add',
							// 	payload: {
							// 		eventIndex: index,
							// 		submitter: p
							// 	}
							// });
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
								// checked={event.additionalAttributes.samplesCollected}
								// onChange={e => {
								// 	dispatch({type: 'fieldChange', payload: {field: `events[${index}].additionalAttributes.samplesCollected`, value: e.target.checked}});
								// }}
								/>
							}
							// label={`${event.additionalAttributes.samplesCollected ? 'Yes' : 'No'}`}
							label="No"
						/>
						<Typography variant="body1">Samples Sent for Testing?</Typography>
						<FormControlLabel
							className="sampleLabel"
							control={
								<Switch
								// checked={event.additionalAttributes.samplesSentForTesting}
								// onChange={e => {
								// 		dispatch({
								// 			type: 'fieldChange',
								// 			payload: {field: `events[${index}].additionalAttributes.samplesSentForTesting`, value: e.target.checked}
								// 		});
								// 	}}
								/>
							}
							// label={`${event.additionalAttributes.samplesSentForTesting ? 'Yes' : 'No'}`}
							label="No"
						/>
						<Typography variant="body1">Test Results Received?</Typography>
						<FormControlLabel
							className="sampleLabel"
							control={
								<Switch
								// checked={event.additionalAttributes.testResultsReceived}
								// onChange={e => {
								// 	dispatch({type: 'fieldChange', payload: {field: `events[${index}].additionalAttributes.testResultsReceived`, value: e.target.checked}});
								// }}
								/>
							}
							// label={`${event.additionalAttributes.testResultsReceived ? 'Yes' : 'No'}`}
							label="No"
						/>
					</FormGroup>

					<TextField
						className="history"
						label="History (Max 500 Characters)"
						id="history"
						name="history"
						multiline
						rows={5}
						// value={event.history}
						// onChange={e => {
						// 	dispatch({
						// 		type: 'fieldChange',
						// 		payload: {
						// 			field: `events[${index}].history`,
						// 			value: e.target.value
						// 		}
						// 	});
						// }}
						inputProps={{maxLength: 500}}
					/>
				</Box>
				<Box className="dialogActions">
					<Button
						variant={'contained'}
						className="dialogButtons"
						onClick={() => {
							// saveState();
							setSuccessDialogOpen(true);
						}}
					>
						Add Event
					</Button>
					<Button
						variant="outlined"
						className="dialogButtons"
						onClick={() => {
							onClose();
						}}
					>
						Cancel
					</Button>
				</Box>

				<SuccessDialog
					open={successDialogOpen}
					close={() => {
						setSuccessDialogOpen(false);
						cancelAction();
					}}
					title={'[Event Type] Event successfully added!'}
					content={eventAddedMsg()}
				/>
			</DialogContent>
		</Dialog>
	);
};

export default NewEventDialog;
