import {Button, Dialog, DialogActions, DialogContent, Box, IconButton, DialogTitle} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

const CancelDialog = ({openCancelDialog, handleClose, navigate, setCancelDialog}) => {
	return (
		<Dialog open={openCancelDialog} onClose={handleClose} className="generate_cancel_dialog">
			<Box className='cancel_icon_container'>
				<PriorityHighIcon className="PriorityHighIcon" />
			</Box>
			<IconButton onClick={handleClose} className="dialogBtn">
				<CloseIcon />
			</IconButton>
			<DialogTitle className='dialog_title'>Cancel WLH ID Generation</DialogTitle>
			<DialogContent className="cancel_dialog_content">
				<p>You have NOT generated any IDs!&nbsp;&nbsp;Are you sure you want to leave this page?</p>
			</DialogContent>
			<DialogActions className="dialog_actions">
				<Button
					className="cancelBtn"
					onClick={() => {
						navigate('/wildlifeIds/');
					}}
				>
					YES
				</Button>
				<Button
					onClick={() => {
						setCancelDialog(false);
					}}
				>
					NO
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default CancelDialog;
