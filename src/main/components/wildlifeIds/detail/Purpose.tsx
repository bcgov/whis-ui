import {Box, Card, Paper, Table, TableCell, TableContainer, TableHead, TableRow, Typography} from '@mui/material';
import React from 'react';
import Expandable from '../../pageElements/Expandable';
import CodeLookup from '../../util/CodeLookup';

const Purpose = ({state, expansionEvent}) => {
	const requester = state.requester;

	return (
		<Expandable expansionEvent={expansionEvent} expansionCardsClassName={'details_card'}>
			<Expandable.Title>
				<span className="cardSubtitle">
					<Typography>Purpose</Typography>
				</span>
				<Box className="info">
					<span>
						<Typography variant="body2">Primary Purpose</Typography>
						<Typography variant="body1">
							{state.primaryPurpose?.name}
						</Typography>
					</span>
					<span>
						<Typography variant="body2">Secondary Purpose</Typography>
						<Typography variant="body1">
							{state.secondaryPurpose?.name}
						</Typography>
					</span>
					<span>
						<Typography variant="body2">Associated Project</Typography>
						<Typography variant="body1">{state.associatedProject}</Typography>
					</span>
				</Box>
			</Expandable.Title>
			<Expandable.Detail>
				<Box className="cardDetails">
					<Box className="hidableDetails">
						<Typography variant="body2">Project Details</Typography>
						<Typography className="project_details_content">{state.associatedProjectDetails}</Typography>
					</Box>
					<Box className="hidableDetails">
						<Typography className="title">Requester</Typography>
						<TableContainer component={Box}>
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
								<TableHead>
									<TableRow>
										<TableCell>{requester.firstName}</TableCell>
										<TableCell>{requester.lastName}</TableCell>
										<TableCell>
											{requester.region || ''}
										</TableCell>
										<TableCell>
											{requester.organization || ''}
										</TableCell>
										<TableCell>
											{requester.organizationalRole || ''}
										</TableCell>
										<TableCell className="phone">{requester.phoneNumber}</TableCell>
										<TableCell>{requester.email}</TableCell>
									</TableRow>
								</TableHead>
							</Table>
						</TableContainer>
					</Box>
				</Box>
			</Expandable.Detail>
		</Expandable>
	);
};

export default Purpose;
