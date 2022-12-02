import {
	Box,
	Button,
	Card,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	Paper,
	Table,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../../../styles/updateID.scss';

const Event = () => {


	return (
		<Card className='papper' sx={{height:'190px'}}>
			<Typography fontFamily={'BCSans-Bold'} sx={{ fontSize: '18px', margin: '48px 83px 24px' }}>Event 1</Typography>
			<Box className='info' sx={{ display: 'flex', alignItems: 'center', paddingLeft:'83px' }}>
				<span>
					<Typography variant='body2'>
					Event Type
					</Typography>
					<Typography variant='body1'>
						Capture
					</Typography>
				</span>
				<span>
					<Typography variant='body2'>
					Event Date
					</Typography>
					<Typography variant='body1'>
					21-01-2022
					</Typography>
				</span>
				<span>
					<Typography variant='body2'>
						Age Class
					</Typography>
					<Typography variant='body1'>
						Adult
					</Typography>
				</span>
				<span>
					<a>
						More Details &gt;
					</a>
				</span>
			</Box>
			
		</Card>
	);
}

export default Event;
