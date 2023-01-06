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
import React from "react";
import '../../../styles/updateID.scss';
import CodeLookup from "../../util/CodeLookup";

const Purpose = ({ state }) => {

	const requester = state.purpose.requester;

	return (
		<Card className='papper'>
			<Typography fontFamily={'BCSans-Bold'} sx={{ fontSize: '18px', marginBlock: '48px 24px' }}>Purpose</Typography>
			<Box className='info' sx={{ display: 'flex', alignItems: 'center' }}>
				<span>
					<Typography variant='body2'>
						Primary Purpose
					</Typography>
					<Typography variant='body1'>
						<CodeLookup codeTable={'purposes'} code={state.purpose.primaryPurpose} />
					</Typography>
				</span>
				<span>
					<Typography variant='body2'>
						Secondary Purpose
					</Typography>
					<Typography variant='body1'>
						<CodeLookup codeTable={'purposes'} code={state.purpose.secondaryPurpose} />
					</Typography>
				</span>
				<span>
					<Typography variant='body2'>
						Associated Project
					</Typography>
					<Typography variant='body1'>
						{state.purpose.associatedProject}
					</Typography>
				</span>
			</Box>
			<Box className='details_margin'>
				<Typography variant='body2'>
					Project Details
				</Typography>
				<Typography variant='body1'>
					{state.purpose.projectDetails}
				</Typography>
			</Box>
			<Box className='details_margin'>
				<Typography fontFamily={'BCSans-Bold'} sx={{ fontSize: '18px', marginBottom: '19px' }}>Requester</Typography>
				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow className='tablehead'>
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
								<TableCell>
									{requester.firstName}
								</TableCell>
								<TableCell>
									{requester.lastName}
								</TableCell>
								<TableCell>
									<CodeLookup codeTable={'regions'} code={requester.region} />
								</TableCell>
								<TableCell>
									<CodeLookup codeTable={'organizations'} code={requester.organization} />
								</TableCell>
								<TableCell>
									<CodeLookup codeTable={'roles'} code={requester.role} />
								</TableCell>
								<TableCell>
									{requester.phoneNumber}
								</TableCell>
								<TableCell>
									{requester.email}
								</TableCell>
							</TableRow>
						</TableHead>
					</Table>
				</TableContainer>
			</Box>

		</Card>
	);
}

export default Purpose;
