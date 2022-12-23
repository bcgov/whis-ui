import {
	Box,
	Card,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography
} from "@mui/material";
import React from "react";
import '../../../styles/updateID.scss';

const AnimalDetails = ({state}) => {


	return (
		<Card className='papper'>
			<Typography fontFamily={'BCSans-Bold'} sx={{fontSize: '18px', margin: '48px 0 24px'}}>Animal Details</Typography>
			<Box className='info' sx={{display: 'flex', alignItems: 'center'}}>
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

			<Box sx={{margin: '24px 0'}}>
				<Typography fontFamily={'BCSans-Bold'} sx={{fontSize: '18px', marginBottom: '19px'}}>Identifiers</Typography>
				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow className='tablehead'>
								<TableCell>Identifier Type</TableCell>
								<TableCell>Identifier Name/Number</TableCell>
								<TableCell>Additional Information</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{state.animalDetails.identifiers.map((identifier, i) => {
								const {additionalAttributes: attributes} = identifier;
								const attr = Object.entries(attributes).map(([key, value]) => {
									return (
										<li key={key}>{key} : {value.toString()}&emsp;&emsp;</li>
									);
								})
								return (
									<TableRow key={i}>
										<TableCell>{identifier.type}</TableCell>
										<TableCell>{identifier.identifier}</TableCell>
										<TableCell>
											<ul>{attr}</ul>
										</TableCell>
									</TableRow>
								)
							})}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>

		</Card>
	);
}

	export default AnimalDetails;
