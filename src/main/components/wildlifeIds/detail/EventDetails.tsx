import {Box, Card, Typography} from '@mui/material';
import React, {useState} from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import HidableDetails from './HidableDetails';
import CodeLookup from '../../util/CodeLookup';

const EventDetails = ({state, index}) => {
	const [EventDetailsExpand, setEventDetailsExpand] = useState(false);

	return (
		<Card className="paper">
			<Typography className="title">Event {index + 1}</Typography>
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
				<span>
					<a
						onClick={() => {
							setEventDetailsExpand(!EventDetailsExpand);
						}}
						style={{cursor: 'pointer'}}
					>
						{EventDetailsExpand ? (
							<>
								Less Details
								<KeyboardArrowUpIcon className="expandDetailsIcon" />
							</>
						) : (
							<>
								More Details
								<KeyboardArrowDownIcon className="expandDetailsIcon" />
							</>
						)}
					</a>
				</span>
			</Box>
			{EventDetailsExpand ? <HidableDetails state={state} index={index} /> : ''}
		</Card>
	);
};

export default EventDetails;
