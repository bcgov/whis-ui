import Expandable from "../../pageElements/Expandable";
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
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationEntry from "./LocationEntry";
import React, {useEffect, useState} from "react";
import PersonnelTable from "./PersonnelTable";
import useCodeTable from "../../../hooks/useCodeTable";
import PersonnelDialog from "./PersonnelDialog";

const EventDetails = ({expansionEvent, state, event, index, dispatch, resetState, saveState}) => {
	const {mappedCodes: ageClasses} = useCodeTable('animal_age');

	const [shouldShowCopyFromRequesterButton, setShouldShowCopyFromRequesterButton] = useState(false);
	const [shouldShowAddSubmitterButton, setShouldShowAddSubmitterButton] = useState(false);
	const [addSubmitterDialogOpen, setAddSubmitterDialogOpen] = useState(false);
	const [personnelTableDetails, setPersonnelTableDetails] = useState([]);
	const [serial, setSerial] = useState(0);


	useEffect(() => {
		if (event.submitters.length > 0) {
			setShouldShowAddSubmitterButton(false);
			setShouldShowCopyFromRequesterButton(false);
		} else {
			setShouldShowAddSubmitterButton(true);
			setShouldShowCopyFromRequesterButton(!!state.purpose.requester);
		}
	}, [event.submitters, state.purpose.requester, serial, state]);

	useEffect(() => {
		const details = event.submitters.map((submitter, submitterIndex) => (
			{
				...submitter,
				editAction: (updatedPerson) => {
					dispatch({
						type: 'fieldChange',
						payload: {
							field: `events[${index}].submitters[${submitterIndex}]`,
							value: updatedPerson
						}
					});
					setSerial(serial+1);
				},
				deleteAction: () => {
					dispatch({
						type: 'submitters.delete',
						payload: {
							eventIndex: index,
							submitterIndex
						}
					})
					setSerial(serial+1);
				}
			}
		));
		setPersonnelTableDetails(details);
	}, [event.submitters, index, serial]);


	return (
		<Expandable expansionEvent={expansionEvent}>
			<Expandable.Title>	<span>
				<Typography sx={{fontSize: '18px', width: '90px'}}>Event {index + 1}</Typography>
			</span>
			<Box className='info' sx={{display: 'flex', alignItems: 'center'}}>
				<span>
					<Typography variant='body2'>
							Event type
					</Typography>
					<Typography variant='body1'>
						{event.type || 'unset'}
					</Typography>
				</span>
				<span>
					<Typography variant='body2'>
							Date
					</Typography>
					<Typography variant='body1'>
						{event.startDate || 'unset'}
					</Typography>
				</span>
				<span>
					<Typography variant='body2'>
							Location
					</Typography>
					<Typography variant='body1'>
						{(event.locations && event.locations.length > 0 && JSON.stringify(event.locations[0], null, 1)) || 'unset'}
					</Typography>
				</span>
			</Box>
			</Expandable.Title>
			<Expandable.Detail>
				<Box sx={{width: '1091px', margin: '0 auto'}}>
					<FormControl sx={{marginTop: '62px'}}>
						<FormLabel>Event Type</FormLabel>
						<RadioGroup
							row
							aria-labelledby='demo-controlled-radio-buttons-group'
							name='controlled-radio-buttons-group'
							value={event.type}
							onChange={(e) => {
								dispatch({
									type: 'fieldChange',
									payload: {
										field: `events[${index}].type`,
										value: e.target.value
									}
								})
							}}
						>
							<FormControlLabel value='capture' control={<Radio/>} label='Capture'/>
							<FormControlLabel value='mortality' control={<Radio/>} label='Mortality'/>
							<FormControlLabel value='recapture' control={<Radio/>} label='Recapture'/>
							<FormControlLabel value='release' control={<Radio/>} label='Release'/>
						</RadioGroup>
					</FormControl>

					<Box sx={{width: 'inherit', display: 'flex', flexDirection: 'row', marginTop: '24px'}}>
						<TextField
							sx={{width: '529px'}}
							label='Event Start Date(MM-DD-YYYY)'
							id='start_date'
							name='start_date'
							onChange={(e) => {
								dispatch({
									type: 'fieldChange',
									payload: {
										field: `events[${index}].startDate`,
										value: e.target.value
									}
								})
							}}
							InputProps={{
								endAdornment: <InputAdornment position='end'><CalendarTodayIcon/></InputAdornment>,
							}}
						/>

						<TextField
							sx={{width: '529px', marginLeft: '32px'}}
							id='ageClass'
							select
							label='Age Class'
							value={event.ageClass}
							onChange={(e) => {
								dispatch({
									type: 'fieldChange',
									payload: {
										field: `events[${index}].ageClass`,
										value: e.target.value
									}
								})
							}}
						>
							{ageClasses.map((m, i) => (
								<MenuItem key={i} value={m.value}>
									{m.label}
								</MenuItem>
							))}
						</TextField>
					</Box>

					<Typography fontFamily={'BCSans-Bold'} sx={{fontSize: '18px', margin: '49px 0 0 0'}}>Location</Typography>
					{event.locations.map((location, locationIndex) => (
						<div>
							<Box sx={{display: 'flex', flexDirection: 'column'}} key={index}>
								<LocationEntry
									location={location}
									dispatch={dispatch}
									eventIndex={index}
									locationIndex={locationIndex}
								/>
							</Box>
						</div>
					))}

					<Button
						variant={'outlined'}
						sx={{
							marginTop: '12px',
							width: '128px',
							height: '32px',
							fontSize: '14px',
							padding: '0',
							textTransform: 'capitalize',
						}}
						onClick={() => {
							dispatch({
								type: 'locations.add',
								payload: {
									eventIndex: index
								}
							})
						}}
					>+ Add Location</Button>

					<Typography fontFamily={'BCSans-Bold'} sx={{fontSize: '18px', marginBlock: '100px 16px'}}>Submitters</Typography>
					<FormGroup sx={{display: 'flex', flexDirection: 'row', alignItems: 'baseline'}}>
						{shouldShowCopyFromRequesterButton && <Button
							variant={'outlined'} onClick={() => {
								dispatch({
									type: 'events.copyFromRequester',
									payload: {
										eventIndex: index,
									}
								});
								setSerial(serial+1);
							}}
							sx={{marginBottom: '16px'}}
						>Copy from requester</Button>}
					</FormGroup>

					{event.submitters.length > 0 && <PersonnelTable noun='Submitter' people={personnelTableDetails}/>}

					<Button
						variant={'outlined'} sx={{
							width: '128px',
							height: '32px',
							fontSize: '14px',
							padding: '0',
							marginTop: '12px',
							textTransform: 'capitalize',
						}} onClick={() => {
							setAddSubmitterDialogOpen(true);
						}}
					>+ Add Submitter</Button>

					<PersonnelDialog
						open={addSubmitterDialogOpen}
						acceptAction={(p) => {
							dispatch({
								type: 'submitters.add',
								payload: {
									eventIndex: index,
									submitter: p
								}
							});
							setSerial(serial+1);
							setAddSubmitterDialogOpen(false);
						}}
						cancelAction={() => {
							setAddSubmitterDialogOpen(false);
						}}
						initialState={null}
						noun='Add Submitter'
					/>

					<Typography fontFamily={'BCSans-Bold'} sx={{fontSize: '18px', margin: '35px 0 16px 0'}}>Samples</Typography>


					<FormGroup sx={{width: '400px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline'}}>
						<Typography variant='body1' sx={{color: '#868e96'}}>Samples Were Collected?</Typography>
						<FormControlLabel
							control={<Switch
								checked={event.additionalAttributes.samplesCollected}
								onChange={(e) => {
									dispatch({type: 'fieldChange', payload: {field: `events[${index}].additionalAttributes.samplesCollected`, value: e.target.checked}});
								}}
							/>} label={`${event.additionalAttributes.samplesCollected ? 'Yes' : 'No'}`}
						/>
						<Typography variant='body1' sx={{color: '#868e96'}}>Samples Sent for Testing?</Typography>
						<FormControlLabel
							control={<Switch
								checked={event.additionalAttributes.samplesSentForTesting}
								onChange={(e) => {
									dispatch({type: 'fieldChange', payload: {field: `events[${index}].additionalAttributes.samplesSentForTesting`, value: e.target.checked}});
								}}
							/>} label={`${event.additionalAttributes.samplesSentForTesting ? 'Yes' : 'No'}`}
						/>
						<Typography variant='body1' sx={{color: '#868e96'}}>Test Results Received?</Typography>
						<FormControlLabel
							control={<Switch
								checked={event.additionalAttributes.testResultsReceived}
								onChange={(e) => {
									dispatch({type: 'fieldChange', payload: {field: `events[${index}].additionalAttributes.testResultsReceived`, value: e.target.checked}});
								}}
							/>} label={`${event.additionalAttributes.testResultsReceived ? 'Yes' : 'No'}`}
						/>
					</FormGroup>

					<TextField
						sx={{width: '1079px', marginTop: '29px'}}
						label='History (Max 500 Characters)'
						id='history'
						name='history'
						multiline
						rows={5}
						value={event.history}
						onChange={(e) => {
							dispatch({
								type: 'fieldChange',
								payload: {
									field: `events[${index}].history`,
									value: e.target.value
								}
							})
						}}
						inputProps={{maxLength: 500}}
					/>

				</Box>

				<Box sx={{display: 'flex', justifyContent: 'flex-end', margin: '48px 94px 48px 0'}}>
					<Button
						variant={'contained'}
						className='update_btn'
						onClick={saveState}
					>
						Update
					</Button>
					<Button
						variant={'outlined'}
						className='update_btn'
						onClick={resetState}
					>
						Cancel
					</Button>
				</Box>
			</Expandable.Detail>
		</Expandable>);
}

export default EventDetails;
