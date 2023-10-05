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
import React, {useEffect, useState} from 'react';
import useCodeTable from '../../../hooks/useCodeTable';
import PersonnelDialog from './PersonnelDialog';
import CancelDialog from '../../util/CancelDialog';
import ConfirmDialog from '../../util/ConfirmDialog';
import ContactDisplay from "../../contact/ContactDisplay";
import Debug from "../../util/Debug";
import LocationEntry from "./LocationEntry";
import ContactAutofill from "../../contact/ContactAutofill";

const EventDetails = ({
												expansionEvent,
												dirty,
												event,
												index,
												formDispatch,
												applyChanges,
											}) => {
	const CHARACTER_LIMIT = 500;

	const {mappedCodes: ageClasses} = useCodeTable('animal_age_class');

	const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
	const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

	const [submitterRenderState, setSubmitterRenderState] = useState(null);

	useEffect(() => {
		setSubmitterRenderState({
			...event._local.submitter,
			label: 'Unchanged'
		});
	}, [event._local.submitter]);

	function setSubmitterToRequester() {
		formDispatch(
			{
				type: 'fieldChange',
				payload: {
					field: `[${index}].submitter`,
					value: event._local.requester.contactListEntry.id
				}
			}
		);
		setSubmitterRenderState({
			...event._local.requester,
			label: `Requester: ${event._local.requester.firstName}`
		})
	}

	return (
		<Expandable expansionEvent={expansionEvent} expansionCardsClassName={'card'}>
			<Expandable.Title>
				<span className='cardSubtitle'>
					<Typography>Event {index + 1}</Typography>
				</span>
				<Box className='info'>
					<span>
						<Typography variant='body2'>Event type</Typography>
						<Typography variant='body1'>{event._local.type || 'unset'}</Typography>
					</span>
					<span>
						<Typography variant='body2'>Date</Typography>
						<Typography variant='body1'>{event._local.startDate || 'unset'}</Typography>
					</span>
				</Box>
			</Expandable.Title>
			<Expandable.Detail>

				<Debug item={event}/>

				<Box className='cardDetails'>
					<FormControl className='eventRadios'>
						<FormLabel>Event Type</FormLabel>
						<RadioGroup
							row
							value={event.type}
							onChange={e => {
								formDispatch({
									type: 'fieldChange',
									payload: {
										field: `[${index}].type`,
										value: e.target.value
									}
								});
							}}
						>
							<FormControlLabel value='CAPTURE' control={<Radio/>} label='Capture'/>
							<FormControlLabel value='MORTALITY' control={<Radio/>} label='Mortality'/>
							<FormControlLabel value='RECAPTURE' control={<Radio/>} label='Recapture'/>
							{/*<FormControlLabel value='RELEASE' control={<Radio/>} label='Release'/>*/}
						</RadioGroup>
					</FormControl>

					<Box>
						<TextField
							className='leftColumn'
							label='Event Start Date(MM-DD-YYYY)'
							id='start_date'
							name='start_date'
							value={event.startDate}
							onChange={e => {
								formDispatch({
									type: 'fieldChange',
									payload: {
										field: `[${index}].startDate`,
										value: e.target.value
									}
								});
							}}
							InputProps={{
								endAdornment: (
									<InputAdornment position='end'>
										<CalendarTodayIcon/>
									</InputAdornment>
								)
							}}
						/>

						<TextField
							className='rightColumn'
							id='ageClass'
							select
							label='Age Class'
							value={event.ageClass}
							onChange={e => {
								formDispatch({
									type: 'fieldChange',
									payload: {
										field: `[${index}].ageClass`,
										value: e.target.value
									}
								});
							}}
						>
							{ageClasses.map((m) => (
								<MenuItem key={m.code} value={m.code}>
									{m.name}
								</MenuItem>
							))}
						</TextField>
					</Box>

					<Typography className='detailsSubtitle'>Location</Typography>
					<Box className='locations'>
						{event.locations.map((location, locationIndex) => (
							<Box className='locationEntry' key={index}>
								<LocationEntry
									location={location}
									formDispatch={formDispatch}
									eventIndex={index}
									locationIndex={locationIndex}
								/>
							</Box>
						))}
					</Box>

					<Button
						variant={'outlined'}
						className='addLocation'
						onClick={() => {
							formDispatch({
								type: 'locations.add',
								payload: {
									eventIndex: index
								}
							});
						}}
					>
						+ Add Location
					</Button>

					<Typography className='detailsSubtitle'>Submitters</Typography>
					<FormGroup className='submitterContainer'>
						<Button
							variant={'outlined'}
							className='copyFromRequester'
							onClick={() => {
								setSubmitterToRequester()
							}}
						>
							Use Requester as Submitter
						</Button>
					</FormGroup>

					<ContactAutofill
						value={submitterRenderState}
						className='contact'
						onValueChange={v => {
							setSubmitterRenderState(v);
							formDispatch(
								{
									type: 'fieldChange',
									payload: {
										field: `[${index}].submitter`,
										value: v?.id || ''
									}
								}
							);
						}}
						label={"Submitter"}
					/>

					{submitterRenderState?.document && <ContactDisplay contact={submitterRenderState.document}/>}
					{submitterRenderState?.contactListEntry && <ContactDisplay contact={submitterRenderState.contactListEntry}/>}

					<Typography className='detailsSubtitle'>Samples</Typography>
					<FormGroup className='samplesContainer'>
						<Typography variant='body1'>Samples Were Collected?</Typography>
						<FormControlLabel
							className='sampleLabel'
							control={
								<Switch
									checked={event.samples.collected}
									onChange={e => {
										formDispatch({type: 'fieldChange', payload: {field: `[${index}].samples.collected`, value: e.target.checked}});
									}}
								/>
							}
							label={`${event.samplesCollected ? 'Yes' : 'No'}`}
						/>
						<Typography variant='body1'>Samples Sent for Testing?</Typography>
						<FormControlLabel
							className='sampleLabel'
							control={
								<Switch
									checked={event.samples.sentForTesting}
									onChange={e => {
										formDispatch({type: 'fieldChange', payload: {field: `[${index}].samples.sentForTesting`, value: e.target.checked}});
									}}
								/>
							}
							label={`${event.samplesSentForTesting ? 'Yes' : 'No'}`}
						/>
						<Typography variant='body1'>Test Results Received?</Typography>
						<FormControlLabel
							className='sampleLabel'
							control={
								<Switch
									checked={event.samples.resultsReceived}
									onChange={e => {
										formDispatch({type: 'fieldChange', payload: {field: `[${index}].samples.resultsReceived`, value: e.target.checked}});
									}}
								/>
							}
							label={`${event.testResultsReceived ? 'Yes' : 'No'}`}
						/>
					</FormGroup>

					<TextField
						className='history'
						label='History (Max 500 Characters)'
						id='history'
						name='history'
						multiline
						rows={5}
						value={event.history}
						onChange={e => {
							formDispatch({
								type: 'fieldChange',
								payload: {
									field: `[${index}].history`,
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
						applyChanges();
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
						formDispatch({type: 'reset'})
					}}
					title={'Cancel WLH ID Event Details Update'}
					content={'You have not saved your changes. Are you sure you want to cancel?'}
				/>

				<Box className='cardButtons'>
					<Button
						variant={'contained'}
						disabled={!dirty}
						className='update_btn'
						onClick={() => {
							setConfirmDialogOpen(true);
						}}
					>
						Update
					</Button>
					<Button
						variant={'outlined'}
						disabled={!dirty}
						className='update_btn'
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
