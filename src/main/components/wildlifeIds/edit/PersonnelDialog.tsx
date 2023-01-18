import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	MenuItem,
	TextField
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, {useEffect, useState} from "react";
import useCodeTable from "../../../hooks/useCodeTable";

const PersonnelDialog = ({open, acceptAction, cancelAction, initialState, noun='Update Requester'}) => {

	const {mappedCodes: purposes} = useCodeTable('purposes');
	const {mappedCodes: roles} = useCodeTable('roles');
	const {mappedCodes: organizations} = useCodeTable('organizations');
	const {mappedCodes: regions} = useCodeTable('regions');

	const [person, setPerson] = useState(
		{
			'firstName': '',
			'lastName': '',
			'region': '',
			'organization': '',
			'phoneNumber': '',
			'email': '',
			'role': ''
		}
	);

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
	}

	return (

		<Dialog
			open={open}
			onClose={onClose}
			maxWidth={false}
			PaperProps={{
				sx: {width: '975px', maxHeight: '508px'}
			}}
		>
			<IconButton
				onClick={onClose}
				sx={{
					position: 'absolute',
					right: 8,
					top: 8
				}}
			>
				<CloseIcon/>
			</IconButton>
			<DialogTitle sx={{fontSize: '18px', fontFamily: 'BCSans-Bold', padding: '59px 0 12px 31px'}}>{noun}</DialogTitle>
			<DialogContent sx={{display: 'block', padding: ' 0 15px'}}>
				<TextField
					className='requesterFormInput'
					label='First Name'
					inputProps={{ maxLength: 30 }}
					value={person.firstName}
					onChange={(e) => {
						setPerson({...person, firstName: e.target.value})
					}}
					required
				/>
				<TextField
					className='requesterFormInput'
					label='Last Name'
					inputProps={{ maxLength: 30 }}
					value={person.lastName}
					onChange={(e) => {
						setPerson({...person, lastName: e.target.value})
					}}
					required
				/>
				<TextField
					sx={{width:'912px', margin:'12px 16px'}}
					id='region-select'
					select
					label='Region'
					value={person.region}
					onChange={(e) => {
						setPerson({...person, region: e.target.value})
					}}

				>
					{regions.map((m, i) => (
						<MenuItem key={i} value={m.value}>
							{m.label}
						</MenuItem>
					))}
				</TextField>
				<TextField
					className='requesterFormInput'
					id='organization-select'
					select
					label='Organization'
					value={person.organization}
					onChange={(e) => {
						setPerson({...person, organization: e.target.value})
					}}

				>
					{organizations.map((m, i) => (
						<MenuItem key={i} value={m.value}>
							{m.label}
						</MenuItem>
					))}
				</TextField>
				<TextField
					className='requesterFormInput'
					select
					label='Role'
					value={person.role}
					onChange={(e) => {
						setPerson({...person, role: e.target.value})
					}}
				>
					{roles.map((m, i) => (
						<MenuItem key={i} value={m.value}>
							{m.label}
						</MenuItem>
					))}
				</TextField>
				<TextField
					className='requesterFormInput'
					label='Phone Number'
					value={person.phoneNumber}
					onChange={(e) => {
						setPerson({...person, phoneNumber: e.target.value})
					}}

				/>
				<TextField
					className='requesterFormInput'
					label='Email'
					value={person.email}
					onChange={(e) => {
						setPerson({...person, email: e.target.value})
					}}
				/>
			</DialogContent>
			<DialogActions sx={{padding: '29px 32px 32px 0'}}>
				<Button variant={'contained'} onClick={onAccept} className='requesterFormBtn'>Save</Button>
				<Button variant={'outlined'} onClick={onClose} className='requesterFormBtn' sx={{marginLeft: '11px'}}>Cancel</Button>
			</DialogActions>
		</Dialog>

	)
}

export default PersonnelDialog;
