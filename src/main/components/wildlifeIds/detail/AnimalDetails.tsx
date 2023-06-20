import {Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from '@mui/material';
import React from 'react';
import Expandable from '../../pageElements/Expandable';
import CodeLookup from '../../util/CodeLookup';

const AnimalDetails = ({state, expansionEvent}) => {
	return (
		<Expandable expansionEvent={expansionEvent} expansionCardsClassName={'details_card'}>
			<Expandable.Title>
				<span className="cardSubtitle">
					<Typography>Animal Details</Typography>
				</span>
				<Box className="info">
					<span>
						<Typography variant="body2">Species</Typography>
						<Typography variant="body1">{state.species?.englishName || 'not set'}</Typography>
					</span>
					<span>
						<Typography variant="body2">Sex</Typography>
						<Typography variant="body1">{state.animalSex?.name || 'not set'}</Typography>
					</span>
					<span>
						<Typography variant="body2">Home Region</Typography>
						<Typography variant="body1">{state.region?.name || 'not set'}</Typography>
					</span>
				</Box>
			</Expandable.Title>
			<Expandable.Detail>
				<Box className="cardDetails">
					<Typography className="detailsSubtitle">Identifiers</Typography>
					<TableContainer component={Box}>
						<Table>
							<TableHead>
								<TableRow className="tableHead">
									<TableCell>Identifier Type</TableCell>
									<TableCell>Identifier Name/Number</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{state.identifiers.map((identifier, i) => {
									//@todo identifier-specific attributes
									return (
										<TableRow key={i}>
											<TableCell>{identifier.type}</TableCell>
											<TableCell>{identifier.identifier}</TableCell>
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					</TableContainer>
				</Box>
			</Expandable.Detail>
		</Expandable>
	);
};

export default AnimalDetails;
