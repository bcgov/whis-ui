import { Box, Button, Card, FormControlLabel, FormGroup, Switch, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import '../../../styles/updateID.scss';

const Status = ({ state }) => {

	const statuses = [
		{ value: 'ASSIGNED', label: 'Assigned' },
		{ value: 'RETIRED', label: 'Retired' },
		{ value: 'UNASSIGNED', label: 'Unassigned' }
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



	return (
		<Card className='card' sx={{ width: '100%' }}>
			<Box sx={{ display: 'flex', flexDirection: 'column' }}>
				<Typography fontFamily={'BCSans-Bold'} sx={{ fontSize: '18px', marginBottom:'15px' }}>General Information</Typography>
				<Box className='info' >
					<span>
						<Typography variant='body2'>Status</Typography>
						<Typography className='assigned' sx={{ color: 'white', fontSize: '13px' }} variant='subtitle1'>
							{displayedStatus}
						</Typography>
					</span>
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
							Creator
						</Typography>
						<Typography variant='body1'>
							{state.metadata.creator.name}
						</Typography>
					</span>
					<span>
						<Typography variant='body2'>
							Generated  Date
						</Typography>
						<Typography variant='body1'>
							{state.metadata.generationDate}
						</Typography>
					</span>

				</Box>
			</Box>
		</Card>
	);
}

export default Status;
