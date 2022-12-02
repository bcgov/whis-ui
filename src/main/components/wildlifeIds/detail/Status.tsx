import {
	Box,
	Button,
	Card,
	Typography
} from "@mui/material";
import React, { useState } from "react";
import '../../../styles/updateID.scss';

const Status = () => {


	return (
		<Card className='card' sx={{width:'100%'}}>
			{/* <Typography fontFamily={'BCSans-Bold'} sx={{ fontSize: '18px' }}>General Information</Typography> */}
			<Box className='info' sx={{ display: 'flex', alignItems: 'center' }}>
				<span>
					<Typography sx={{ fontSize: '18px' }}>Status</Typography>
					<Typography className='assigned' sx={{ color: 'white', fontSize: '13px' }} variant='subtitle1'>
						Assigned
					</Typography>
				</span>
				<span>
					<Typography variant='body2'>
						WLH ID Number
					</Typography>
					<Typography variant='body1'>
						22-00001
					</Typography>
				</span>
				<span>
					<Typography variant='body2'>
						WLH ID Generated  Date
					</Typography>
					<Typography variant='body1'>
						21-01-2021
					</Typography>
				</span>
				<span>
					<Typography variant='body2'>
						WLH ID Creator
					</Typography>
					<Typography variant='body1'>
						Jane Hill
					</Typography>
				</span>
			</Box>
		</Card>
	);
}

export default Status;
