import Expandable from '../../pageElements/Expandable';
import {Box, Button, FormControlLabel, FormGroup, MenuItem, Switch, TextField, Typography} from '@mui/material';
import React, {useEffect, useState} from 'react';
import StatusHistory from './StatusHistory';
import CodeLookup from '../../util/CodeLookup';
import FriendlyDate from '../../util/FriendlyDate';

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
			setDisplayedStatus(lastState.status);
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
					className="reason"
					label="Reason (Enter a reason why you are changing the WLH ID status)"
					id="reason"
					name="reason"
					multiline
					onChange={e => {
						dispatch({
							type: 'fieldChange',
							payload: {
								field: 'status.dirty.reason',
								value: e.target.value
							}
						});
					}}
					value={state.status.dirty.reason}
					rows={3}
				/>
			);
		case 'RETIRED':
			return (
				<>
					<FormGroup className="retiredSwitches">
						<Typography variant="body1">Recapture Kits Returned</Typography>
						<FormControlLabel
							className="switchLabels"
							control={
								<Switch
									onChange={e => {
										dispatch({
											type: 'fieldChange',
											payload: {
												field: 'status.dirty.additionalAttributes.recaptureKitsReturned',
												value: e.target.checked
											}
										});
									}}
									checked={state.status.dirty.additionalAttributes.recaptureKitsReturned}
									className="switch"
								/>
							}
							label={`${state.status.dirty.additionalAttributes.recaptureKitsReturned ? 'Yes' : 'No'}`}
						/>
						<Typography variant="body1">Recapture Status</Typography>
						<FormControlLabel
							className="switchLabels"
							control={
								<Switch
									onChange={e =>
										dispatch({
											type: 'fieldChange',
											payload: {
												field: 'status.dirty.additionalAttributes.recaptureStatus',
												value: e.target.checked
											}
										})
									}
									checked={state.status.dirty.additionalAttributes.recaptureStatus}
									className="switch"
								/>
							}
							label={`${state.status.dirty.additionalAttributes.recaptureStatus ? 'On' : 'Off'}`}
						/>
					</FormGroup>

					<TextField
						className='correctIdNumber'
						id="correctIdNumber"
						name="correctIdNumber"
						label="Correct WLH ID Number"
						value={state.status.dirty.additionalAttributes.correctIdNumber || ''}
						onChange={e => {
							dispatch({
								type: 'fieldChange',
								payload: {
									field: 'status.dirty.additionalAttributes.correctIdNumber',
									value: e.target.value
								}
							});
						}}
						defaultValue="Pending"
					/>

					<TextField
						className="reason"
						label="Reason (Enter a reason why you are changing the WLH ID status)"
						id="reason"
						name="reason"
						multiline
						rows={3}
						value={state.status.dirty.reason}
						onChange={e => {
							dispatch({
								type: 'fieldChange',
								payload: {
									field: 'status.dirty.reason',
									value: e.target.value
								}
							});
						}}
					/>
				</>
			);
		default:
			return <></>;
		}
	}

	return (
		<Expandable expansionEvent={expansionEvent}>
			<Expandable.Title>
				<span className="cardSubtitle">
					<Typography>Status</Typography>
					<Typography className={displayedStatus} variant="subtitle1">
						<CodeLookup codeTable={'status'} code={displayedStatus}/>
					</Typography>
				</span>
				<Box className="info">
					<span>
						<Typography variant="body2">WLH ID Number</Typography>
						<Typography variant="body1">{state.metadata.wildlifeHealthId}</Typography>
					</span>
					<span>
						<Typography variant="body2">WLH ID Generated Date</Typography>
						<Typography variant="body1">
							<FriendlyDate value={state.metadata.generationDate}/>
						</Typography>
					</span>
					<span>
						<Typography variant="body2">WLH ID Creator</Typography>
						<Typography variant="body1">{state.metadata.creator.name}</Typography>
					</span>
				</Box>
			</Expandable.Title>
			<Expandable.Detail>
				<Box className="cardDetails">
					{/* <StatusHistory history={state.status.history}/> */}
					<TextField
						className='changeStatus'
						id="idStatus"
						label="Change WLH Status *"
						defaultValue={state.status.dirty.status}
						select
						onChange={e => {
							dispatch({
								type: 'status.statusChange',
								payload: e.target.value
							});
						}}
					>
						{statuses.map(m => (
							<MenuItem key={m.value} value={m.value}>
								{m.label}
							</MenuItem>
						))}
					</TextField>
					{renderDetailed(state.status.dirty.status)}
				</Box>

				<Box className="cardButtons">
					<Button
						variant={'contained'}
						className="update_btn"
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
					<Button variant={'outlined'} className="update_btn" onClick={resetState}>
						Cancel
					</Button>
				</Box>
			</Expandable.Detail>
		</Expandable>
	);
};

export default Status;
