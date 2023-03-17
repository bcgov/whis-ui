import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Typography} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';

const DeleteConfirm = ({open, acceptAction, cancelAction, noun}) => {
	function handleCancel() {
		cancelAction();
	}

	function handleAccept() {
		acceptAction();
	}

	return (
		<Dialog className="deleteConfirm" open={open} onClose={handleCancel} maxWidth={false}>
			<DialogTitle>{'Delete Confirmation'}</DialogTitle>
			<DialogContent>
				Are you sure you want to delete this {noun}?<br />
				There is no Undo for this action.
				<Typography>Are you sure you want to proceed?</Typography>
			</DialogContent>
			<Divider variant="middle" />
			<DialogActions>
				<Button variant={'contained'} onClick={handleAccept} className="requesterFormBtn">
					Delete
				</Button>
				<Button variant={'contained'} onClick={handleCancel} className="requesterFormBtn">
					Cancel
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default DeleteConfirm;
