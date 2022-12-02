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

const AnimalDetails = () => {


	return (
		<Card className='papper'>
			<Typography fontFamily={'BCSans-Bold'} sx={{ fontSize: '18px', margin: '48px 83px 24px' }}>Animal Details</Typography>
			<Box className='info' sx={{ display: 'flex', alignItems: 'center', paddingLeft: '83px' }}>
				<span>
					<Typography variant='body2'>
						Species
					</Typography>
					<Typography variant='body1'>
						Moose Moose Moose
					</Typography>
				</span>
				<span>
					<Typography variant='body2'>
						Sex
					</Typography>
					<Typography variant='body1'>
						Female
					</Typography>
				</span>
				<span>
					<Typography variant='body2'>
						Home Region
					</Typography>
					<Typography variant='body1'>
						Region Region 1
					</Typography>
				</span>
			</Box>

			<Box sx={{ margin: '24px 83px' }}>
				<Typography fontFamily={'BCSans-Bold'} sx={{ fontSize: '18px', marginBottom: '19px' }}>Identifiers</Typography>
				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow className='tablehead'>
								<TableCell>Identifier Type</TableCell>
								<TableCell>Identifier Name/Number</TableCell>
								<TableCell>Additional Information</TableCell>
							</TableRow>
						</TableHead>
						<TableRow>
							<TableCell>Alternate Animal ID</TableCell>
							<TableCell>Identifier Name 1</TableCell>
							<TableCell>N/A</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Alternate Animal ID</TableCell>
							<TableCell>Identifier Name 1</TableCell>
							<TableCell>N/A</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Alternate Animal ID</TableCell>
							<TableCell>Identifier Name 1</TableCell>
							<TableCell>N/A</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Alternate Animal ID</TableCell>
							<TableCell>Identifier Name 1</TableCell>
							<TableCell>N/A</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Alternate Animal ID</TableCell>
							<TableCell>Identifier Name 1</TableCell>
							<TableCell>N/A</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Alternate Animal ID</TableCell>
							<TableCell>Identifier Name 1</TableCell>
							<TableCell>N/A</TableCell>
						</TableRow>
					</Table>
				</TableContainer>
			</Box>

		</Card>
	);
}

export default AnimalDetails;
