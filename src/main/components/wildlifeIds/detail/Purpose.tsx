import {Box, Card, Paper, Table, TableCell, TableContainer, TableHead, TableRow, Typography} from '@mui/material';
import React from 'react';
import Expandable from '../../pageElements/Expandable';
import CodeLookup from '../../util/CodeLookup';

const Purpose = ({state, expansionEvent}) => {
	const requester = state.purpose.requester;

	return (
		<Expandable expansionEvent={expansionEvent} expansionCardsClassName={'card'}>
			<Expandable.Title>
				<span className="cardSubtitle">
					<Typography>Purpose</Typography>
				</span>
				<Box className="info">
					<span>
						<Typography variant="body2">Primary Purpose</Typography>
						<Typography variant="body1">
							<CodeLookup codeTable={'purposes'} code={state.purpose.primaryPurpose} />
						</Typography>
					</span>
					<span>
						<Typography variant="body2">Secondary Purpose</Typography>
						<Typography variant="body1">
							<CodeLookup codeTable={'purposes'} code={state.purpose.secondaryPurpose} />
						</Typography>
					</span>
					<span>
						<Typography variant="body2">Associated Project</Typography>
						<Typography variant="body1">{state.purpose.associatedProject}</Typography>
					</span>
				</Box>
			</Expandable.Title>
			<Expandable.Detail>
				<Box className="cardDetails">
					<Box className="hidableDetails">
						<Typography variant="body2">Project Details</Typography>
						<Typography className="project_details_content">{state.purpose.projectDetails}</Typography>
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
											<CodeLookup codeTable={'regions'} code={requester.region} />
										</TableCell>
										<TableCell>
											<CodeLookup codeTable={'organizations'} code={requester.organization} />
										</TableCell>
										<TableCell>
											<CodeLookup codeTable={'roles'} code={requester.role} />
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
