import React, {useEffect, useState} from 'react';
import {
	Box,
	Button,
	Grid,
	MenuItem,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField
} from '@mui/material';
import ValidationError from '../util/ValidationError';
import {useSelector} from '../../../state/utilities/use_selector';
import {Add} from '@mui/icons-material';
import PersonnelDialog from '../wildlifeIds/edit/PersonnelDialog';

const ContactSelection = ({handleSelect}) => {
	const [addRequesterDialogOpen, setAddRequesterDialogOpen] = useState(false);
	const [selected, setSelected] = useState('');
	const [selectedContact, setSelectedContact] = useState(null);
	const {contacts} = useSelector(state => state.Contacts);

	useEffect(() => {
		if (selected !== null) {
			setSelectedContact(contacts.find(c => c.id == selected));
			handleSelect(selected);
		} else {
			setSelectedContact(null);
		}
	}, [selected, contacts]);

	return (
		<Grid container spacing={4} alignItems={'center'}>
			<Grid item xs={12} md={10}>
				<TextField
					name="requester"
					label="Requester*"
					sx={{width: '100%'}}
					select
					onChange={e => {
						setSelected(e.target.value);
					}}
					value={selected}
				>
					{contacts.map(c => (
						<MenuItem key={c.id} value={c.id}>
							{`${c.first_name} ${c.last_name}, ${c.role_display_name} at ${c.organization_display_name}`}
						</MenuItem>
					))}
				</TextField>
			</Grid>
			<Grid item xs={12} md={2}>
				<Button
					variant={'contained'}
					size="small"
					onClick={() => {
						setAddRequesterDialogOpen(true);
					}}
					sx={{fontWeight: '700', fontSize: '13px'}}
				>
					<Add sx={{fontSize: '18px'}} />
					Add Requester
				</Button>
			</Grid>
			<PersonnelDialog
				open={addRequesterDialogOpen}
				acceptAction={() => {
					setAddRequesterDialogOpen(false);
				}}
				cancelAction={() => {
					setAddRequesterDialogOpen(false);
				}}
				initialState={null}
				noun="Add Requester"
			/>

			{selectedContact && (
				<Grid item xs={12} sx={{overflow: 'auto'}}>
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
								<TableRow key={selectedContact?.email} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
									<TableCell>{selectedContact?.first_name || ''}</TableCell>
									<TableCell>{selectedContact?.last_name || ''}</TableCell>
									<TableCell>{selectedContact?.role_display_name || ''}</TableCell>
									<TableCell>{selectedContact?.organization_display_name || ''}</TableCell>
									<TableCell>{selectedContact?.email || ''}</TableCell>
									<TableCell>{selectedContact?.phone || ''}</TableCell>
									<TableCell>{selectedContact?.region_display_name || ''}</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
				</Grid>
			)}
		</Grid>
	);
};

export default ContactSelection;
