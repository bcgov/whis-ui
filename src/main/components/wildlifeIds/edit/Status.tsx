import Expandable from "../../pageElements/Expandable";
import {Box, Button, FormControlLabel, FormGroup, MenuItem, Switch, TextField, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import StatusHistory from "./StatusHistory";

const Status = ({expansionEvent, dispatch, state, resetState, saveState}) => {

	const statuses = [
		{value: 'ASSIGNED', label: 'Assigned'},
		{value: 'RETIRED', label: 'Retired'},
		{value: 'UNASSIGNED', label: 'Unassigned'}
	];

	const [displayedStatus, setDisplayedStatus] = useState('Unassigned');
	const [lastState, setLastState] = useState(null);

	useEffect(() => {
		if (lastState !== null) {
			setDisplayedStatus(lastState.status)
		} else {
			setDisplayedStatus('Unassigned');
		}
	}, [lastState]);

	useEffect(() => {
		if (state.status.history.length > 0) {
			setLastState(state.status.history[state.status.history.length - 1]);
		} else {
			setLastState(null);
		}
	}, [state]);

	function renderDetailed(status) {
		switch (status) {
		case 'ASSIGNED':
		case 'UNASSIGNED':
			return (
				<TextField
					sx={{minWidth: '1091px', marginTop: '28px'}}
					label='Reason (Enter a reason why you are changing the WLH ID status)'
					id='reason'
					name='reason'
					multiline
					onChange={(e) => {
						dispatch({
							type: 'fieldChange',
							payload: {
								field: 'status.dirty.reason',
								value: e.target.value
							}
						})
					}}
					value={state.status.dirty.reason}
					rows={3}
				/>
			);
			break;
		case 'RETIRED':
			return (
				<>
					<FormGroup sx={{width: '330px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginTop: '28px'}}>
						<Typography variant='body1'>Recapture Kits Returned</Typography>
						<FormControlLabel control={<Switch onChange={(e) => dispatch(
							{
								type: 'fieldChange',
								payload: {
									field: 'status.additionalAttributes.recaptureKitsReturned',
									value: e.target.checked
								}
							}
						)}
																							 sx={{marginInline: '20px'}}/>}
						checked={state.status.dirty.additionalAttributes.recaptureKitsReturned}
						label={`${state.status.dirty.additionalAttributes.recaptureKitsReturned ? 'Yes' : 'No'}`}/>
						<Typography variant='body1'>Recapture Status</Typography>
						<FormControlLabel control={<Switch onChange={(e) => dispatch(
							{
								type: 'fieldChange',
								payload: {
									field: 'status.additionalAttributes.recaptureStatus',
									value: e.target.checked
								}
							}
						)}
																							 checked={state.status.dirty.additionalAttributes.recaptureStatus}
																							 sx={{marginInline: '20px'}}/>}
						label={`${state.status.dirty.additionalAttributes.recaptureStatus ? 'On' : 'Off'}`} sx={{marginTop: '20px'}}/>
					</FormGroup>

					<TextField
						sx={{width: '529px', marginTop: '28px'}}
						id='correctIdNumber'
						name='correctIdNumber'
						label='Correct WLH ID Number'
						value={state.status.dirty.additionalAttributes.correctIdNumber || ''}
						onChange={(e) => {
							dispatch({
								type: 'fieldChange',
								payload: {
									field: 'status.dirty.additionalAttributes.correctIdNumber',
									value: e.target.value
								}
							})
						}}
						defaultValue='Pending'
					/>

					<TextField
						sx={{minWidth: '1091px', marginTop: '28px'}}
						label='Reason (Enter a reason why you are changing the WLH ID status)'
						id='reason'
						name='reason'
						multiline
						rows={3}
						value={state.status.dirty.reason}
						onChange={(e) => {
							dispatch({
								type: 'fieldChange',
								payload: {
									field: 'status.dirty.reason',
									value: e.target.value
								}
							})
						}}
					/>
				</>
			);
			break;

		default:
			return (<></>);
		}
	}

	return (
		<Expandable expansionEvent={expansionEvent}>
			<Expandable.Title>
				<span>
					<Typography sx={{fontSize: '18px'}}>Status</Typography>
					<Typography className='unassigned' sx={{color: 'white', fontSize: '13px'}} variant='subtitle1'>
						{displayedStatus}
					</Typography>
				</span>
				<Box className='info' sx={{display: 'flex', alignItems: 'center'}}>
					<span>
						<Typography variant='body2'>
							WLH ID Number
						</Typography>
						<Typography variant='body1'>
							{state.metadata.wildlifeHealthId}
						</Typography>
					</span>
					<span>
						<Typography variant='body2'>
							WLH ID Generated  Date
						</Typography>
						<Typography variant='body1'>
							{state.metadata.generationDate}
						</Typography>
					</span>
					<span>
						<Typography variant='body2'>
							WLH ID Creator
						</Typography>
						<Typography variant='body1'>
							{state.metadata.creator.name}
						</Typography>
					</span>
				</Box>
			</Expandable.Title>
			<Expandable.Detail>
				<Box sx={{width: '1091px', margin: '48px auto'}}>
					<StatusHistory history={state.status.history}/>
				</Box>
				<Box sx={{width: '1091px', margin: '48px auto'}}>
					<TextField
						sx={{width: '529px', marginTop: '8px'}}
						id='idStatus'
						label='Change WLH Status *'
						defaultValue={state.status.dirty.status}
						select
						onChange={(e) => {
							dispatch({
								type: 'status.statusChange', payload: e.target.value
							});
						}}
					>
						{statuses.map((m) => (
							<MenuItem key={m.value} value={m.value}>
								{m.label}
							</MenuItem>
						))}
					</TextField>
					{
						renderDetailed(state.status.dirty.status)
					}
				</Box>

				<Box sx={{display: 'flex', justifyContent: 'flex-end', margin: '48px 94px 48px 0'}}>
					<Button
						variant={'contained'}
						className='update_btn'
						onClick={() => {
							dispatch({
								type: 'status.promote'
							});

							//slight delay before sending
							setTimeout(() => {
								saveState();
							}, 3000);

						}}
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
		</Expandable>
	);
}

export default Status;
