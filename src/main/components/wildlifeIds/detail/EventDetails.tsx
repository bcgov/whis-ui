import {Box, Typography} from '@mui/material';
import React, {useState} from 'react';
import HidableDetails from './HidableDetails';
import Expandable from '../../pageElements/Expandable';

const EventDetails = ({state, index, expansionEvent}) => {
	const [event, setEvent] = useState(state.events[index]);

	return (
		<Expandable expansionEvent={expansionEvent} expansionCardsClassName={'card'}>
			<Expandable.Title>
				<span className='cardSubtitle'>
					<Typography>Event {index + 1}</Typography>
				</span>
				<Box className='info'>
					<span>
						<Typography variant='body2'>Event Type</Typography>
						<Typography variant='body1'>{event.type}</Typography>
					</span>
					<span>
						<Typography variant='body2'>Event Date</Typography>
						<Typography variant='body1'>{event.startDate}</Typography>
					</span>
					<span>
						<Typography variant='body2'>Age Class</Typography>
						<Typography variant='body1'>
							{event.ageClass?.name}
						</Typography>
					</span>
				</Box>
			</Expandable.Title>
			<Expandable.Detail>
				<HidableDetails state={state} index={index}/>
			</Expandable.Detail>
		</Expandable>
	);
};

export default EventDetails;
