import {
	Box,
	Card,
	Typography
} from "@mui/material";
import React, { useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import HideableDetails from "./HideableDetails";



const EventDetails = ({ state, index }) => {

	const [EventDetailsExpand, setEventDetailsExpand] = useState(false);

	return (
		<>
			<Card className='papper' >
				<Typography fontFamily={'BCSans-Bold'} sx={{ fontSize: '18px', margin: '48px 0 24px' }}>Event {index+1}</Typography>
				<Box className='info' sx={{ display: 'flex', alignItems: 'stretch' }}>
					<span>
						<Typography variant='body2'>
							Event Type
						</Typography>
						<Typography variant='body1'>
							{state.events[index].type}
						</Typography>
					</span>
					<span>
						<Typography variant='body2'>
							Event Date
						</Typography>
						<Typography variant='body1'>
							{state.events[index].startDate}
						</Typography>
					</span>
					<span>
						<Typography variant='body2'>
							Age Class
						</Typography>
						<Typography variant='body1'>
							{state.events[index].ageClass}
						</Typography>
					</span>
					<span>
						<a onClick={() => { setEventDetailsExpand(!EventDetailsExpand) }} style={{ cursor: 'pointer' }}>
							{EventDetailsExpand ? <>Less Details<KeyboardArrowUpIcon className="expandDetailsIcon"/></> : <>More Details<KeyboardArrowDownIcon className="expandDetailsIcon"/></>}
						</a>
					</span>
				</Box>
				{EventDetailsExpand ? <HideableDetails state={state} index={index} /> : ''}
			</Card>
		</>

	);
}

export default EventDetails;
