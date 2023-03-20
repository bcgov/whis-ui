import {Button, Dialog, DialogActions, DialogContent, Box, DialogTitle, Divider} from '@mui/material';
import React from 'react';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

const CancelDialog = ({openCancelDialog, handleClose, navigate, setCancelDialog}) => {
	return (
		<Dialog open={openCancelDialog} onClose={handleClose} className="generate_cancel_dialog">
			<Box className="cancel_icon_container">
				<PriorityHighIcon className="PriorityHighIcon" />
			</Box>
			<DialogTitle>Cancel WLH ID Generation</DialogTitle>
			<DialogContent>Are you sure you want to cancel?&nbsp;Changes you have made will not be saved.</DialogContent>
			<Divider variant="middle" />
			<DialogActions>
				<Button
					className="dialog_actions cancelBtns"
					variant={'contained'}
					onClick={() => {
						navigate('/wildlifeIds/');
					}}
				>
					Yes
				</Button>
				<Button
					className="dialog_actions closeBtn cancelBtns"
					onClick={() => {
						setCancelDialog(false);
					}}
					variant={'contained'}
				>
					No
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default CancelDialog;
