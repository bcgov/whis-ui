import {Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from '@mui/material';
import React from 'react';
import CodeLookup from '../../util/CodeLookup';

const HidableDetails = ({state, index}) => {
	const submitters = state.events[index].submitters;
	return (
		<Box className="hidableDetails">
			<Typography className="title">Location</Typography>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow className="tableHead">
							<TableCell>Location</TableCell>
							<TableCell>Details</TableCell>
						</TableRow>
					</TableHead>
					{state.events[index].locations.map((location, i) => {
						const attributes = location.attributes;
						const attr = Object.entries(attributes).map(([key, value]) => {
							return (
								<>
									{key} : {value.toString()}&emsp;&emsp;&emsp;&emsp;
								</>
							);
						});
						return (
							<TableRow key={i}>
								<TableCell>{location.type}</TableCell>
								<TableCell>{attr}</TableCell>
							</TableRow>
						);
					})}
				</Table>
			</TableContainer>
			<Box className="hidableDetails">
				<Typography variant="body2">History</Typography>
				<Typography variant="body1">{state.events[index].history}</Typography>
			</Box>

			<Box className="hidableDetails">
				<Typography className="title">
					Submitters
				</Typography>
				<TableContainer component={Paper}>
					<Table className="personnelTable">
						<TableHead>
							<TableRow className="tableHead">
								<TableCell>First</TableCell>
								<TableCell>Last</TableCell>
								<TableCell>Region</TableCell>
								<TableCell>Organization</TableCell>
								<TableCell>Role</TableCell>
								<TableCell>Phone</TableCell>
								<TableCell>Email</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{submitters.map(s => (
								<TableRow key={`${s.firstName} - ${s.lastName}`}>
									<TableCell>{s.firstName}</TableCell>
									<TableCell>{s.lastName}</TableCell>
									<TableCell>
										<CodeLookup codeTable={'regions'} code={s.region} />
									</TableCell>
									<TableCell>
										<CodeLookup codeTable={'organizations'} code={s.organization} />
									</TableCell>
									<TableCell>
										<CodeLookup codeTable={'roles'} code={s.role} />
									</TableCell>
									<TableCell className='phone'>{s.phoneNumber}</TableCell>
									<TableCell>{s.email}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
			<Box className="hidableDetails">
				<Typography className='title'>
					Samples
				</Typography>
				<Box className="details_samples">
					<span>
						<Typography variant="body2">Samples Were Collected?</Typography>
						<Typography variant="body1">{state.events[index].additionalAttributes.samplesCollected ? 'Yes' : 'No'}</Typography>
					</span>
					<span>
						<Typography variant="body2">Samples Sent to Testing?</Typography>
						<Typography variant="body1">{state.events[index].additionalAttributes.samplesSentForTesting ? 'Yes' : 'No'}</Typography>
					</span>
					<span>
						<Typography variant="body2">Test Results Received?</Typography>
						<Typography variant="body1">{state.events[index].additionalAttributes.testResultsReceived ? 'Yes' : 'No'}</Typography>
					</span>
				</Box>
			</Box>
		</Box>
	);
};

export default HidableDetails;
