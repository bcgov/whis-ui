import React, {useEffect, useState} from 'react';
import {Button, Container, FormGroup, Grid, MenuItem, TextField} from "@mui/material";
import ValidationError from "../util/ValidationError";
import {useSelector} from "../../../state/utilities/use_selector";

const ContactSelection = ({handleSelect}) => {

	const [selected, setSelected] = useState('');
	const [selectedContact, setSelectedContact] = useState(null);
	const {
		contacts
	} = useSelector(state => state.Contacts);

	useEffect(() => {
		if (selected !== null) {
			setSelectedContact(contacts.find(c => c.id == selected));
			handleSelect(selected);
		} else {
			setSelectedContact(null);
		}
	}, [selected, contacts])


	return (
		<Grid container spacing={4}>

			<Grid item xs={10}>

				<TextField
					name='requester'
					label='Requester*'
					sx={{width: "100%"}}
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
			<Grid item xs={2}>
				<Button variant={'contained'}>Add Requester</Button>
			</Grid>
			<Grid item xs={6}>First Name: {selectedContact?.first_name || ''}</Grid>
			<Grid item xs={6}>Last Name: {selectedContact?.last_name || ''}</Grid>
			<Grid item xs={6}>Role Name: {selectedContact?.role_display_name || ''}</Grid>
			<Grid item xs={6}>Organization: {selectedContact?.organization_display_name || ''}</Grid>
			<Grid item xs={6}>Email: {selectedContact?.email || ''}</Grid>
			<Grid item xs={6}>Phone: {selectedContact?.phone || ''}</Grid>
			<Grid item xs={6}>Region: {selectedContact?.region_display_name || ''}</Grid>


		</Grid>
	);

};

export default ContactSelection;
