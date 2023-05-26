import {Button, Dialog, DialogActions, DialogContent, Box, Divider, DialogTitle} from '@mui/material';
import React, {useEffect, useState} from 'react';
import CheckIcon from '@mui/icons-material/Check';
import {useNavigate} from "react-router-dom";

const GenerationSuccessDialog = ({open, handleClose, createdIDs}) => {

	const navigate = useNavigate();

	const [editLink, setEditLink] = useState('');
	const [message, setMessage] = useState('');

	useEffect(() => {
		if (createdIDs === null) {
			return;
		}

		if (createdIDs.result.length == 1) {
			setEditLink(`/wildlifeIds/edit/${createdIDs.result[0]['id']}`);
			setMessage(`You have generated 1 new WLH ID: ${createdIDs.result[0]['wlh_id']}`);
		} else if (createdIDs.result.length > 1) {
			const joinedIDs = createdIDs.result.map(i => i['id']).join(',');
			setEditLink(`/wildlifeIds/multiEdit/${joinedIDs}`);
			setMessage(`You have generated ${createdIDs.length} new WLH IDs: ${createdIDs.result[0]['wlh_id']} to  ${createdIDs.result[createdIDs.result.length - 1]['wlh_id']}`);
		}

	}, [createdIDs]);


	return (
		<Dialog open={open} onClose={handleClose} className="generate_confirm_dialog">
			<Box className="generated_icon_container">
				<CheckIcon className="CheckIcon"/>
			</Box>
			<DialogTitle>WLH ID(s) Successfully Generated!</DialogTitle>
			<DialogContent>
				{message}
				<br/>
				What would you like to do next?
			</DialogContent>
			<Divider variant="middle"/>
			<DialogActions>
				<Button
					className="dialog_actions"
					variant={'contained'}
					onClick={() => {
						navigate(editLink);
					}}
				>
					Update Generated IDs
				</Button>
				<Button
					className="dialog_actions"
					variant={'contained'}
					onClick={() => {
						navigate('/wildlifeIds');
					}}
				>
					Go&nbsp;<span>to</span>&nbsp;Dashboard
				</Button>
				<Button
					className="dialog_actions closeBtn cancelBtns"
					variant={'contained'}
					onClick={() => {
						handleClose();
					}}
				>
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default GenerationSuccessDialog;
