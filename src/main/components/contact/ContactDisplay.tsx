import {Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import React from "react";

const ContactDisplay = ({contact}) => {
	if (contact == null) {
		return null;
	}

	return (
		<TableContainer component={Box} sx={{borderRadius: '6px', border: '1px solid #dfe0e0', width: '100%', display: 'table', tableLayout: 'fixed'}}>
			<Table sx={{tableLayout: 'auto'}}>
				<TableHead>
					<TableRow sx={{backgroundColor: '#f8f9fa'}}>
						<TableCell>First Name</TableCell>
						<TableCell>Last Name</TableCell>
						<TableCell>Role Name</TableCell>
						<TableCell>Organization</TableCell>
						<TableCell>Email</TableCell>
						<TableCell>Phone</TableCell>
						<TableCell>Region</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					<TableRow key={contact.id} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
						<TableCell>{contact.firstName || ''}</TableCell>
						<TableCell>{contact.lastName || ''}</TableCell>
						<TableCell>{contact.organizationalRole || ''}</TableCell>
						<TableCell>{contact.organization?.name || ''}</TableCell>
						<TableCell>{contact.email || ''}</TableCell>
						<TableCell>{contact.phone || ''}</TableCell>
						<TableCell>{contact.region || ''}</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</TableContainer>
	);

};

export default ContactDisplay;
