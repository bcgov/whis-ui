import {Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";

const DeleteConfirm = ({open, acceptAction, cancelAction}) => {

	function handleCancel() {
		cancelAction();
	}

	function handleAccept() {
		acceptAction();
	}

	return (
		<Dialog
			open={open}
			onClose={handleCancel}
			maxWidth={false}
			PaperProps={{
				sx: {width: '615px', maxHeight: '279px', height: '279px'}
			}}
		>
			<IconButton
				onClick={handleCancel}
				sx={{
					position: 'absolute',
					right: 8,
					top: 8
				}}
			>
				<CloseIcon/>
			</IconButton>
			<DialogTitle sx={{fontSize: '18px', fontFamily: 'BCSans-Bold', padding: '47px 0 35px 39px'}}>
				{"Delete Confirmation"}
			</DialogTitle>
			<DialogContent sx={{padding: '40px 39px', fontSize: '16px'}}>
				Are you sure you want to delete this requester?<br/>
				There is no Undo for this action.
			</DialogContent>
			<DialogActions sx={{padding: '0 32px 48px 0'}}>
				<Button variant={'contained'} onClick={handleAccept} className='requesterFormBtn'
					sx={{backgroundColor: '#d8292f'}}>Delete</Button>
				<Button variant={'outlined'} onClick={handleCancel} className='requesterFormBtn'
					sx={{marginLeft: '11px'}}>Cancel</Button>
			</DialogActions>
		</Dialog>
	)
}

export default DeleteConfirm;
