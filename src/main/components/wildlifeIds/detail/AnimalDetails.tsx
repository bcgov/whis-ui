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

const AnimalDetails = ({ state }) => {


	return (
		<Card className='papper'>
			<Typography fontFamily={'BCSans-Bold'} sx={{ fontSize: '18px', margin: '48px 0 24px' }}>Animal Details</Typography>
			<Box className='info' sx={{ display: 'flex', alignItems: 'center' }}>
				<span>
					<Typography variant='body2'>
						Species
					</Typography>
					<Typography variant='body1'>
						{state.animalDetails.species}
					</Typography>
				</span>
				<span>
					<Typography variant='body2'>
						Sex
					</Typography>
					<Typography variant='body1'>
						{state.animalDetails.sex}
					</Typography>
				</span>
				<span>
					<Typography variant='body2'>
						Home Region
					</Typography>
					<Typography variant='body1'>
						{state.animalDetails.homeRegion}
					</Typography>
				</span>
			</Box>

			<Box sx={{ margin: '24px 0' }}>
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
							<TableCell>{state.animalDetails.identifiers[0].identifierType}</TableCell>
							<TableCell>{state.animalDetails.identifiers[0].identifierNameorNumber}</TableCell>
							<TableCell>{state.animalDetails.identifiers[0].Additionalinfo}</TableCell>
						</TableRow>
					</Table>
				</TableContainer>
			</Box>

		</Card>
	);
}

export default AnimalDetails;
