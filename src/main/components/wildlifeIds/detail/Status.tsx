import {Box, Card, Typography} from "@mui/material";
import React from "react";

const Status = ({state}) => {

	return (
		<Card className='details_status_card'>
			<Box className='idInformationCard'>
				<Typography className='title'>General Information</Typography>
				<Typography variant='body2'>Status</Typography>
				<Typography variant='body2'>{state.status}</Typography>
			</Box>
		</Card>
	);
}

export default Status;
