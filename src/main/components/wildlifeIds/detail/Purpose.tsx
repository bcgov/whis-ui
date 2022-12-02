import {
	Box,
	Button,
	Card,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	Paper,
	Table,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography
} from "@mui/material";
import React, { useState } from "react";
import '../../../styles/updateID.scss';

const Purpose = () => {


	return (
		<Card className='papper'>
			<Typography fontFamily={'BCSans-Bold'} sx={{ fontSize: '18px', margin: '48px 83px 24px' }}>Purpose</Typography>
			<Box className='info' sx={{ display: 'flex', alignItems: 'center', paddingLeft:'83px' }}>
				<span>
					<Typography variant='body2'>
						Primary Purpose
					</Typography>
					<Typography variant='body1'>
						Herd Health
					</Typography>
				</span>
				<span>
					<Typography variant='body2'>
						Secondary Purpose
					</Typography>
					<Typography variant='body1'>
						Passive Surveillance
					</Typography>
				</span>
				<span>
					<Typography variant='body2'>
						Associated Project
					</Typography>
					<Typography variant='body1'>
						Project Projetc 1
					</Typography>
				</span>
			</Box>
			<Box sx={{ margin: '24px 83px' }}>
				<Typography variant='body2'>
					Project Details
				</Typography>
				<Typography variant='body1'>
					We can define wildlife conservation as any efforts taken to protect any species of wildlife (plants and animals included) along with their habitats. When we say protection, this includes the preservation, management, and restoration of wildlife. Wildlife protection means preventing any extinction and endangerment where possible. This could be in the form of bringing animals back to good health, creating sustainable habitats, assisting in breeding programs, and much more. As we discovered in our open step from the University of York, a major part of global wildlife conservation is protecting a single species in its core habitat. However, it’s important to understand how biodiversity can be maximised – we should assist it.
				</Typography>
			</Box>
			<Box sx={{ margin: '24px 83px' }}>
				<Typography fontFamily={'BCSans-Bold'} sx={{ fontSize: '18px', marginBottom: '19px' }}>Requester</Typography>
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
								<TableCell>Sultana</TableCell>
								<TableCell>Majid</TableCell>
								<TableCell>Region 1</TableCell>
								<TableCell>N/A</TableCell>
								<TableCell>N/A</TableCell>
								<TableCell>N/A</TableCell>
								<TableCell>N/A</TableCell>
							</TableRow>
						</TableHead>
					</Table>
				</TableContainer>
			</Box>

		</Card>
	);
}

export default Purpose;
