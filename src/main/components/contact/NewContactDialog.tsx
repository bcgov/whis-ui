import {Dialog, IconButton, DialogTitle, DialogContent, TextField, Button, Box, MenuItem} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React, {useState} from 'react';
import ConfirmDialog from '../util/ConfirmDialog';
import useCodeTable from '../../hooks/useCodeTable';

const NewContactDialog = ({open, updateAction, cancelAction}) => {

	const [contact, setContact] = useState({
		firstName: '',
		lastName: '',
		role: '',
		region: '',
		firstNation: '',
		organization: '',
		email: '',
		phone: '',
		description: ''
	});


	const {mappedCodes: organizations} = useCodeTable('organization');
	const {mappedCodes: firstNations} = useCodeTable('first_nation');
	const {mappedCodes: regions} = useCodeTable('region');
	const {mappedCodes: roles} = useCodeTable('organizational_role');

	const [confirmOpen, setConfirmOpen] = useState(false);

	const title = 'Adding a new Contact List Entry';
	const buttonText = 'Create';
	const confirmTitle = 'Confirm?';
	const confirmContent = 'Proceed with creating a new contact?';

	function onClose() {
		cancelAction();
	}

	return (
		<Dialog className='addEventDialog' open={open} onClose={onClose} maxWidth={false}>
			<IconButton className='dialogBtn' onClick={onClose}>
				<CloseIcon/>
			</IconButton>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				<Box className='cardDetails'>
					<TextField
						value={contact.firstName}
						label='First Name'
						id='firstName'
						className='leftColumn'
						onChange={(e) => setContact({...contact, firstName: e.target.value})}
						required
					/>

					<TextField
						value={contact.lastName}
						label='Last Name'
						id='lastName'
						onChange={(e) => setContact({...contact, lastName: e.target.value})}
						required
						className='rightColumn'
					/>
					<TextField
						select
						value={contact.role}
						className='leftColumn'
						id='role'
						label='Role'
						onChange={(e) => setContact({...contact, role: e.target.value})}
					>
						{roles.map((m) => (
							<MenuItem key={m.code} value={m.code}>
								{m.name}
							</MenuItem>
						))}
					</TextField>
					<TextField
						className='rightColumn'
						value={contact.firstNation}
						select id='firstNation'
						label='First Nation'
						onChange={(e) => setContact({...contact, firstNation: e.target.value})}

					>
						<MenuItem value={''}>None</MenuItem>
						{firstNations.map((m) => (
							<MenuItem key={m.code} value={m.code}>
								{m.name}
							</MenuItem>
						))}
					</TextField>
					<TextField
						className='leftColumn'
						value={contact.region}
						select id='region'
						label='Region'
						onChange={(e) => setContact({...contact, region: e.target.value})}
					>
						{regions.map((m) => (
							<MenuItem key={m.code} value={m.code}>
								{m.name}
							</MenuItem>
						))}
					</TextField>
					<TextField
						select
						className='rightColumn'
						value={contact.organization}
						id='organization'
						label='Organization'
						onChange={(e) => setContact({...contact, organization: e.target.value})}
					>
						<MenuItem value={''}>None</MenuItem>
						{organizations.map((m) => (
							<MenuItem key={m.code} value={m.code}>
								{m.name}
							</MenuItem>
						))}
					</TextField>

					<TextField
						className='leftColumn'
						value={contact.email}
						id='email'
						label='Email'
						type={'email'}
						required
						onChange={(e) => setContact({...contact, email: e.target.value})}
					/>


					<TextField
						className='rightColumn'
						value={contact.phone}
						id='phone'
						label='Phone'
						type={'tel'}
						onChange={(e) => setContact({...contact, phone: e.target.value})}

					/>

					<TextField
						value={contact.description}
						sx={{width: '100%', marginBlock: '32px'}}
						label='Description'
						multiline
						rows={3}
						onChange={(e) => setContact({...contact, description: e.target.value})}
					/>

				</Box>
				<Box className='dialogActions'>
					<Button
						variant={'contained'}
						className='dialogButtons'
						onClick={() => {
							setConfirmOpen(true);
						}}
					>
						{buttonText}
					</Button>
					<Button
						variant='outlined'
						className='dialogButtons'
						onClick={() => {
							onClose();
						}}
					>
						Cancel
					</Button>
				</Box>
				<ConfirmDialog
					open={confirmOpen}
					close={() => {
						setConfirmOpen(false);
					}}
					title={confirmTitle}
					content={confirmContent}
					acceptAction={() => {
						setConfirmOpen(false);
						updateAction(contact);
					}}
				/>
			</DialogContent>
		</Dialog>
	);
};

export default NewContactDialog;
