import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Typography} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';

const AddEventConfirm = ({open, acceptAction, cancelAction}) => {
	function handleCancel() {
		cancelAction();
	}

	function handleAccept() {
		acceptAction();
	}

	return (
		<Dialog
			className="addEventConfirm"
			open={open}
			onClose={handleCancel}
			maxWidth={false}
		>
			<DialogTitle>{'Event Add Confirmation'}</DialogTitle>
			<DialogContent>
				Are you sure you would like to add a new event? <br/>
				Existing events will have their <em>Type</em> parameter locked (other fields will remain writable).
				<Typography>Are you sure you want to proceed?</Typography>
			</DialogContent>
				<Divider variant="middle" />
			<DialogActions>
				<Button variant={'contained'} onClick={handleAccept} className="requesterFormBtn">
					Confirm
				</Button>
				<Button variant={'contained'} onClick={handleCancel} className="requesterFormBtn">
					Cancel
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default AddEventConfirm;
