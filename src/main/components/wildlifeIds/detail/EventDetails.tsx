import {Box, Typography} from '@mui/material';
import React from 'react';
import HidableDetails from './HidableDetails';
import CodeLookup from '../../util/CodeLookup';
import Expandable from '../../pageElements/Expandable';

const EventDetails = ({state, index, expansionEvent}) => {
	return (
		<Expandable expansionEvent={expansionEvent} expansionCardsClassName={'card'}>
			<Expandable.Title>
				<span className="cardSubtitle">
					<Typography>Event {index + 1}</Typography>
				</span>
				<Box className="info">
					<span>
						<Typography variant="body2">Event Type</Typography>
						<Typography variant="body1">{state.events[index].type}</Typography>
					</span>
					<span>
						<Typography variant="body2">Event Date</Typography>
						<Typography variant="body1">{state.events[index].startDate}</Typography>
					</span>
					<span>
						<Typography variant="body2">Age Class</Typography>
						<Typography variant="body1">
							<CodeLookup codeTable={'animal_age'} code={state.events[index].ageClass} />
						</Typography>
					</span>
				</Box>
			</Expandable.Title>
			<Expandable.Detail>
				<HidableDetails state={state} index={index} />
			</Expandable.Detail>
		</Expandable>
	);
};

export default EventDetails;
