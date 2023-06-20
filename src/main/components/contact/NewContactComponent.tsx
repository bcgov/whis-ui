import React, {useState} from "react";
import {Button} from "@mui/material";
import {Add} from "@mui/icons-material";
import NewContactDialog from "./NewContactDialog";
import {useDispatch} from "react-redux";
import {CONTACT_CREATE_WITH_CALLBACK} from "../../../state/actions";

const NewContactComponent = ({createHandler}) => {

	const [open, setOpen] = useState(false);
	const [working, setWorking] = useState(false);
	const [serial, setSerial] = useState(new Date().toUTCString());
	const dispatch = useDispatch();

	async function createdCallback(newContact) {
		createHandler(newContact);
		setWorking(false);
		setSerial(new Date().toUTCString()); // force a remount of the dialog, clearing internal state
	}
	async function errorCallback(error) {
		setWorking(false);
	}

	function acceptNewContact (contact) {
		setOpen(false);
		setWorking(true);
		dispatch({
			type: CONTACT_CREATE_WITH_CALLBACK,
			payload: {
				...contact,
				organization: parseInt(contact.organization) || null,
				firstNation: parseInt(contact.firstNation) || null
			},
			successCallback: createdCallback.bind(this),
			errorCallback:  errorCallback.bind(this)
		});
	}

	return (
		<>
			<Button
				sx={{ gap:'8px'}}
				variant={'contained'}
				disabled={working}
				onClick={() => {
					setOpen(true);
				}}
			>
				<Add /> Add New Contact
			</Button>
			<NewContactDialog
				key={serial}
				open={open}
				updateAction={acceptNewContact}
				cancelAction={() => {setOpen(false)}}
			/>
		</>
	);

};

export default NewContactComponent;
