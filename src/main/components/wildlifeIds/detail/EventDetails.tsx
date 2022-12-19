import Expandable from "../../pageElements/Expandable";
import {
	Box,
	Card,
	Paper,
	Table,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography
} from "@mui/material";
import React, { useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import useCodeTable from "../../../hooks/useCodeTable";


const EventDetails = ({ expansionEvent, state, dispatch, event, index }) => {
	const { mappedCodes: ageClasses } = useCodeTable('animal_age');


	const [shouldShowCopyFromRequesterButton, setShouldShowCopyFromRequesterButton] = useState(false);
	const [shouldShowAddSubmitterButton, setShouldShowAddSubmitterButton] = useState(false);
	const [addSubmitterDialogOpen, setAddSubmitterDialogOpen] = useState(false);

	const [EventDetailsExpand, setEventDetailsExpand] = useState(false);


	return (
		<>

			<Card className='papper' >
				<Typography fontFamily={'BCSans-Bold'} sx={{ fontSize: '18px', margin: '48px 0 24px' }}>Event 1</Typography>
				<Box className='info' sx={{ display: 'flex', alignItems: 'stretch' }}>
					<span>
						<Typography variant='body2'>
							Event Type
						</Typography>
						<Typography variant='body1'>
							{state.events[0].eventType}
						</Typography>
					</span>
					<span>
						<Typography variant='body2'>
							Event Date
						</Typography>
						<Typography variant='body1'>
							{state.events[0].eventDate}
						</Typography>
					</span>
					<span>
						<Typography variant='body2'>
							Age Class
						</Typography>
						<Typography variant='body1'>
							{state.events[0].ageClass}
						</Typography>
					</span>
					<span>
						<a onClick={() => { setEventDetailsExpand(!EventDetailsExpand) }} style={{ cursor: 'pointer' }}>
							{EventDetailsExpand ? 'Less Details <' : 'More Details >'}
						</a>
					</span>
				</Box>

				<Box className="details_margin" sx={{ display: EventDetailsExpand ? 'auto' : 'none' }}>
					<Typography fontFamily={'BCSans-Bold'} sx={{ fontSize: '18px', marginBottom: '19px' }}>Location</Typography>
					<TableContainer component={Paper}>
						<Table>
							<TableHead>
								<TableRow className='tablehead'>
									<TableCell>Location</TableCell>
									<TableCell>Details</TableCell>
								</TableRow>
							</TableHead>
							<TableRow>
								<TableCell>{state.events[0].location[0].location}</TableCell>
								<TableCell>{state.events[0].location[0].details}</TableCell>
							</TableRow>
						</Table>
					</TableContainer>
					<Box className="details_margin">
						<Typography variant='body2'>
							History
						</Typography>
						<Typography variant='body1'>
							{state.events[0].history}
							{/* We can define wildlife conservation as any efforts taken to protect any species of wildlife (plants and animals included) along with their habitats. When we say protection, this includes the preservation, management, and restoration of wildlife. Wildlife protection means preventing any extinction and endangerment where possible. This could be in the form of bringing animals back to good health, creating sustainable habitats, assisting in breeding programs, and much more. As we discovered in our open step from the University of York, a major part of global wildlife conservation is protecting a single species in its core habitat. However, it’s important to understand how biodiversity can be maximised – we should assist as many species as possible. */}
						</Typography>
					</Box>

					<Box className="details_margin">

						<Typography fontFamily={'BCSans-Bold'} sx={{ fontSize: '18px', marginBottom: '19px' }}>Submitters</Typography>
						<TableContainer component={Paper}>
							<Table>
								<TableHead>
									<TableRow className='tablehead'>
										<TableCell>Name</TableCell>
										<TableCell>Family</TableCell>
										<TableCell>Region</TableCell>
										<TableCell>Organization</TableCell>
										<TableCell>Role</TableCell>
										<TableCell>Phone</TableCell>
										<TableCell>Email</TableCell>

									</TableRow>
								</TableHead>
								<TableHead>
									<TableRow>
										<TableCell>{state.purpose.requester.firstName}</TableCell>
										<TableCell>{state.purpose.requester.lastName}</TableCell>
										<TableCell>{state.purpose.requester.region}</TableCell>
										<TableCell>{state.purpose.requester.organization}</TableCell>
										<TableCell>{state.purpose.requester.role}</TableCell>
										<TableCell>{state.purpose.requester.phoneNumber}</TableCell>
										<TableCell>{state.purpose.requester.email}</TableCell>
									</TableRow>
								</TableHead>
							</Table>
						</TableContainer>
					</Box>
					<Box className="details_margin">

						<Typography fontFamily={'BCSans-Bold'} sx={{ fontSize: '18px', marginBottom: '19px' }}>Samples</Typography>
						<Box className="details_samples">
							<span>
								<Typography variant='body2'>
									Samples Were Collected?
								</Typography>
								<Typography variant='body1'>
									{state.events[0].samples[0].isCollected}
								</Typography>
							</span>
							<span>
								<Typography variant='body2'>
									Samples Sent to Testing?
								</Typography>
								<Typography variant='body1'>
									{state.events[0].samples[0].isSenttoTesting}
								</Typography>
							</span>
							<span>
								<Typography variant='body2'>
									Test Results Received?
								</Typography>
								<Typography variant='body1'>
									{state.events[0].samples[0].testResultReceived}
								</Typography>
							</span>
						</Box>
					</Box>
				</Box>
			</Card>
		</>

	);
}

export default EventDetails;
