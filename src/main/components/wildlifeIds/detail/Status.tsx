import {Box, Card, Typography} from '@mui/material';
import React from 'react';

const Status = ({state}) => {
	const status = state.status.charAt(0).toUpperCase() + state.status.slice(1).toLowerCase();

	return (
		<Card className="details_card">
			<Box className="status_card">
				<Typography className="status_title">General Information</Typography>
				<Typography variant="body2">Status</Typography>
				<Typography variant='subtitle2' className={state.status}>{status}</Typography>
			</Box>
		</Card>
	);
};

export default Status;
