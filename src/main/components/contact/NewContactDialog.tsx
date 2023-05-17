import {Dialog, IconButton, DialogTitle, DialogContent, TextField, Button, Box, MenuItem} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React, {useState} from 'react';
import ConfirmDialog from '../util/ConfirmDialog';
import useCodeTable from '../../hooks/useCodeTable';

const NewContactDialog = ({open, updateAction, cancelAction, title, buttonText, confirmTitle, confirmContent}) => {
	//the role list is different from the old list
	const validRoles = [
		{value: 'CONSERVATION_OFFICER', label: 'Conservation Officer'},
		{value: 'CONTRACTOR', label: 'Contractor'},
		{value: 'COMPULSORY_INSPECTOR', label: 'Compulsory Inspector'},
		{value: 'FIRST_NATION', label: 'First Nation'},
		{value: 'GOVERNMENT_BIOLOGIST', label: 'Government Biologist'},
		{value: 'HIGHWAY_CREW', label: 'Highway Crew'},
		{value: 'HUNTER', label: 'Hunter'},
		{value: 'LABORATORY', label: 'Laboratory'},
		{value: 'PUBLIC', label: 'Public'},
		{value: 'RESEARCHER', label: 'Researcher'},
		{value: 'TRAPPER', label: 'Trapper'}
	];
	const validFirstNation = [
		{value: 'FIRST_NATION_1', label: 'First Nation 1'},
		{value: 'FIRST_NATION_2', label: 'First Nation 2'},
		{value: 'FIRST_NATION_3', label: 'First Nation 3'},
		{value: 'FIRST_NATION_4', label: 'First Nation 4'},
		{value: 'FIRST_NATION_5', label: 'First Nation 5'}
	];

	const {mappedCodes: organizations} = useCodeTable('organizations');
	const {mappedCodes: regions} = useCodeTable('regions');

	const [dialogOpen, setDialogOpen] = useState(false);

	function onClose() {
		cancelAction();
	}

	function onUpdate() {
		updateAction();
	}

	return (
		<Dialog className="addEventDialog" open={open} onClose={onClose} maxWidth={false}>
			<IconButton className="dialogBtn" onClick={onClose}>
				<CloseIcon />
			</IconButton>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				<Box className="cardDetails">
					<TextField label="First Name" id="firstName" className="leftColumn" required />

					<TextField label="Last Name" id="lastName" required className="rightColumn" />
					<TextField select className="leftColumn" id="role" label="Role">
						{validRoles.map((m, i) => (
							<MenuItem key={i} value={m.value}>
								{m.label}
							</MenuItem>
						))}
					</TextField>
					<TextField className="rightColumn" select id="firstNation" label="First Nation">
						{validFirstNation.map((m, i) => (
							<MenuItem key={i} value={m.value}>
								{m.label}
							</MenuItem>
						))}
					</TextField>
					<TextField className="leftColumn" id="region" label="Region">
						{regions.map((m, i) => (
							<MenuItem key={i} value={m.value}>
								{m.label}
							</MenuItem>
						))}
					</TextField>
					<TextField select className="rightColumn" id="organization" label="Organization">
						{organizations.map((m, i) => (
							<MenuItem key={i} value={m.value}>
								{m.label}
							</MenuItem>
						))}
					</TextField>

					<TextField className="leftColumn" id="email" label="Email" required />

					<TextField className="rightColumn" id="phone" label="Phone" />

					<TextField sx={{width: '100%', marginBlock: '32px'}} label="Description" multiline rows={3} />
				</Box>
				<Box className="dialogActions">
					<Button
						variant={'contained'}
						className="dialogButtons"
						onClick={() => {
							setDialogOpen(true);
						}}
					>
						{buttonText}
					</Button>
					<Button
						variant="outlined"
						className="dialogButtons"
						onClick={() => {
							onClose();
						}}
					>
						Cancel
					</Button>
				</Box>
				<ConfirmDialog
					open={dialogOpen}
					close={() => {
						setDialogOpen(false);
					}}
					title={confirmTitle}
					content={confirmContent}
					acceptAction={() => {
						setDialogOpen(false);
						cancelAction();
					}}
				/>
			</DialogContent>
		</Dialog>
	);
};

export default NewContactDialog;
