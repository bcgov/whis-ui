import {Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton} from '@mui/material';
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
		<Dialog
			className="deleteConfirm"
			open={open}
			onClose={handleCancel}
			maxWidth={false}
		>
			<IconButton
				className="dialogBtn"
				onClick={handleCancel}
			>
				<CloseIcon />
			</IconButton>
			<DialogTitle>{'Delete Confirmation'}</DialogTitle>
			<DialogContent>
				Are you sure you want to delete this {noun}?<br />
				There is no Undo for this action.
			</DialogContent>
			<DialogActions>
				<Button variant={'contained'} onClick={handleAccept} className="requesterFormBtn">
					Delete
				</Button>
				<Button variant={'outlined'} onClick={handleCancel} className="requesterFormBtn">
					Cancel
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default DeleteConfirm;
