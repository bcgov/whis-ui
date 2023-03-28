import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	FormControl,
	FormControlLabel,
	FormGroup,
	FormLabel,
	IconButton,
	InputAdornment,
	MenuItem,
	Radio,
	RadioGroup,
	Switch,
	TextField,
	Typography
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import React, {useEffect, useState} from 'react';
import LocationEntry from './LocationEntry';
import PersonnelDialog from './PersonnelDialog';
import PersonnelTable from './PersonnelTable';
import useCodeTable from '../../../hooks/useCodeTable';
import SuccessDialog from '../../util/SuccessDialog';
import CancelDialog from '../../util/CancelDialog';

const NewEventFormDialog = ({open, acceptAction, cancelAction, saveState, resetState, state}) => {
	const {mappedCodes: ageClasses} = useCodeTable('animal_age');

	const [successDialogOpen, setSuccessDialogOpen] = useState(false);
	const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

	const [shouldShowCopyFromRequesterButton, setShouldShowCopyFromRequesterButton] = useState(false);
	const [shouldShowAddSubmitterButton, setShouldShowAddSubmitterButton] = useState(false);
	const [addSubmitterDialogOpen, setAddSubmitterDialogOpen] = useState(false);
	const [personnelTableDetails, setPersonnelTableDetails] = useState([]);
	const [serial, setSerial] = useState(0);

	// useEffect(() => {
	// 	if (event.submitters.length > 0) {
	// 		setShouldShowAddSubmitterButton(false);
	// 		setShouldShowCopyFromRequesterButton(false);
	// 	} else {
	// 		setShouldShowAddSubmitterButton(true);
	// 		setShouldShowCopyFromRequesterButton(!!state.purpose.requester);
	// 	}
	// }, [event.submitters, state.purpose.requester, serial, state]);

	// useEffect(() => {
	// 	const details = event.submitters.map((submitter, submitterIndex) => ({
	// 		...submitter,
	// 		editAction: updatedPerson => {
	// 			dispatch({
	// 				type: 'fieldChange',
	// 				payload: {
	// 					field: `events[${index}].submitters[${submitterIndex}]`,
	// 					value: updatedPerson
	// 				}
	// 			});
	// 			setSerial(serial + 1);
	// 		},
	// 		deleteAction: () => {
	// 			dispatch({
	// 				type: 'submitters.delete',
	// 				payload: {
	// 					eventIndex: index,
	// 					submitterIndex
	// 				}
	// 			});
	// 			setSerial(serial + 1);
	// 		}
	// 	}));
	// 	setPersonnelTableDetails(details);
	// }, [event.submitters, index, serial]);

	return (
		<Dialog className="newEventFormDialog" open={open} onClose={cancelAction} maxWidth={false}>
			<DialogTitle>{'New Event Details'}</DialogTitle>
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
					<FormGroup className="submitterContainer">
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
					</FormGroup>

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
			</DialogContent>
			<Divider variant="middle" />
			<DialogActions>
				<Button
					variant={'contained'}
					className="dialogButtons"
					onClick={() => {
						saveState();
						acceptAction();
						setSuccessDialogOpen(true);
					}}
				>
					Add
				</Button>
				<Button
					variant={'contained'}
					onClick={() => {
						setCancelDialogOpen(true);
					}}
					className="dialogButtons"
				>
					Cancel
				</Button>
			</DialogActions>

			<SuccessDialog
				open={successDialogOpen}
				close={() => {
					setSuccessDialogOpen(false);
					cancelAction();
				}}
				title={'New Event Successfully Generated!'}
				content={'You can add more details in the event details.'}
			/>
			<CancelDialog
				open={cancelDialogOpen}
				close={() => {
					setCancelDialogOpen(false);
				}}
				title={'Cancel Adding New Event'}
				content={'Are you sure you want to cancel? Changes you have made will not be saved.'}
				acceptAction={() => {
					setCancelDialogOpen(false);
					cancelAction();
					resetState();
				}}
			/>
		</Dialog>
	);
};

export default NewEventFormDialog;
