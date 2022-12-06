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

	useEffect(() => {
		if (event.submitter) {
			setShouldShowAddSubmitterButton(false);
			setShouldShowCopyFromRequesterButton(false);
		} else {
			setShouldShowAddSubmitterButton(true);
			setShouldShowCopyFromRequesterButton(!!state.purpose.requester);
		}
	}, [event.submitter, state.purpose.requester]);

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
							label='Event Start Date(DD-MM-YYYY)'
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
							label='Event End Date(DD-MM-YYYY)'
							id='end_date'
							name='end_date'
							onChange={(e) => {
								dispatch({
									type: 'fieldChange',
									payload: {
										field: `events[${index}].endDate`,
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

					<Button onClick={() => {
						dispatch({
							type: 'locations.add',
							payload: {
								eventIndex: index
							}
						})
					}}>Add Location</Button>

					<Typography fontFamily={'BCSans-Bold'} sx={{fontSize: '18px', margin: '100px 0 0 0'}}>Submitter</Typography>
					<FormGroup sx={{display: 'flex', flexDirection: 'row', alignItems: 'baseline'}}>
						{shouldShowCopyFromRequesterButton && <Button variant={'outlined'} onClick={() => {
							dispatch({
								type: 'events.copyFromRequester',
								payload: {
									destinationField: `events[${index}].submitter`,
								}
							});
						}}>Copy from requester</Button>}
					</FormGroup>

					{event.submitter && <PersonnelTable noun='Submitter' people={[{
						...event.submitter,
						editAction: (updatedPerson) => {
							dispatch({
								type: 'fieldChange',
								payload: {
									field: `events[${index}].submitter`,
									value: updatedPerson
								}
							})
						},
						deleteAction: () => {
							dispatch({
								type: 'fieldChange',
								payload: {
									field: `events[${index}].submitter`,
									value: null
								}
							})
						}
					}]}/>}

					{shouldShowAddSubmitterButton && <Button variant={'outlined'} sx={{
						width: '128px',
						height: '32px',
						fontSize: '14px',
						padding: '0',
						textTransform: 'capitalize',
					}} onClick={() => {
						setAddSubmitterDialogOpen(true);
					}}>+ Add Submitter</Button>}

					<PersonnelDialog
						open={addSubmitterDialogOpen}
						acceptAction={(p) => {
							dispatch({
								type: 'fieldChange',
								payload: {
									field: `events[${index}].submitter`,
									value: p
								}
							});
							setAddSubmitterDialogOpen(false);
						}}
						cancelAction={() => {
							setAddSubmitterDialogOpen(false);
						}}
						initialState={null}
					/>

					<Typography fontFamily={'BCSans-Bold'} sx={{fontSize: '18px', margin: '35px 0 16px 0'}}>Samples</Typography>


					<FormGroup sx={{width: '400px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline'}}>
						<Typography variant='body1' sx={{color: '#868e96'}}>Samples Were Collected?</Typography>
						<FormControlLabel control={<Switch onChange={(e) => {
							dispatch({type: 'fieldChange', payload: {field: `events[${index}].additionalAttributes.samplesCollected`, value: e.target.checked}});
						}}/>} label={`${event.additionalAttributes.samplesCollected ? 'Yes' : 'No'}`}/>
						<Typography variant='body1' sx={{color: '#868e96'}}>Samples Sent for Testing?</Typography>
						<FormControlLabel control={<Switch onChange={(e) => {
							dispatch({type: 'fieldChange', payload: {field: `events[${index}].additionalAttributes.samplesSentForTesting`, value: e.target.checked}});
						}}/>} label={`${event.additionalAttributes.samplesSentForTesting ? 'Yes' : 'No'}`}/>
						<Typography variant='body1' sx={{color: '#868e96'}}>Test Results Received?</Typography>
						<FormControlLabel control={<Switch onChange={(e) => {
							dispatch({type: 'fieldChange', payload: {field: `events[${index}].additionalAttributes.testResultsReceived`, value: e.target.checked}});
						}}/>} label={`${event.additionalAttributes.testResultsReceived ? 'Yes' : 'No'}`}/>
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
