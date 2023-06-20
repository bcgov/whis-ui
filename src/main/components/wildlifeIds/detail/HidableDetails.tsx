import {Box, Table, TableCell, TableContainer, TableHead, TableRow, Typography} from '@mui/material';
import React, {useState} from 'react';
import ContactDisplay from "../../contact/ContactDisplay";
import {descriptionForLocation} from "../../../../state/utilities/location_attributes";

const HidableDetails = ({state, index}) => {
	const [event, setEvent] = useState(state.events[index]);


	return (
		<Box className="cardDetails">
			<Typography className="detailsSubtitle">Location</Typography>
			<TableContainer component={Box} className="details_table">
				<Table>
					<TableHead>
						<TableRow className="tableHead">
							<TableCell className="table_location">Location</TableCell>
							<TableCell>Details</TableCell>
						</TableRow>
					</TableHead>
					{event.locations.map((location, i) => {
						return (
							<TableRow key={i}>
								<TableCell>{location.type}</TableCell>
								<TableCell>{descriptionForLocation(location)}</TableCell>
							</TableRow>
						);
					})}
				</Table>
			</TableContainer>
			<Box>
				<Typography variant="body2">History</Typography>
				<Typography className="history_content">{event.history}</Typography>
			</Box>

			<Box>
				<Typography className="title">Submitter</Typography>
				{event.submitter !== null && <ContactDisplay contact={event.submitter}/>}
			</Box>

			<Box>
				<Typography className="title">Samples</Typography>
				<Box className="details_samples">
					<span>
						<Typography variant="body2">Samples Were Collected?</Typography>
						<Typography variant="body1">{event.samplesCollected ? 'Yes' : 'No'}</Typography>
					</span>
					<span>
						<Typography variant="body2">Samples Sent to Testing?</Typography>
						<Typography variant="body1">{event.samplesSentForTesting ? 'Yes' : 'No'}</Typography>
					</span>
					<span>
						<Typography variant="body2">Test Results Received?</Typography>
						<Typography variant="body1">{event.testResultsReceived ? 'Yes' : 'No'}</Typography>
					</span>
				</Box>
			</Box>
		</Box>
	);
};

export default HidableDetails;
