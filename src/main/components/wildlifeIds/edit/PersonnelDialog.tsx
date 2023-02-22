import {Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, MenuItem, TextField} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React, {useEffect, useState} from 'react';
import useCodeTable from '../../../hooks/useCodeTable';

const PersonnelDialog = ({open, acceptAction, cancelAction, initialState, noun = 'Update Requester'}) => {
	const {mappedCodes: roles} = useCodeTable('roles');
	const {mappedCodes: organizations} = useCodeTable('organizations');
	const {mappedCodes: regions} = useCodeTable('regions');

	const [person, setPerson] = useState({
		firstName: '',
		lastName: '',
		region: '',
		organization: '',
		phoneNumber: '',
		email: '',
		role: ''
	});

	function resetState() {
		if (initialState !== null) {
			setPerson({
				firstName: initialState.firstName,
				lastName: initialState.lastName,
				phoneNumber: initialState.phoneNumber,
				email: initialState.email,
				region: initialState.region,
				role: initialState.role,
				organization: initialState.organization
			});
		} else {
			setPerson({
				firstName: '',
				lastName: '',
				region: '',
				organization: '',
				phoneNumber: '',
				email: '',
				role: ''
			});
		}
	}

	useEffect(() => {
		if (initialState !== null) {
			setPerson({
				firstName: initialState.firstName,
				lastName: initialState.lastName,
				phoneNumber: initialState.phoneNumber,
				email: initialState.email,
				region: initialState.region,
				role: initialState.role,
				organization: initialState.organization
			});
		}
	}, [initialState]);

	function onClose() {
		cancelAction();
	}

	function onAccept() {
		acceptAction(person);
		resetState();
	}

	return (
		<Dialog className="personnelDialog" open={open} onClose={onClose} maxWidth={false}>
			<IconButton className="dialogBtn" onClick={onClose}>
				<CloseIcon />
			</IconButton>
			<DialogTitle>{noun}</DialogTitle>
			<DialogContent>
				<TextField
					className="requesterFormInput"
					label="First Name"
					inputProps={{maxLength: 30}}
					value={person.firstName}
					onChange={e => {
						setPerson({...person, firstName: e.target.value});
					}}
					required
				/>
				<TextField
					className="requesterFormInput"
					label="Last Name"
					inputProps={{maxLength: 30}}
					value={person.lastName}
					onChange={e => {
						setPerson({...person, lastName: e.target.value});
					}}
					required
				/>
				<TextField
					className='region'
					select
					label="Region"
					value={person.region}
					onChange={e => {
						setPerson({...person, region: e.target.value});
					}}
				>
					{regions.map((m, i) => (
						<MenuItem key={i} value={m.value}>
							{m.label}
						</MenuItem>
					))}
				</TextField>
				<TextField
					className="requesterFormInput"
					select
					label="Organization"
					value={person.organization}
					onChange={e => {
						setPerson({...person, organization: e.target.value});
					}}
				>
					{organizations.map((m, i) => (
						<MenuItem key={i} value={m.value}>
							{m.label}
						</MenuItem>
					))}
				</TextField>
				<TextField
					className="requesterFormInput"
					select
					label="Role"
					value={person.role}
					onChange={e => {
						setPerson({...person, role: e.target.value});
					}}
				>
					{roles.map((m, i) => (
						<MenuItem key={i} value={m.value}>
							{m.label}
						</MenuItem>
					))}
				</TextField>
				<TextField
					className="requesterFormInput"
					label="Phone Number"
					value={person.phoneNumber}
					onChange={e => {
						setPerson({...person, phoneNumber: e.target.value});
					}}
				/>
				<TextField
					className="requesterFormInput"
					label="Email"
					value={person.email}
					onChange={e => {
						setPerson({...person, email: e.target.value});
					}}
				/>
			</DialogContent>
			<DialogActions>
				<Button variant={'contained'} onClick={onAccept} className="requesterFormBtn">
					Save
				</Button>
				<Button variant={'outlined'} onClick={onClose} className="requesterFormBtn">
					Cancel
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default PersonnelDialog;
